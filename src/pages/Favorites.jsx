// Página de favoritos

import { useStore } from "../context/StoreContext";
import EntityList from "../components/EntityList";

// Función de favoritos
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
