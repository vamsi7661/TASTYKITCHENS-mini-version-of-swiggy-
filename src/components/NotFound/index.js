import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dzg8uqesw/image/upload/v1632455730/Tatey%20Kitchen/erroring_1_qoyn9o.png"
        alt="not found"
      />
      <div className="not-found-text-container">
        <h1>Page Not Found</h1>
        <p>we are sorry, the page you requested could not be found</p>
        <p>Please go back to the home page</p>
      </div>
      <Link to="/">
        <button type="button" className="home-btn">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
