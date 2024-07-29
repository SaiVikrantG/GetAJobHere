import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class FilterGroup extends Component {
  state = {details: {}, isLoading: status.loading}

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
    const response = await fetch('https://apis.ccbp.in/profile', options)
    const data = await response.json()

    if (response.ok) {
      this.setState({isLoading: status.success, details: data.profile_details})
    } else {
      this.setState({isLoading: status.failed})
    }
  }

  callFetch = () => {
    this.setState({isLoading: status.loading}, this.fetchDetails)
  }

  render() {
    const {isLoading, details} = this.state
    const {changeFilter} = this.props
    let display

    if (isLoading === status.loading) {
      display = (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      )
    } else if (isLoading === status.success) {
      display = (
        <div>
          <img
            src={details.profile_image_url}
            alt="profile"
            style={{height: '50px', width: '50px'}}
          />
          <h1>{details.name}</h1>
          <p>{details.short_bio}</p>
        </div>
      )
    } else {
      display = (
        <button type="button" className="retryButton" onClick={this.callFetch}>
          Retry
        </button>
      )
    }

    return (
      <div className="filters-group">
        <div className="profile">{display}</div>
        <hr style={{width: '100%', marginTop: '15px'}} />
        <div className="employmentType">
          <h1>Type of Employment</h1>
          <ul>
            {employmentTypesList.map(each => (
              <li className="checkbox-container" key={each.employmentTypeId}>
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  name="employmentType"
                  onChange={changeFilter}
                />
                <label htmlFor={each.employmentTypeId}>{each.label}</label>
              </li>
            ))}
          </ul>
        </div>
        <hr style={{width: '100%', marginTop: '15px'}} />

        <div className="employmentType">
          <h1>Salary Range</h1>
          <ul>
            {salaryRangesList.map(each => (
              <li className="checkbox-container" key={each.salaryRangeId}>
                <input
                  type="radio"
                  id={each.salaryRangeId}
                  name="salaryRange"
                  onChange={changeFilter}
                />
                <label htmlFor={each.salaryRangeId}>{each.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default FilterGroup
