import {Component} from 'react'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJob from '../SimilarJob'
import './index.css'

const status = {
  loading: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILED',
}

class JobItem extends Component {
  state = {isLoading: status.loading, jobData: {}}

  componentDidMount() {
    this.fetchDetails()
  }

  fetchDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)

    if (response.ok) {
      const data = await response.json()

      this.setState({isLoading: status.success, jobData: data})
    } else {
      this.setState({isLoading: status.fail})
    }
  }

  callFetch = () => {
    this.setState({isLoading: status.loading}, this.fetchDetails)
  }

  render() {
    const {isLoading, jobData} = this.state
    let display

    console.log(jobData)

    if (isLoading === status.loading) {
      display = (
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
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
      const jobDetails = jobData.job_details
      const formattedData = {
        companyLogoUrl: jobDetails.company_logo_url,
        title: jobDetails.title,
        rating: jobDetails.rating,
        location: jobDetails.location,
        employmentType: jobDetails.employment_type,
        packagePA: jobDetails.package_per_annum,
        jobDescription: jobDetails.job_description,
        companyUrl: jobDetails.company_website_url,
      }

      const {
        companyLogoUrl,
        title,
        rating,
        location,
        employmentType,
        packagePA,
        jobDescription,
        companyUrl,
      } = formattedData

      display = (
        <div className="job-info">
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo"
            />
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <h1 style={{marginBottom: '-5px'}}>{title}</h1>
              <p>{rating}</p>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: '5px',
                }}
              >
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  margin: '5px',
                }}
              >
                <BsFillBriefcaseFill />
                <p>{employmentType}</p>
              </div>
            </div>
            <h1>{packagePA}</h1>
          </div>
          <hr style={{width: '100%'}} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              textDecoration: 'none',
            }}
          >
            <h1>Description</h1>
            <a
              href={companyUrl}
              style={{display: 'flex', alignItems: 'center'}}
            >
              <p>Visit</p>
              <FaExternalLinkAlt />
            </a>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul className="skillsSection">
            {jobData.job_details.skills.map(each => (
              <li
                style={{display: 'flex', margin: '15px', alignItems: 'center'}}
                key={each.name}
              >
                <img
                  className="skill-image"
                  src={each.image_url}
                  alt={each.name}
                />
                <p>{each.name}</p>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div className="LifeContainer">
            <p>{jobData.job_details.life_at_company.description}</p>
            <img
              className="lifeImage"
              src={jobData.job_details.life_at_company.image_url}
              alt="life at company"
            />
          </div>
        </div>
      )
    }

    return (
      <div className="jobItem">
        <Header />
        {display}
        <div className="similarJobs">
          <h1>Similar Jobs</h1>
          <ul className="similarJobList">
            {isLoading === status.success &&
              jobData.similar_jobs.map(each => (
                <SimilarJob key={each.id} details={each} />
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default JobItem
