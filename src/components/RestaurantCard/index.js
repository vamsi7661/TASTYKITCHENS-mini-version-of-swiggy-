import {Link} from 'react-router-dom'
import {BsStarFill} from 'react-icons/bs'
import './index.css'

const RestaurantCard = props => {
  const {eachRestaurant} = props
  const {id, restaurantName, restaurantImage, cuisine, rating} = eachRestaurant

  return (
    <Link to={`/restaurant/${id}`} className="nav-link">
      <li testid="restaurant-item">
        <div className="restaurant-container">
          <div>
            <img
              className="restaurantImage"
              src={restaurantImage}
              alt={restaurantName}
            />
          </div>
          <div className="details-container">
            <h1 className="restaurantName">{restaurantName}</h1>
            <p className="cuisine-restaurants">{cuisine}</p>
            <div className="ratings-container">
              <BsStarFill className="star" />
              <p className="rating-restaurants">{rating}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}
export default RestaurantCard
