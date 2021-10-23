import CartContext from '../../context/CartContext'

import CartList from '../CartList'
import Header from '../Header'
import EmptyCart from '../EmptyCart'
import OrderTotal from '../OrderTotal'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItemsCount = cartList.length
      const empty = cartItemsCount === 0
      const ActiveHome = 'cart'
      return (
        <div>
          <Header active={ActiveHome} />
          {empty ? (
            <EmptyCart />
          ) : (
            <div className="cart-items-container">
              <div className="bg">
                <div className="cart-items-head">
                  <p className="item-head">Item</p>
                  <p className="item-head qty-head">Quantity</p>
                  <p className="item-price">Price</p>
                  <p className="item-remove">Remove</p>
                </div>
                <CartList />
                <hr className="total-line" />
                <OrderTotal />
              </div>
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
