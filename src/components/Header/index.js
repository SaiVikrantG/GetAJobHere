import './index.css'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')

    const {history} = props

    history.replace('/login')
  }

  return (
    <nav>
      <ul className="navbar">
        <li>
          <Link
            to="/"
            style={{
              backgroundColor: '#272727',
              cursor: 'pointer',
              borderStyle: 'solid',
              borderWidth: '0px',
            }}
          >
            <img
              className="website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
          </Link>
        </li>
        <li>
          <div className="nav-buttons">
            <Link className="links" to="/">
              <h1>Home</h1>
            </Link>
            <Link className="links" to="/jobs">
              <h1>Jobs</h1>
            </Link>
          </div>
        </li>
        <li>
          <button onClick={logout} className="logout-btn" type="button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
