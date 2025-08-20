// src/pages/Home.jsx
// Carga people, planets y vehicles en paralelo y renderiza 3 secciones.
// Se muestra un "Cargando..." simple durante la primera carga.

import { useEffect, useState } from "react";
import { fetchEntities } from "../api/swapi.js";
import EntityList from "../components/EntityList";

export default function Home() {
  // Estado local por categoría
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Descargamos en paralelo con Promise.all para mayor rendimiento.
    Promise.all([
      fetchEntities("people"),
      fetchEntities("planets"),
      fetchEntities("vehicles"),
    ])
      .then(([p, pl, v]) => {
        setPeople(p);
        setPlanets(pl);
        setVehicles(v);
      })
      .catch(console.error) // en producción podrías mostrar un error amigable
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando datos…</p>;

  return (
    <>
      <h2>Personajes</h2>
      {/* type="people" garantiza rutas e imágenes correctas */}
      <EntityList items={people} type="people" />

      <h2>Planetas</h2>
      <EntityList items={planets} type="planets" />

      <h2>Vehículos</h2>
      <EntityList items={vehicles} type="vehicles" />
    </>
  );
}
