import React from 'react'
import job from '../css/Job.module.css'
import { PiBuildingsThin, PiStackLight } from "react-icons/pi"

import { TfiTime } from "react-icons/tfi";

import { BsCurrencyRupee } from "react-icons/bs";


const Job = ({ jobtitle, jobtype,companylogo,minexp, maxexp, maxsalary, deadline }) => {
  
  const formatTimeAgo = (createdAt) => {
    console.log(createdAt);
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const diffInMs = currentTime - createdTime;
  
    const totalSeconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    const remainingMinutes = minutes % 60; 
    const remainingHours = hours % 24;
  
    if (totalSeconds < 60) return "Just now";
    if (minutes < 60) return `${remainingMinutes} min${remainingMinutes === 1 ? "" : "s"} ago`; 
    if (hours === 1 && days === 0) return "1 hr ago";
    if (days === 0) {
      return `${remainingHours} hr${remainingHours === 1 ? "" : "s"} ago`;
    }
  
    return `${days} day${days === 1 ? "" : "s"} ${remainingHours} hr${remainingHours === 1 ? "" : "s"} ago`;
  };
  
  
  const formatSalary = (amount) => {
    if (!amount || isNaN(amount)) return 'N/A';
  
    if (amount >= 100000) {
      return (amount / 100000).toFixed(1) + ' LPA';
    } else {
      return (amount / 1000).toFixed(0) + 'K';
    }
  };

  const salary = formatSalary(maxsalary);
  
  const ago = formatTimeAgo(deadline);

  console.log(companylogo);

  return (
    <div className={job.outline}>
      <div className={job.outlinediv}>
      <img src={`http://localhost:5000/images/${companylogo}`} width={50} height={60} alt="Company Logo" />
      <div className={job.timing}>{ago}</div>
      </div>

      <div className={job.outlinediv2}>
        <div className={job.title}>{jobtitle}</div>
        <div className={job.icons}>
          <div><TfiTime size={17} /> {minexp}-{maxexp} years</div>
          <div><PiBuildingsThin size={17} /> {jobtype}</div>
          <div><BsCurrencyRupee size={17} /> {salary}</div>
        </div>
        <div className={job.content}>
          <ul>
            <li><span>A user-friendly interface lets you browse stunning photos and videos</span></li>
            <li><span>Filter destinations based on interests and travel style, and create personalized</span></li>
          </ul>
        </div>
      </div>

      <div className={job.outlinediv}>
        <button>Apply Now</button>
      </div>
    </div>
  );
};

export default Job;
