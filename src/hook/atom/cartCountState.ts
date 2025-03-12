// atoms/cartCountState.ts
import { atom } from "recoil";

export const cartCountState = atom<number>({
  key: "cartCountState",
  default: 0,
  effects_UNSTABLE: [
    ({ setSelf }) => {
      // Check if running on the client side
      if (typeof window !== "undefined") {
        // Initialize from localStorage
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
          try {
            const parsedCart = JSON.parse(storedCart);
            setSelf(parsedCart.length);
          } catch (error) {
            console.error("Error parsing cart from localStorage:", error);
          }
        }

        // Listen for storage changes in other tabs
        const handleStorageChange = (e: StorageEvent) => {
          if (e.key === "cart") {
            try {
              const updatedCart = JSON.parse(e.newValue || "[]");
              setSelf(updatedCart.length);
            } catch (error) {
              console.error("Error parsing updated cart:", error);
            }
          }
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
      }
    },
  ],
});
