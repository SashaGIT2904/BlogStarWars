// src/context/StoreContext.jsx
// Estado global mínimo de la app usando Context + useReducer.
// Solo gestionamos "favorites" para mantenerlo simple y escalable.

import React, { createContext, useReducer, useContext } from "react";

// 1) Creamos el contexto para compartir { state, dispatch } en toda la app.
const StoreContext = createContext();

// 2) Estado inicial — colección de favoritos vacía.
const initialState = { favorites: [] };

/**
 * 3) Reducer inmutable y predecible:
 *    - ADD_FAV    -> añade { uid, name, type } si NO existe ya (clave compuesta)
 *    - REMOVE_FAV -> elimina por (uid && type)
 *
 *   Nota: Usamos (uid, type) porque SWAPI repite uids en distintas colecciones,
 *   p.ej. people:1 y planets:1; así evitamos “marcar” otras tarjetas por error.
 */
function reducer(state, action) {
  switch (action.type) {
    case "ADD_FAV": {
      const { uid, type } = action.payload;
      const exists = state.favorites.some((f) => f.uid === uid && f.type === type);
      if (exists) return state; // prevenimos duplicados
      return { ...state, favorites: [...state.favorites, action.payload] };
    }
    case "REMOVE_FAV": {
      const { uid, type } = action.payload;
      return {
        ...state,
        favorites: state.favorites.filter((f) => !(f.uid === uid && f.type === type)),
      };
    }
    default:
      return state;
  }
}

// 4) Provider: engancha el reducer y expone { state, dispatch }.
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

// 5) Hook de conveniencia para consumir el contexto.
export function useStore() {
  return useContext(StoreContext);
}
