import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsStarFill} from 'react-icons/bs'
import FoodItem from '../FoodItem'
import Header from '../Header'

import './index.css'

class Restaurant extends Component {
  state = {
    RestaurantDetails: [],
    RestaurantFoodDetails: [],
    isRestaurantLoading: false,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({isRestaurantLoading: true})

    const jwt = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateRestaurantData = RestaurantData => ({
        id: RestaurantData.id,
        restaurantImg: RestaurantData.image_url,
        name: RestaurantData.name,
        cuisine: RestaurantData.cuisine,
        costForTwo: RestaurantData.cost_for_two,
        location: RestaurantData.location,
        rating: RestaurantData.rating,
        reviewsCount: RestaurantData.reviews_count,
      })
      const FoodData = data.food_items.map(eachItem => ({
        foodItemImg: eachItem.image_url,
        foodItemId: eachItem.id,
        foodItemType: eachItem.food_type,
        foodItemName: eachItem.name,
        foodItemCost: eachItem.cost,
        foodItemRating: eachItem.rating,
      }))
      const RestaurantById = updateRestaurantData(data)
      this.setState({
        RestaurantDetails: RestaurantById,
        RestaurantFoodDetails: FoodData,
        isRestaurantLoading: false,
      })
    }
  }

  render() {
    const {
      RestaurantFoodDetails,
      RestaurantDetails,
      isRestaurantLoading,
    } = this.state
    const {
      restaurantImg,
      name,
      location,
      cuisine,
      rating,
      reviewsCount,
      costForTwo,
    } = RestaurantDetails

    const ActiveHome = 'home'
    return (
      <div>
        <Header active={ActiveHome} />
        <div className="Restaurant-container">
          {isRestaurantLoading ? (
            <div
              testid="restaurants-details-loader"
              className="loader-restaurants-container"
            >
              <Loader type="TailSpin" color="#ffcc00" height="50" width="50" />
            </div>
          ) : (
            <div>
              <div className="restaurant-bg">
                <img
                  className="restaurant-img"
                  src={restaurantImg}
                  alt="restaurant"
                />

                <div className="banner-text-container">
                  <h1 className="restaurant-name">{name}</h1>
                  <div>
                    <p className="cuisine">{cuisine}</p>
                    <p className="cuisine">{location}</p>
                  </div>
                  <div className="rating-container">
                    <div>
                      <div className="rating-star">
                        <BsStarFill className="star-fill" />
                        <p className="rating">{rating}</p>
                      </div>
                      <p className="rating-count">{reviewsCount}+ Ratings</p>
                    </div>
                    <hr className="hr-line" />
                    <div>
                      <p className="cost">₹ {costForTwo}</p>
                      <p className="cost-name">Cost for two</p>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="food-items">
                {RestaurantFoodDetails.map(eachFoodItem => (
                  <FoodItem
                    eachFoodItem={eachFoodItem}
                    key={eachFoodItem.foodItemId}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default Restaurant
