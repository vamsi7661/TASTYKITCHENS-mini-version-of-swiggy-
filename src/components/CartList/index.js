import './index.css'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

const CartList = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-items-list">
          {cartList.map(eachItem => (
            <CartItem eachItem={eachItem} key={eachItem.foodItemId} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)
export default CartList
