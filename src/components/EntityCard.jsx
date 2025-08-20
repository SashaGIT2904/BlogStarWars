// src/components/EntityCard.jsx
// Tarjeta genérica para cualquier tipo de entidad.
// - Muestra imagen (SafeImg), nombre, link al detalle y botón de favorito.
// - El "type" puede venir por prop (Home) o dentro del item (Favoritos).

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import SafeImg from "./SafeImg";

export default function EntityCard({ data, type: parentType }) {
  const { state, dispatch } = useStore();

  // Si renderiza Home: viene "type" por prop. Si renderiza Favoritos: viene en data.type.
  const type = parentType ?? data.type;

  // Nombre robusto (algunas respuestas traen properties.name).
  const name = data.name ?? data.properties?.name ?? "Unknown";

  // ¿Está en favoritos? -> clave compuesta (uid + type).
  const isFav = state.favorites.some((f) => f.uid === data.uid && f.type === type);

  // Añadir o quitar favorito: guardamos un payload mínimo.
  const toggleFav = () => {
    dispatch({
      type: isFav ? "REMOVE_FAV" : "ADD_FAV",
      payload: { uid: data.uid, name, type },
    });
  };

  return (
    <Card>
      {/* Imagen de cabecera con todos los fallbacks */}
      <SafeImg type={type} uid={data.uid} alt={name} className="card-img-top" />

      <Card.Body>
        <Card.Title>{name}</Card.Title>

        {/* Link al detalle usando ruteo /details/:type/:id */}
        <Button as={Link} to={`/details/${type}/${data.uid}`} variant="primary" size="sm">
          Ver detalle
        </Button>

        {/* Botón de favorito (toggle) con estilo "danger" si ya está guardado */}
        <Button
          onClick={toggleFav}
          variant={isFav ? "danger" : "outline-warning"}
          size="sm"
          className="ms-2"
        >
          {isFav ? "Quitar" : "Favorito"}
        </Button>
      </Card.Body>
    </Card>
  );
}
