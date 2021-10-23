import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const {active, history} = props
  const onClickLogout = () => {
    // const {} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const HomeActive = active === 'home' ? 'home' : ''
  const CartActive = active === 'cart' ? 'home' : ''
  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length
        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="navbar-bg">
        <div className="logo-container">
          <Link to="/">
            <img
              className="website-logo"
              src="https://res.cloudinary.com/dzg8uqesw/image/upload/v1629095996/Tatey%20Kitchen/Group_7420_yxlx9p.png"
              alt="website logo"
            />
          </Link>
          <h1 className="heading-tasty ">Tasty Kitchens</h1>
        </div>
        <div className="nav-options">
          <ul className="nav-menu">
            <li className={`nav-item ${HomeActive}`}>
              <Link to="/" className={`nav-link ${HomeActive}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className={`nav-link ${CartActive}`}>
                Cart
                {renderCartItemsCount()}
              </Link>
            </li>
          </ul>

          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
