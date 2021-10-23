import {Link} from 'react-router-dom'
import './index.css'

const EmptyCart = () => (
  <div>
    <div className="empty-cart-container">
      <img
        className="empty-car-img"
        src="https://res.cloudinary.com/dzg8uqesw/image/upload/v1632455719/Tatey%20Kitchen/cooking_1_lvdjjz.png"
        alt="empty cart"
      />
      <div className="empty-cart-text-container">
        <h1>No Order Yet!</h1>
        <p>Your cart is empty. Add something from the menu.</p>
      </div>
      <Link to="/">
        <button type="button" className="place-order-btn">
          Order Now
        </button>
      </Link>
    </div>
  </div>
)
export default EmptyCart
