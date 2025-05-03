import React, { useState } from 'react';
import CreateJobcss from '../css/CreateJob.module.css';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { RxDoubleArrowRight } from "react-icons/rx";

import axios from 'axios'
const CreateJob = ({ createjob }) => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: '',
    minsalary: '',
    maxsalary: '',
    applicationDeadline: new Date().toISOString().split('T')[0],
    jobDescription: ''
  });

  const [errors, setErrors] = useState({
    jobTitle: false,
    companyName: false,
    location: false,
    jobType: false,
    minsalary: false,
    maxsalary: false,
    applicationDeadline: false,
    jobDescription: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setJobDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    setErrors(prevState => {
      const newErrors = { ...prevState };
  
      if (value === '' || value === null) {
        newErrors[name] = true; 
      }
      else if (name === 'minsalary' && parseInt(value) < parseInt(jobDetails.salaryMin)) {
        newErrors[name] = true; 
      }
      else if (name === 'maxsalary' && parseInt(value) > parseInt(jobDetails.salaryMax)) {
        newErrors[name] = true; 
      }
      else if (name === 'applicationDeadline' && new Date(value) <= new Date()) {
        newErrors[name] = true; 
      }
      else {
        newErrors[name] = false;
      }
  
      return newErrors;
    });
  };
  

  const handleSubmit = async(e) => {

    e.preventDefault();
    console.log(errors);
    const isValid = !Object.values(errors).includes(true);
     console.log(jobDetails);
    if (isValid) {
      try { 
        console.log(jobDetails);
        const response = await axios.post(
          'http://localhost:5000/admin/createjob',  
          jobDetails
        );

        console.log('Job posted successfully:', response.data);
  
        createjob();
  
      } catch (error) {
        console.error('Error posting job:', error.response?.data || error.message);
      }

    } else {
      console.log('Form is not valid.');
    }
  };

  return (
    <div className={CreateJobcss.outline}>
      <div>
        <h1>Create Job Opening</h1>
      </div>
      <div className={CreateJobcss.innerInput1}>
        <div className={CreateJobcss.innerInput3}>
          <div>
            <h4>Job Title</h4>
            <input
              type='text'
              name="jobTitle"
              value={jobDetails.jobTitle}
              onChange={handleChange}
              style={{ border: errors.jobTitle ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
          <div>
            <h4>Company Name</h4>
            <input
              type='text'
              name="companyName"
              value={jobDetails.companyName}
              onChange={handleChange}
              placeholder='Amazon, Microsoft, Swiggy'
              style={{ border: errors.companyName ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className={CreateJobcss.innerInput3}>
          <div>
            <h4>Location</h4>
            <select
              name="location"
              value={jobDetails.location}
              onChange={handleChange}
              style={{ border: errors.location ? "1px solid red" : "1px solid #ccc" }}
            >
              <option value="">Choose Preferred Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Trichy">Trichy</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Chandigarh">Chandigarh</option>
              <option value="Kochi">Kochi</option>
              <option value="Ahmedabad">Ahmedabad</option>
            </select>
          </div>
          <div>
            <h4>Job Type</h4>
            <select
              name="jobType"
              value={jobDetails.jobType}
              onChange={handleChange}
              style={{ border: errors.jobType ? "1px solid red" : "1px solid #ccc" }}
            >
              <option value="">Preferred Job Type</option>
              <option value="Fulltime">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Partime">Partime</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
        <div className={CreateJobcss.innerInput3}>
          <div>
            <h4>Salary Range</h4>
            <input
              type="number"
              name="minsalary"
              value={jobDetails.salaryMin}
              onChange={handleChange}
              placeholder="&#8593; &#8595; $0"
              style={{ border: errors.salaryMin ? "1px solid red" : "1px solid #ccc" }}
            />
            <input
              type="number"
              name="maxsalary"
              value={jobDetails.salaryMax}
              onChange={handleChange}
              placeholder="&#8593; &#8595; $12,00,000"
              style={{ border: errors.salaryMax ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
          <div>
            <h4>Application Deadline</h4>
            <input
                type='date'
                name="applicationDeadline"
                value={jobDetails.applicationDeadline }           
                onChange={handleChange}
                style={{ border: errors.applicationDeadline ? "1px solid red" : "1px solid #ccc" }}
              />
          </div>
        </div>
        <div className={CreateJobcss.innerInput3}>
          <div>
            <h4>Job Description</h4>
            <textarea
              name="jobDescription"
              rows="7"
              cols="70"
              value={jobDetails.jobDescription}
              onChange={handleChange}
              placeholder='Please share a description to let the candidate know more about the job role'
              style={{ border: errors.jobDescription ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
        </div>
      </div>
      <div className={CreateJobcss.buttons}>
        <button onClick={createjob}>Save Draft <MdKeyboardDoubleArrowDown /></button>
        <button onClick={handleSubmit}>Publish <RxDoubleArrowRight /></button>
      </div>
    </div>
  );
};

export default CreateJob;
