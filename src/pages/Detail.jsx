// src/pages/Detail.jsx
// Vista de detalle genérica (/details/:type/:id):
// - Fetch del detalle
// - Imagen con SafeImg
// - Botón para añadir/quitar de favoritos
// - Listado automático de todas las properties

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Button } from "react-bootstrap";
import { fetchEntityById } from "../api/swapi";
import { useStore } from "../context/StoreContext";
import SafeImg from "../components/SafeImg";

export default function Detail() {
  // Los params vienen del ruteo en App.jsx
  const { type, id } = useParams();

  // Estado local del detalle (hasta que se resuelva el fetch)
  const [entity, setEntity] = useState(null);

  // Store global para el botón de favoritos
  const { state, dispatch } = useStore();

  // Carga el detalle cada vez que cambian type o id.
  useEffect(() => {
    fetchEntityById(type, id).then(setEntity).catch(console.error);
  }, [type, id]);

  // Loading sencillo
  if (!entity) return <Spinner animation="border" />;

  // Normalizamos uid y name por si faltan en la respuesta
  const uid = entity.uid ?? id;
  const name = entity.properties?.name ?? entity.name ?? "Unknown";

  // ¿Es favorito? clave compuesta (uid + type)
  const isFav = state.favorites.some((f) => f.uid === uid && f.type === type);

  // Añadir/Quitar a favoritos con payload mínimo
  const toggleFav = () => {
    dispatch({ type: isFav ? "REMOVE_FAV" : "ADD_FAV", payload: { uid, name, type } });
  };

  return (
    <Card>
      <Card.Header>
        <h3>{name}</h3>
      </Card.Header>

      {/* Imagen principal del detalle */}
      <SafeImg type={type} uid={uid} alt={name} className="card-img-top" />

      <Card.Body>
        {/* La API trae una descripción en algunos endpoints */}
        <Card.Text>{entity.description || name}</Card.Text>

        <Button onClick={toggleFav} variant={isFav ? "danger" : "outline-warning"}>
          {isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
        </Button>
      </Card.Body>

      {/* Renderizamos todas las properties automáticamente */}
      <ListGroup variant="flush">
        {Object.entries(entity.properties).map(([key, val]) => (
          <ListGroup.Item key={key}>
            <strong>{key.replace(/_/g, " ")}:</strong> {String(val)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  );
}
