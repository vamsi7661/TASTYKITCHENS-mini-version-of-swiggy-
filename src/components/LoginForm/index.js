import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUser = () => {
    const {username} = this.state
    return (
      <div className="user">
        <label htmlFor="input-text" className="label-name">
          USERNAME
        </label>
        <input
          type="text"
          id="input-text"
          className="input"
          placeholder="username"
          autoComplete="off"
          onChange={this.onUsername}
          value={username}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <div className="user">
        <label htmlFor="input-password" className="label-name">
          PASSWORD
        </label>
        <input
          type="password"
          id="input-password"
          className="input"
          placeholder="password"
          onChange={this.onPassword}
          value={password}
        />
      </div>
    )
  }

  render() {
    const {isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="main-container">
        <div className="login-container">
          <form className="login-form-container" onSubmit={this.onSubmitForm}>
            <img
              className="img-container small-device-img"
              src="https://res.cloudinary.com/dzg8uqesw/image/upload/v1629297084/Tatey%20Kitchen/Rectangle_1457_vbau5o.png"
              alt="website logo"
            />
            <img
              className="website logo"
              src="https://res.cloudinary.com/dzg8uqesw/image/upload/v1629095996/Tatey%20Kitchen/Group_7420_yxlx9p.png"
              alt="tasty-kitchen-logo"
            />
            <h1 className="heading">Tasty Kitchens</h1>
            <h1 className="singin">Login</h1>
            {this.renderUser()}
            {this.renderPassword()}
            <button type="submit" className="signin-btn">
              Login
            </button>
            {isError && <p className="error">{errorMsg}</p>}
          </form>
        </div>
        <div className="img-container">
          <img
            className="img-container"
            src="https://res.cloudinary.com/dzg8uqesw/image/upload/v1629081684/Tatey%20Kitchen/Rectangle_1456_wyqe0e.png"
            alt="website login"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
