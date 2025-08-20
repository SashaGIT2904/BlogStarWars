// src/pages/Favorites.jsx
// Lista todos los favoritos guardados en el store global.
// No pasamos "type" a EntityList, porque cada favorito ya lo trae.

import { useStore } from "../context/StoreContext";
import EntityList from "../components/EntityList";

export default function Favorites() {
  const { state } = useStore();

  return (
    <>
      <h2>Mis Favoritos</h2>
      {state.favorites.length === 0 ? (
        <p>No hay favoritos aún.</p>
      ) : (
        <EntityList items={state.favorites} />
      )}
    </>
  );
}
