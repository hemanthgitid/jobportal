import React from 'react'
import job from '../css/Job.module.css' 
import { GoStack } from "react-icons/go";
import { TiUserAddOutline } from "react-icons/ti";
import { RiBuildingLine } from "react-icons/ri";


const Job = ({ jobtitle, jobtype,companylogo,minexp, maxexp, maxsalary, deadline }) => {
    // const API = process.env.REACT_APP_BACKEND_URL;

  const formatTimeAgo = (createdAt) => {
    const currentTime = new Date();
    const createdTime = new Date(createdAt);
    const diffInMs = currentTime - createdTime;

    const totalSeconds = Math.floor(diffInMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    const remainingMinutes = totalMinutes % 60; 

    if (totalSeconds < 60) return "Just now";
    if (totalMinutes < 60) return `${remainingMinutes} min${remainingMinutes === 1 ? "" : "s"} ago`; 
    if (totalHours < 24) return `${totalHours} hr${totalHours === 1 ? "" : "s"} ago`;
    return `${totalDays} day${totalDays === 1 ? "" : "s"} ago`;
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


  return (
    <div className={job.outline}>
      <div className={job.outlinediv}>
      <img src={`/images/${companylogo}`} width={50} height={60} alt="Company Logo" />
      <div className={job.timing}>{ago}</div>
      </div>

      <div className={job.outlinediv2}>
        <div className={job.title}>{jobtitle}</div>
        <div className={job.icons}>
          <div><TiUserAddOutline size={22} />{minexp}-{maxexp} yr Exp</div>
          <div><RiBuildingLine /> {jobtype}</div>
          <div><GoStack />{salary}</div>
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
