// Componente para mostrar imágenes con SafeImg
import { useMemo, useState } from "react";

// Función para importar todas las imágenes de la carpeta local
const LOCAL_IMAGES = import.meta.glob(
  "/src/assets/images/**/*.{jpg,jpeg,png,webp}",
  { eager: true, as: "url" }
);

const FOLDER_MAP = {
  people: "characters",
  characters: "characters",
  planets: "planets",
  vehicles: "vehicles",
  starships: "starships",
  species: "species",
  films: "films",
};

// Rutas remotas y placeholders
const PLACEHOLDER = "/placeholder.jpg";
const REMOTE_4GEEKS =
  "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images";
const VISUAL_GUIDE = "https://starwars-visualguide.com/assets/img";

// Función para encontrar una imagen local.
function findLocal(url) {
  return LOCAL_IMAGES[url] || null;
}

// Función para construir las rutas de las imágenes.
function buildCandidates(type, uid) {
  const primary = FOLDER_MAP[type] ?? type;
  const id = String(uid).trim();

  const aliases =
    primary === "characters" ? ["characters", "people"] : [primary];

  const localCandidates = [];
  const remoteCandidates = [];

  aliases.forEach((folder) => {
    [
      `/src/assets/images/categories/${folder}/${id}.jpg`,
      `/src/assets/images/categories/${folder}/${id}.png`,
      `/src/assets/images/${folder}/${id}.jpg`,
      `/src/assets/images/${folder}/${id}.png`,
    ].forEach((p) => {
      const hit = findLocal(p);
      if (hit) localCandidates.push(hit);
    });

    remoteCandidates.push(
      `${REMOTE_4GEEKS}/categories/${folder}/${id}.jpg`,
      `${REMOTE_4GEEKS}/categories/${folder}/${id}.png`,
      `${VISUAL_GUIDE}/${folder}/${id}.jpg`
    );
  });

  return [...localCandidates, ...remoteCandidates, PLACEHOLDER];
}
export default function SafeImg({ type, uid, alt = "", ...imgProps }) {
  const candidates = useMemo(() => buildCandidates(type, uid), [type, uid]);

  const [i, setI] = useState(0);
  const src = candidates[i];

  return (
    <img
      src={src}
      alt={alt || `${type} #${uid}`}
      loading="lazy"
      onError={() => setI((j) => (j + 1 < candidates.length ? j + 1 : j))}
      style={{ width: "100%", display: "block", objectFit: "cover" }}
      {...imgProps}
    />
  );
}
