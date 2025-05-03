import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar.js';
import Filtercart from '../components/Filtercart.js';
import Job from '../components/Job.js';
import CreateJob from '../components/CreateJob.js';
import Homecss from '../css/Home.module.css';
import axios from 'axios';

const Home = () => {
  const [isCreateJob, setisCreateJob] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [value, setValue] = useState([20, 40]);
  const [bar, setBar] = useState('');
  const [filter, setFilter] = useState({
    location: '',
    jobtype: '',
    minsalary: 0,
    maxsalary: 0,
  });

  const initialMount = useRef(true); 

  const handleCreatejob = () => {
    setisCreateJob(!isCreateJob);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/admin/jobs')
      .then((response) => {
        setJobs(response.data || []);
      })
      .catch((error) => {
        console.error('Failed to fetch jobs:', error);
        setJobs([]);
      });
  }, [isCreateJob]);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false; 
      return;
    }

    const fetchFilteredData = async () => {
      try {
        const { location, jobtype, minsalary, maxsalary } = filter;

        const response = await axios.get('http://localhost:5000/admin/filter', {
          params: {
            location,
            jobtype,
            minsalary,
            maxsalary,
          },
        });

        setJobs(response.data.resdata || []);
      } catch (error) {
        console.error('Error fetching filtered data:', error);
        setJobs([]);
      }
    };

    fetchFilteredData();
  }, [filter]);

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    setFilter((prev) => ({
      ...prev,
      minsalary: newValue[0],
      maxsalary: newValue[1],
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handlesearchbar = (e) => {
    const query = e.target.value;
    setBar(query);
    axios
      .get(`http://localhost:5000/admin/bar?name=${query}`)
      .then((res) => setJobs(res.data.resdata))
      .catch((err) => {
        console.error('Search Error:', err);
        setJobs([]);
      });
  };
  console.log("jobs");
  console.log(jobs);

  return (
    <>
      <div className={isCreateJob ? Homecss.hidden : Homecss.outline1}>
        <div className={Homecss.outline2}>
          <Navbar createjob={handleCreatejob} />
          <Filtercart
            range={rangeSelector}
            handlesearch={handlesearchbar}
            filterchange={handleFilterChange}
          />
        </div>
        <div className={Homecss.outline3}>
          {jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            <>
              {jobs.map((job) => (
                <Job
                  key={job._id}
                  jobtype={job.jobtype}
                  jobtitle={job.jobTitle}
                  minexp={job.minExperience}
                  maxexp={job.maxExperience}
                  maxsalary={job.maxsalary}
                  deadline={job.createdAt}
                  companylogo={job.companyLogo}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {isCreateJob && (
        <div className={Homecss.createjobcss}>
          <CreateJob createjob={handleCreatejob} />
        </div>
      )}
    </>
  );
};

export default Home;
