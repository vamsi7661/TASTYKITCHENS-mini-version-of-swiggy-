import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addItems: () => {},
  removeItem: () => {},
  increaseQty: () => {},
  decreaseQty: () => {},
  clearItems: () => {},
})
export default CartContext
