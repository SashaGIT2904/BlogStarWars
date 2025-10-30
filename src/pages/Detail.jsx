// Página de detalle
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, ListGroup, Spinner, Button } from "react-bootstrap";
import { fetchEntityById } from "../api/swapi";
import { useStore } from "../context/StoreContext";
import SafeImg from "../components/SafeImg";

// Funcion de detalle
export default function Detail() {
 
  const { type, id } = useParams();


  const [entity, setEntity] = useState(null);


  const { state, dispatch } = useStore();

  useEffect(() => {
    fetchEntityById(type, id).then(setEntity).catch(console.error);
  }, [type, id]);


  if (!entity) return <Spinner animation="border" />;


  const uid = entity.uid ?? id;
  const name = entity.properties?.name ?? entity.name ?? "Unknown";


  const isFav = state.favorites.some((f) => f.uid === uid && f.type === type);

  // Añadir/Quitar favoritos
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
        {/* Descripción */}
        <Card.Text>{entity.description || name}</Card.Text>

        <Button onClick={toggleFav} variant={isFav ? "danger" : "outline-warning"}>
          {isFav ? "Quitar de favoritos" : "Guardar en favoritos"}
        </Button>
      </Card.Body>

      {/* Propiedades */}
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
