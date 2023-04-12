import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, colour, amount, product) => {
    dispatch({
      type: ADD_TO_CART,
      payload: {id, colour, amount, product},
    })
  }

  const removeCartItem = (id) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    })
  }

  const clearCart = () => {
    dispatch({
      type: CLEAR_CART,
    })
  }

  const toggleCartItemAmount = (id, value) => {
    dispatch({
      type: TOGGLE_CART_ITEM_AMOUNT,
      payload: {id, value},
    })
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
    dispatch({
      type: COUNT_CART_TOTALS,
    })
  }, [state.cart])

  return (
    <CartContext.Provider value={{
      ...state,
      addToCart,
      removeCartItem,
      clearCart,
      toggleCartItemAmount,
    }}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
