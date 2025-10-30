// Context para compartir el estado global en toda la app
import React, { createContext, useReducer, useContext } from "react";

// Crea el Context
const StoreContext = createContext();

// Estado para favoritos
const initialState = { favorites: [] };

// Función reducer para manejar las acciones
function reducer(state, action) {
  switch (action.type) {
    case "ADD_FAV": {
      const { uid, type } = action.payload;
      const exists = state.favorites.some((f) => f.uid === uid && f.type === type);
      if (exists) return state; 
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

// Función para envolver toda la app con el StoreProvider
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}
