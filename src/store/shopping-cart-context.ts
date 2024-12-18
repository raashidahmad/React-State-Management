import { createContext } from "react";

interface Cart {
    items: any[],
    addItemToCart: (id: number) => void,
    updateCartItemQuantity: (productId: number, amount: number) => void
}   
const contextConfig: Cart = {
    items: [],
    addItemToCart: (id: number) => {},
    updateCartItemQuantity: (productId: number, amount: number) => {}
};
export const ShoppingCartContext = createContext(contextConfig);