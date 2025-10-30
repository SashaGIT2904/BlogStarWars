// Página de inicio
import { useEffect, useState } from "react";
import { fetchEntities } from "../api/swapi.js";
import EntityList from "../components/EntityList";

export default function Home() {
  // Estados de planetas, personajes y vehículos
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  // Carga las listas de personajes, planetas y vehículos
  useEffect(() => {
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
      .catch(console.error) 
      .finally(() => setLoading(false));
  }, []); // [] asegura que se ejecute una sola vez

  if (loading) return <p>Cargando datos…</p>;

  return (
    <>
      <h2>Personajes</h2>
      <EntityList items={people} type="people" />

      <h2>Planetas</h2>
      <EntityList items={planets} type="planets" />

      <h2>Vehículos</h2>
      <EntityList items={vehicles} type="vehicles" />
    </>
  );
}
