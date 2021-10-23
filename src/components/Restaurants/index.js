import {Component} from 'react'
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import RestaurantCard from '../RestaurantCard'
import RestaurantsHeader from '../RestaurantsHeader'
import './index.css'

const Options = [
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Restaurants extends Component {
  state = {
    Restaurant: [],
    isRestaurantsLoading: false,
    filterOption: Options[1].value,
    activePage: 1,
  }

  componentDidMount() {
    this.getProducts()
  }

  renderLoader = () => (
    <div
      testid="restaurants-list-loader"
      className="loader-restaurants-container"
    >
      <Loader type="TailSpin" color="#ffcc00" height="50" width="50" />
    </div>
  )

  getProducts = async () => {
    this.setState({isRestaurantsLoading: true})

    const {filterOption, activePage} = this.state

    console.log(filterOption)
    console.log(activePage)
    const jwt = Cookies.get('jwt_token')
    const limit = 9
    const offset = (activePage - 1) * limit
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${filterOption}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateRestaurantDetails = data.restaurants.map(eachRestaurant => ({
        id: eachRestaurant.id,
        restaurantName: eachRestaurant.name,
        restaurantImage: eachRestaurant.image_url,
        cuisine: eachRestaurant.cuisine,
        rating: eachRestaurant.user_rating.rating,
        totalReviews: eachRestaurant.user_rating.total_reviews,
      }))
      this.setState({
        Restaurant: updateRestaurantDetails,
        isRestaurantsLoading: false,
      })
    }
  }

  onSortBy = option => {
    this.setState({filterOption: option}, this.getProducts)
  }

  OnRightButton = () => {
    const {activePage} = this.state
    if (activePage <= 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getProducts,
      )
    }
  }

  OnLeftButton = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getProducts,
      )
    }
  }

  render() {
    const {
      Restaurant,
      filterOption,
      activePage,
      isRestaurantsLoading,
    } = this.state

    return (
      <div className="products-container">
        {isRestaurantsLoading ? (
          this.renderLoader()
        ) : (
          <div>
            <RestaurantsHeader
              options={Options}
              filterOption={filterOption}
              onSortBy={this.onSortBy}
            />
            <hr className="hor-line" />
            <ul className="restaurants-container">
              {Restaurant.map(eachRestaurant => (
                <RestaurantCard
                  eachRestaurant={eachRestaurant}
                  key={eachRestaurant.id}
                />
              ))}
            </ul>
            <div className="buttons">
              <button
                testid="pagination-left-button"
                type="button"
                className="page-btn"
                onClick={this.OnLeftButton}
              >
                <BsChevronLeft />
              </button>
              <p testid="active-page-number">{activePage} of 20</p>
              <button
                testid="pagination-right-button"
                type="button"
                className="page-btn"
                onClick={this.OnRightButton}
              >
                <BsChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}
export default Restaurants
