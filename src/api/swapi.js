// src/api/swapi.js
// Capa de acceso a SWAPI (https://www.swapi.tech)
// Objetivo: devolver al front estructuras SIEMPRE consistentes.
// - fetchEntities(type) -> array [{ uid, name, type }]
// - fetchEntityById(type, id) -> objeto "result" (con properties, description, uid)

const API = "https://www.swapi.tech/api";

/**
 * Descarga una lista de entidades (people, planets, vehicles, etc.)
 * y normaliza cada item al formato mínimo que usa la UI.
 */
export async function fetchEntities(type) {
  // Petición GET a /{type}
  const res = await fetch(`${API}/${type}`);
  if (!res.ok) throw new Error(`Error al cargar ${type}`);

  // La forma típica de respuesta en swapi.tech:
  // { results: [{ name, uid, url }, ...] }
  const data = await res.json();

  // Normalizamos a [{ uid, name, type }]
  return (data.results || []).map((it) => ({
    uid: String(it.uid), // uniformamos a string
    name: it.name,
    type, // MUY importante para ruteo y favoritos
  }));
}

/**
 * Descarga el detalle de una entidad por type + id.
 * Devuelve el "result" completo (incluye { uid, properties, description, ... })
 */
export async function fetchEntityById(type, id) {
  const res = await fetch(`${API}/${type}/${id}`);
  if (!res.ok) throw new Error(`Error al cargar ${type}/${id}`);
  const data = await res.json();
  return data.result;
}
