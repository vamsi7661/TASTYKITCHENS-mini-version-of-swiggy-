import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import Header from '../Header'
import Carousel from '../Carousel'
import Restaurants from '../Restaurants'
import Footer from '../Footer'

import './index.css'

const Home = () => {
  const ActiveHome = 'home'
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div>
      <Header active={ActiveHome} />
      <Carousel />
      <Restaurants />
      <Footer />
    </div>
  )
}

export default Home
