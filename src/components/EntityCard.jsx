// Componente de tarjeta

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import SafeImg from "./SafeImg";
// Función de renderizado de tarjeta.
export default function EntityCard({ data, type: parentType }) {
  const { state, dispatch } = useStore();


  const type = parentType ?? data.type;

  const name = data.name ?? data.properties?.name ?? "Unknown";

  const isFav = state.favorites.some((f) => f.uid === data.uid && f.type === type);

  // Añadir/Quitar favoritos
  const toggleFav = () => {
    dispatch({
      type: isFav ? "REMOVE_FAV" : "ADD_FAV",
      payload: { uid: data.uid, name, type },
    });
  };

  return (
    <Card>
      {/* Imagen de cabecera */}
      <SafeImg type={type} uid={data.uid} alt={name} className="card-img-top" />

      <Card.Body>
        <Card.Title>{name}</Card.Title>

        {/* Botón de detalle */}
        <Button as={Link} to={`/details/${type}/${data.uid}`} variant="primary" size="sm">
          Ver detalle
        </Button>

        {/* Botón de favoritos */}
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
