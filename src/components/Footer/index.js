import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer">
    <div className="img-heading">
      <img
        className="tasty-kitchen-footer-logo"
        src="https://res.cloudinary.com/dzg8uqesw/image/upload/v1630658420/Tatey%20Kitchen/Group_7420_1_t6arx9.png"
        alt="website-footer-logo"
      />
      <h1 className="footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="descreption">
      The only thing we are serious about is food. Contact us on
    </p>
    <div>
      <a href="https://pin.it/6ui0AVn">
        <button type="button" className="icons" testid="pintrest-social-icon">
          <FaPinterestSquare />
        </button>
      </a>

      <a href="https://instagram.com/vamsi_comrade?utm_source=qr">
        <button type="button" className="icons" testid="instagram-social-icon">
          <FaInstagram />
        </button>
      </a>
      <a href="https://twitter.com/VamsiKr88388344?=7WuNvVWfA5fVRpN9wDAqyg&s=08">
        <button type="button" className="icons" testid="twitter-social-icon">
          <FaTwitter />
        </button>
      </a>
      <button
        type="button"
        disabled
        className="icons"
        testid="facebook-social-icon"
      >
        <FaFacebookSquare />
      </button>
    </div>
  </div>
)
export default Footer
