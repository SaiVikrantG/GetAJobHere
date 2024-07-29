/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import JobTile from '../JobTile'
import FilterGroup from '../FilterGroup'
import Header from '../Header'
import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class Jobs extends Component {
  state = {
    searchKey: '',
    employmentType: [],
    salaryRange: [],
    isLoading: status.loading,
    jobsData: [],
  }

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const {searchKey, employmentType, salaryRange} = this.state

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchKey}`

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      this.setState({isLoading: status.success, jobsData: data.jobs})
    } else {
      this.setState({isLoading: status.fail})
    }
  }

  callFetch = () => {
    this.setState({isLoading: status.loading}, this.fetchDetails)
  }

  change = event => {
    const {name, value, id, checked} = event.target

    if (name === 'employmentType') {
      this.setState(prevState => {
        const updatedArray = checked
          ? [...prevState[name], id]
          : prevState[name].filter(item => item !== id)

        return {[name]: updatedArray}
      }, this.callFetch)
    } else if (name === 'salaryRange') {
      this.setState({[name]: id}, this.callFetch)
    } else {
      this.setState({[name]: value}, this.callFetch)
    }
  }

  render() {
    const {searchKey, isLoading, jobsData} = this.state

    let display
    if (isLoading === status.loading) {
      display = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (isLoading === status.success && jobsData.length !== 0) {
      display = (
        <ul className="jobs-scroll">
          {jobsData.map(each => (
            <JobTile key={each.id} details={each} />
          ))}
        </ul>
      )
    } else if (isLoading === status.fail) {
      display = (
        <div className="errorImage">
          <img
            className="error-img"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for.</p>
          <button
            type="button"
            className="retryButton"
            onClick={this.callFetch}
          >
            Retry
          </button>
        </div>
      )
    } else {
      display = (
        <div className="errorImage">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="error-img"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters.</p>
        </div>
      )
    }

    return (
      <div className="JobsPage">
        <Header />
        <div className="jobs-dashboard">
          <FilterGroup changeFilter={this.change} />
          <div className="jobs-display">
            <div className="searchBar">
              <input
                value={searchKey}
                onChange={this.change}
                name="searchKey"
                type="search"
                placeholder="Search"
                className="searchInput"
              />
              <button
                style={{
                  height: '45px',
                  width: '45px',
                  backgroundColor: ' #7e858e',
                  padding: '5px',
                }}
                type="button"
                data-testid="searchButton"
                onClick={this.callFetch}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {display}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
