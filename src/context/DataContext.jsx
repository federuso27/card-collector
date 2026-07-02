import { createContext, useContext } from "react";
import cardsData from "../data/cards.json";
import boosterPacksData from "../data/boosterPacks.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

const DataContext = createContext(null);

// Subir este número cada vez que cambie la forma de cards.json/boosterPacks.json
// (nuevos campos, cartas agregadas, etc). Fuerza a descartar lo guardado en
// localStorage de sesiones anteriores y releer el JSON semilla actualizado.
const SEED_VERSION = "2";

function ensureFreshSeed() {
  const storedVersion = localStorage.getItem("cc_seed_version");
  if (storedVersion !== SEED_VERSION) {
    localStorage.removeItem("cc_cards");
    localStorage.removeItem("cc_packs");
    localStorage.setItem("cc_seed_version", SEED_VERSION);
  }
}

function nextId(list) {
  return list.length ? Math.max(...list.map((item) => item.id)) + 1 : 1;
}

export function DataProvider({ children }) {
  ensureFreshSeed();
  const [cards, setCards] = useLocalStorage("cc_cards", cardsData);
  const [packs, setPacks] = useLocalStorage("cc_packs", boosterPacksData);
  const [orders, setOrders] = useLocalStorage("cc_orders", []);

  // Cartas
  function addCard(card) {
    setCards((prev) => [...prev, { ...card, id: nextId(prev) }]);
  }
  function updateCard(id, changes) {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, ...changes } : c)));
  }
  function deleteCard(id) {
    setCards((prev) => prev.filter((c) => c.id !== id));
  }
  function getCardById(id) {
    return cards.find((c) => c.id === Number(id));
  }

  // Sobres
  function addPack(pack) {
    setPacks((prev) => [...prev, { ...pack, id: nextId(prev) }]);
  }
  function updatePack(id, changes) {
    setPacks((prev) => prev.map((p) => (p.id === id ? { ...p, ...changes } : p)));
  }
  function deletePack(id) {
    setPacks((prev) => prev.filter((p) => p.id !== id));
  }
  function getPackById(id) {
    return packs.find((p) => p.id === Number(id));
  }

  // Pedidos
  function createOrder(username, items) {
    const order = {
      id: nextId(orders),
      username,
      items,
      total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, order]);

    items.forEach((item) => {
      if (item.type === "card") {
        setCards((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, stock: Math.max(0, c.stock - item.quantity) } : c))
        );
      } else {
        setPacks((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, stock: Math.max(0, p.stock - item.quantity) } : p))
        );
      }
    });

    return order;
  }
  function getOrdersByUsername(username) {
    return orders.filter((o) => o.username === username);
  }

  const value = {
    cards,
    addCard,
    updateCard,
    deleteCard,
    getCardById,
    packs,
    addPack,
    updatePack,
    deletePack,
    getPackById,
    orders,
    createOrder,
    getOrdersByUsername,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData debe usarse dentro de DataProvider");
  return ctx;
}
