import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', error: false, errorMsg: ''}

  componentDidMount() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      const {history} = this.props

      history.replace('/')
    }
  }

  change = event => {
    const {name, value} = event.target

    this.setState({[name]: value})
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const options = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      const {history} = this.props

      history.replace('/')
      console.log('logged in')
    } else {
      this.setState({error: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {errorMsg, error, username, password} = this.state

    return (
      <div className="login-container">
        <form className="formContainer" onSubmit={this.submitForm}>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="form-group">
            <label htmlFor="username">USERNAME</label>
            <input
              className="input"
              onChange={this.change}
              placeholder="Username"
              type="text"
              id="username"
              name="username"
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">PASSWORD</label>
            <input
              placeholder="Password"
              className="input"
              onChange={this.change}
              type="password"
              id="password"
              name="password"
              value={password}
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          {error && <p style={{color: 'red'}}>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
