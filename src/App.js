import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'
import CartContext from './context/CartContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Restaurant from './components/Restaurant'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const localStorageData = () => {
  const newCartList = JSON.parse(localStorage.getItem('cartList'))
  if (newCartList === null) {
    return []
  }
  return newCartList
}

class App extends Component {
  state = {cartList: localStorageData()}

  addItems = eachFoodItem => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList, eachFoodItem],
    }))
  }

  removeItem = itemId => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachItem => eachItem.foodItemId !== itemId,
    )
    this.setState({cartList: filteredCartList})
  }

  increaseQty = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.foodItemId) {
          const updatedQty = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQty}
        }
        return eachItem
      }),
    }))
  }

  decreaseQty = id => {
    const {cartList} = this.state
    const cartItem = cartList.find(eachItem => eachItem.foodItemId === id)
    const validate = cartItem.quantity > 1
    if (validate) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.foodItemId) {
            const updatedQty = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQty}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeItem(id)
    }
  }

  clearItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartList', JSON.stringify(cartList))
    return (
      <>
        <CartContext.Provider
          value={{
            cartList,
            addItems: this.addItems,
            clearItems: this.clearItems,
            removeItem: this.removeItem,
            increaseQty: this.increaseQty,
            decreaseQty: this.decreaseQty,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={Restaurant}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/payment" component={Checkout} />
            <ProtectedRoute component={NotFound} />
          </Switch>
        </CartContext.Provider>
      </>
    )
  }
}

export default App
