// src/components/EntityList.jsx
// Grid de tarjetas. Si se pasa "type", todas las tarjetas usan ese type.
// Si no (p.ej. Favoritos), cada item aporta su propio type.

import { Row, Col } from "react-bootstrap";
import EntityCard from "./EntityCard";

export default function EntityList({ items = [], type }) {
  return (
    <Row>
      {items.map((item) => (
        // key estable y única: combinamos type (prop o del item) + uid
        <Col key={`${type ?? item.type}-${item.uid}`} md={3} className="mb-4">
          <EntityCard data={item} type={type} />
        </Col>
      ))}
    </Row>
  );
}
