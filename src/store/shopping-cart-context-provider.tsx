import { useReducer } from "react";
import { DUMMY_PRODUCTS } from "../dummy_products";
import { ShoppingCartContext } from "./shopping-cart-context";

export interface State {
  items: any[];
}

type Action =
  | { type: 'ADD_ITEM', payload: any }
  | { type: 'UPDATE_ITEM'; payload: any };

const reducer = (state: State, actions: Action): State => {
  if (actions.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem: any) => cartItem.id === actions.payload.productId
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find((product: any) => product.id === actions.payload.productId);
      updatedItems.push({
        id: actions.payload.id,
        name: product?.title,
        price: product?.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  } else if (actions.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === actions.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += actions.payload.quantity;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
    };
  }
  return state;
}

export const ShoppingCartContextProvider = ({ children }: any) => {
  const [cartState, dispatchCart] = useReducer(reducer, {
    items: []
  });

  function handleAddItemToCart(id: number) {
    dispatchCart({
      type: 'ADD_ITEM',
      payload: { productId: id }
    });
  }

  function handleUpdateCartItemQuantity(productId: number, amount: number) {
    dispatchCart({
      type: 'UPDATE_ITEM',
      payload: { productId: productId, quantity: amount }
    });
  }

  const ctxValue = {
    items: cartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity
  }

  return (
    <ShoppingCartContext.Provider value={ctxValue}>
      {children}
    </ShoppingCartContext.Provider>
  )
}