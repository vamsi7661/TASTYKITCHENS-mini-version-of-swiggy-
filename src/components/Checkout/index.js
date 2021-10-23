import {Link} from 'react-router-dom'
import {TiTick} from 'react-icons/ti'
import Header from '../Header'
import './index.css'

const Checkout = () => (
  <div>
    <Header />
    <div className="place-order-main-container">
      <div className="place-order-container">
        <div className="tick-container">
          <p>
            <TiTick className="tick" />
          </p>
        </div>
        <div className="place-order-text">
          <h3>Payment Successful</h3>
          <p>Thank you for ordering</p>
          <p>Your payment is successfully completed</p>
        </div>
        <Link to="/">
          <button type="button" className="place-order-btn">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </div>
)
export default Checkout
