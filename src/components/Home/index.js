import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />
    <div className="homePage">
      <div className="homePage-info">
        <h1 style={{fontSize: '70px'}}>Find The Job That Fits Your Life</h1>
        <p style={{fontSize: '20px'}}>
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <button type="button" className="find-jobs">
          <Link style={{textDecoration: 'none'}} to="/jobs">
            Find Jobs
          </Link>
        </button>
      </div>
    </div>
  </div>
)

export default Home
