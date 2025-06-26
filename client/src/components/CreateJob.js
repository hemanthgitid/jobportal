import React, { useState } from 'react';
import CreateJobcss from '../css/CreateJob.module.css';
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { RxDoubleArrowRight } from "react-icons/rx";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
  const handlesavedraft = () =>{
        toast.success('Draft Saved successfully!', {
        autoClose: 1500, 
        });

      setTimeout(() => {
        createjob();
      }, 1500);
  }

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
      } else if (name === 'minsalary' && parseInt(value) < 0) {
        newErrors[name] = true;
      } else if (name === 'maxsalary' && parseInt(value) < parseInt(jobDetails.minsalary)) {
        newErrors[name] = true;
      } else if (name === 'applicationDeadline' && new Date(value) <= new Date()) {
        newErrors[name] = true;
      } else {
        newErrors[name] = false;
      }

      return newErrors;
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const isValid = !Object.values(errors).includes(true);
  if (isValid) {
    try {
      const response = await axios.post(
        `http://localhost:5000/admin/createjob`,
        jobDetails
      );
      console.log('Job posted successfully:', response.data);
      toast.success('Job posted successfully!', {
        autoClose: 1500, 
        });  
      setTimeout(() => {
        createjob();  
      }, 1500);  
    } catch (error) {
      console.error('Error posting job:', error.response?.data || error.message);
      toast.error('Error posting job. Please try again later.', {
        autoClose: 1500, 
        });
      setTimeout(() => {
        createjob();  
      }, 1500);  
    }
  } else {
    toast.error('Please fill in all required fields correctly.', {
        autoClose: 1500, 
    });
     setTimeout(() => {
        createjob();  
      }, 1500);  
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
            <p>Job Title <span style={{ color: 'red' }}>*</span></p>
              <input
              type='text'
              name="jobTitle"
              required
              value={jobDetails.jobTitle}
              onChange={handleChange}
              style={{ border: errors.jobTitle ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
          <div>
            <p>Company Name <span style={{ color: 'red' }}>*</span></p>
            <input
              type='text'
              name="companyName"
              required
              value={jobDetails.companyName}
              onChange={handleChange}
              placeholder='Amazon, Microsoft, Swiggy'
              style={{ border: errors.companyName ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className={CreateJobcss.innerInput3}>
          <div>
            <p>Location <span style={{ color: 'red' }}>*</span></p>
            <select
              name="location"
              required
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
            <p>Job Type <span style={{ color: 'red' }}>*</span></p>
            <select
              name="jobType"
              required
              value={jobDetails.jobType}
              onChange={handleChange}
              style={{ border: errors.jobType ? "1px solid red" : "1px solid #ccc" }}
            >
              <option value="">Preferred Job Type</option>
              <option value="Fulltime">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Partime">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
        <div className={CreateJobcss.innerInput3}>
          <div>
            <p>Salary Range <span style={{ color: 'red' }}>*</span></p>
            <input
              type="number"
              name="minsalary"
              required
              value={jobDetails.minsalary}
              onChange={handleChange}
              placeholder="↑↓ ₹0"
              style={{ border: errors.minsalary ? "1px solid red" : "1px solid #ccc", marginRight: "10px" }}
            />
            <input
              type="number"
              name="maxsalary"
              required
              value={jobDetails.maxsalary}
              onChange={handleChange}
              placeholder="↑↓ ₹12,00,000"
              style={{ border: errors.maxsalary ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
          <div>
            <p>Application Deadline <span style={{ color: 'red' }}>*</span></p>
            <input
              type='date'
              name="applicationDeadline"
              required
              value={jobDetails.applicationDeadline}
              onChange={handleChange}
              style={{ border: errors.applicationDeadline ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
        </div>
        <div className={CreateJobcss.innerInput3}>
          <div>
            <p>Job Description <span style={{ color: 'red' }}>*</span></p>
            <textarea
              name="jobDescription"
              required
              rows="7"
              cols="78"
              value={jobDetails.jobDescription}
              onChange={handleChange}
              placeholder='Please share a description to let the candidate know more about the job role'
              style={{ border: errors.jobDescription ? "1px solid red" : "1px solid #ccc" }}
            />
          </div>
        </div>
      </div>
      <div className={CreateJobcss.buttons}>
        <button onClick={handlesavedraft}>Save Draft <MdKeyboardDoubleArrowDown /></button>
        <button onClick={handleSubmit}>Publish <RxDoubleArrowRight /></button>
      </div>
       <ToastContainer />
    </div>
  );
};

export default CreateJob;