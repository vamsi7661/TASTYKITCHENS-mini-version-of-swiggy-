import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

const OrderTotal = () => (
  <CartContext.Consumer>
    {value => {
      const {clearItems, cartList} = value
      let total = 0
      cartList.forEach(eachCartItem => {
        total += eachCartItem.foodItemCost * eachCartItem.quantity
      })
      const onPlaceOrder = () => {
        clearItems()
      }
      return (
        <div className="order-container">
          <h1 className="order-total">Order Total:</h1>
          <div>
            <p className="total-price"> ₹ {total}.00</p>
            <Link to="/payment">
              <button
                type="button"
                className="place-order-btn"
                onClick={onPlaceOrder}
              >
                Place Order
              </button>
            </Link>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default OrderTotal
