import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  listingId: string;
  title: string;
  category: string;
  imageUrl: string;
  location: string;
  pricePerDay: number;
  rentalDays: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "rentalDays">, rentalDays?: number) => void;
  removeItem: (listingId: string) => void;
  updateRentalDays: (listingId: string, rentalDays: number) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "rentiverse-cart";
const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = window.localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart) as CartItem[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((count, item) => count + item.rentalDays, 0),
      subtotal: items.reduce((sum, item) => sum + item.pricePerDay * item.rentalDays, 0),
      addItem: (item, rentalDays = 1) => {
        setItems((currentItems) => {
          const existingItem = currentItems.find((entry) => entry.listingId === item.listingId);
          if (existingItem) {
            return currentItems.map((entry) =>
              entry.listingId === item.listingId
                ? { ...entry, rentalDays: entry.rentalDays + rentalDays }
                : entry,
            );
          }

          return [...currentItems, { ...item, rentalDays }];
        });
      },
      removeItem: (listingId) => {
        setItems((currentItems) => currentItems.filter((item) => item.listingId !== listingId));
      },
      updateRentalDays: (listingId, rentalDays) => {
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.listingId === listingId
              ? { ...item, rentalDays: Math.max(1, Math.min(30, rentalDays)) }
              : item,
          ),
        );
      },
      clearCart: () => {
        setItems([]);
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
