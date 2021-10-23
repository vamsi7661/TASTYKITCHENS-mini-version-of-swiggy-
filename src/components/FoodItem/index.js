import {BsStarFill} from 'react-icons/bs'
import {Component} from 'react'
import CartContext from '../../context/CartContext'

import './index.css'

class FoodItem extends Component {
  state = {quantity: 0}

  renderFoodItem = () => (
    <CartContext.Consumer>
      {value => {
        const {addItems, increaseQty, decreaseQty} = value
        const {eachFoodItem} = this.props
        const {quantity} = this.state

        const {
          foodItemId,
          foodItemImg,
          foodItemName,
          foodItemCost,
          foodItemRating,
        } = eachFoodItem

        const imageUrl = foodItemImg

        const onIncrement = () => {
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
          increaseQty(foodItemId)
        }

        const onDecrement = () => {
          this.setState(prevState => ({quantity: prevState.quantity - 1}))
          decreaseQty(foodItemId)
        }

        const addToCart = () => {
          this.setState(prevState => ({quantity: prevState.quantity + 1}))
          addItems({...eachFoodItem, quantity: 1})
        }
        return (
          <li testid="foodItem" className="food-item-container">
            <img src={imageUrl} alt="food-item" className="food-item-img" />
            <div className="food-item-text-container">
              <h1 className="food-item-name">{foodItemName}</h1>
              <p className="food-cost"> {foodItemCost}</p>
              <div>
                <BsStarFill className="food-item-star" />
                <p>{foodItemRating}</p>
              </div>

              {quantity === 0 ? (
                <button type="button" className="add-btn" onClick={addToCart}>
                  Add
                </button>
              ) : (
                <div className="counter-food-item">
                  <button
                    testid="decrement-count"
                    type="button"
                    className="minus"
                    onClick={onDecrement}
                  >
                    -
                  </button>
                  <p testid="active-count" className="qty">
                    {quantity}
                  </p>
                  <button
                    testid="increment-count"
                    type="button"
                    className="plus"
                    onClick={onIncrement}
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return this.renderFoodItem()
  }
}
export default FoodItem
