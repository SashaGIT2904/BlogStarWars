// src/components/SafeImg.jsx
// <SafeImg> es un <img> con "varios intentos":
// 1) Busca la imagen localmente en src/assets/images (Vite la empaqueta).
// 2) Si no existe, intenta en el repo de 4Geeks y en VisualGuide.
// 3) Si todo falla, usa un placeholder en /public/placeholder.jpg.
// También resuelve el lío people ↔ characters (carpeta distinta según origen).

import { useMemo, useState } from "react";

// 👉 Vite: indexa TODAS las imágenes dentro de /src/assets/images.
//    'as: "url"' hace que nos de directamente la URL final empaquetada.
const LOCAL_IMAGES = import.meta.glob(
  "/src/assets/images/**/*.{jpg,jpeg,png,webp}",
  { eager: true, as: "url" }
);

// Mapa SWAPI → carpeta de imágenes.
// SWAPI usa "people", pero muchas colecciones de imágenes usan "characters".
const FOLDER_MAP = {
  people: "characters",
  characters: "characters",
  planets: "planets",
  vehicles: "vehicles",
  starships: "starships",
  species: "species",
  films: "films",
};

// Fallbacks remotos + placeholder local (añade /public/placeholder.jpg)
const PLACEHOLDER = "/placeholder.jpg";
const REMOTE_4GEEKS = "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images";
const VISUAL_GUIDE = "https://starwars-visualguide.com/assets/img";

// Busca un path local en el índice de Vite; devuelve URL o null.
function findLocal(url) {
  return LOCAL_IMAGES[url] || null;
}

/**
 * Construye una lista de URLs posibles (en orden de prioridad):
 *   - Local (varias rutas y extensiones)
 *   - Remoto (4Geeks y VisualGuide)
 *   - Placeholder
 * También probamos el alias "people" cuando el folder es "characters".
 */
function buildCandidates(type, uid) {
  const primary = FOLDER_MAP[type] ?? type;   // p.ej. "people" -> "characters"
  const id = String(uid).trim();

  // Si la carpeta principal es "characters", probamos también "people".
  const aliases = primary === "characters" ? ["characters", "people"] : [primary];

  const localCandidates = [];
  const remoteCandidates = [];

  aliases.forEach((folder) => {
    // Rutas locales típicas según tu estructura (con y sin "categories").
    [
      `/src/assets/images/categories/${folder}/${id}.jpg`,
      `/src/assets/images/categories/${folder}/${id}.png`,
      `/src/assets/images/${folder}/${id}.jpg`,
      `/src/assets/images/${folder}/${id}.png`,
    ].forEach((p) => {
      const hit = findLocal(p);
      if (hit) localCandidates.push(hit);
    });

    // Rutas remotas como último intento antes del placeholder.
    remoteCandidates.push(
      `${REMOTE_4GEEKS}/categories/${folder}/${id}.jpg`,
      `${REMOTE_4GEEKS}/categories/${folder}/${id}.png`,
      `${VISUAL_GUIDE}/${folder}/${id}.jpg`
    );
  });

  // Orden final de prueba
  return [...localCandidates, ...remoteCandidates, PLACEHOLDER];
}

export default function SafeImg({ type, uid, alt = "", ...imgProps }) {
  // Memo: solo recalcular si cambian type/uid.
  const candidates = useMemo(() => buildCandidates(type, uid), [type, uid]);

  // Estado: índice actual de "candidato" a probar.
  const [i, setI] = useState(0);
  const src = candidates[i];

  return (
    <img
      src={src}                   // URL actual a mostrar
      alt={alt || `${type} #${uid}`}
      loading="lazy"              // mejora rendimiento: carga diferida
      onError={() =>              // si falla, probamos el siguiente candidato
        setI((j) => (j + 1 < candidates.length ? j + 1 : j))
      }
      // Estilos razonables para cards (full width, sin deformaciones raras)
      style={{ width: "100%", display: "block", objectFit: "cover" }}
      {...imgProps}
    />
  );
}
