import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobTile = props => {
  const {details} = props
  const formattedData = {
    id: details.id,
    companyLogoUrl: details.company_logo_url,
    employmentType: details.employment_type,
    jobDescription: details.job_description,
    location: details.location,
    rating: details.rating,
    title: details.title,
  }

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = formattedData

  return (
    <li className="SimilarJobContainer">
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
    </li>
  )
}

export default JobTile
