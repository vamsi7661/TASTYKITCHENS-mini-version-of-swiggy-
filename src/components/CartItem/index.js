import {BsFillXCircleFill} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {removeItem, increaseQty, decreaseQty} = value
      const {eachItem} = props
      const {
        foodItemName,
        foodItemImg,
        foodItemCost,
        quantity,
        foodItemId,
      } = eachItem

      const imageUrl = foodItemImg

      const onRemove = () => {
        removeItem(foodItemId)
      }

      const onMinus = () => {
        decreaseQty(foodItemId)
      }

      const onPlus = () => {
        increaseQty(foodItemId)
      }

      return (
        <li className="cart-item-alignment">
          <div className="img-name">
            <img className="cart-img" src={imageUrl} alt={foodItemName} />
            <h1 className="food-name">{foodItemName}</h1>
          </div>

          <div className="counter-cart-item">
            <div className="counter">
              <button
                testid="decrement-quantity"
                type="button"
                className="minus"
                onClick={onMinus}
              >
                -
              </button>
              <p testid="item-quantity" className="qty">
                {quantity}
              </p>
              <button
                testid="increment-quantity"
                type="button"
                className="plus"
                onClick={onPlus}
              >
                +
              </button>
            </div>
          </div>
          <p className="total-price-lg">₹ {foodItemCost * quantity}.00</p>
          <div>
            <button type="button" className="remove-icon" onClick={onRemove}>
              <BsFillXCircleFill />
            </button>
          </div>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
