// src/App.jsx
// Definición de rutas de la app.
// - "/"                   -> Home
// - "/favorites"          -> Lista de favoritos
// - "/details/:type/:id"  -> Detalle universal

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <>
      {/* Navbar visible en todas las rutas */}
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:type/:id" element={<Detail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
