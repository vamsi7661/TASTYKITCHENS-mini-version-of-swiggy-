import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

class Carousel extends Component {
  state = {CarouselImgs: [], isLoading: false}

  componentDidMount() {
    this.getCarouselImgs()
  }

  getCarouselImgs = async () => {
    this.setState({isLoading: true})
    const jwt = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    const updateData = data.offers.map(eachImg => ({
      id: eachImg.id,
      imageUrl: eachImg.image_url,
    }))
    this.setState({
      CarouselImgs: updateData,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="restaurants-offers-loader" className="loader-container">
      <Loader type="ThreeDots" color=" #ffcc00" height="30" width="30" />
    </div>
  )

  renderImgs = () => {
    const {CarouselImgs} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      pauseOnFocus: false,
    }
    return (
      <ul className="container-carousel">
        <Slider {...settings}>
          {CarouselImgs.map(eachImg => (
            <li key={eachImg.id}>
              <img
                src={eachImg.imageUrl}
                className="img-carousel"
                alt="offer"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderImgs()
  }
}

export default Carousel
