//Componente de lista de tarjetas.

import { Row, Col } from "react-bootstrap";
import EntityCard from "./EntityCard";

export default function EntityList({ items = [], type }) {
  return (
    <Row>
      {items.map((item) => (
        // Cada tarjeta tiene su propio key
        <Col key={`${type ?? item.type}-${item.uid}`} md={3} className="mb-4">
          <EntityCard data={item} type={type} />
        </Col>
      ))}
    </Row>
  );
}
