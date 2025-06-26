
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

  // useEffect(() => {
  //   const fetchAllJobs = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/admin/jobs');
  //       setJobs(response.data || []);
  //     } catch (error) {
  //       console.error('Failed to fetch jobs:', error);
  //       setJobs([]);
  //     }
  //   };

useEffect(() => {
  const fetchAllJobs = async () => {
    try {
      // Fetch jobs from deployed backend URL
      const response = await axios.get('https://jobportal-2-i5xu.onrender.com/admin/jobs');
      setJobs(response.data || []);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      setJobs([]);
    }
  };

  fetchAllJobs();
  document.title = 'Cybermind Works Job Portal';
}, [isCreateJob]);

  //   fetchAllJobs();
  //   document.title = 'CyberMinds Job Portal';
  // }, [isCreateJob]);

  // useEffect(() => {
  //   if (initialMount.current) {
  //     initialMount.current = false;
  //     return;
  //   }

  //   if (
  //     !filter.location &&
  //     !filter.jobtype &&
  //     filter.minsalary === 0 &&
  //     filter.maxsalary === 0 &&
  //     !bar
  //   ) {
  //     const fetchAllJobs = async () => {
  //       try {
  //         const response = await axios.get('http://localhost:5000/admin/jobs');
  //         setJobs(response.data || []);
  //       } catch (error) {
  //         console.error('Failed to fetch jobs:', error);
  //         setJobs([]);
  //       }
  //     };
  //     fetchAllJobs();
  //   } else {
  //     const fetchFilteredData = async () => {
  //       try {
  //         const { location, jobtype, minsalary, maxsalary } = filter;

  //         const response = await axios.get('http://localhost:5000/admin/filter', {
  //           params: {
  //             location,
  //             jobtype,
  //             minsalary,
  //             maxsalary,
  //           },
  //         });

  //         setJobs(response.data.resdata || []);
  //       } catch (error) {
  //         console.error('Error fetching filtered data:', error);
  //         setJobs([]);
  //       }
  //     };

  //     if (bar) {
  //       const fetchSearchResults = async () => {
  //         try {
  //           const response = await axios.get(`http://localhost:5000/admin/bar?name=${bar}`);
  //           setJobs(response.data.resdata || []);
  //         } catch (error) {
  //           console.error('Search Error:', error);
  //           setJobs([]);
  //         }
  //       };
  //       fetchSearchResults();
  //     } else {
  //       fetchFilteredData();
  //     }
  //   }
  // }, [filter, bar]);


useEffect(() => {
  if (initialMount.current) {
    initialMount.current = false;
    return;
  }

  if (
    !filter.location &&
    !filter.jobtype &&
    filter.minsalary === 0 &&
    filter.maxsalary === 0 &&
    !bar
  ) {
    const fetchAllJobs = async () => {
      try {
        // Fetch all jobs from backend
        const response = await axios.get('https://jobportal-2-i5xu.onrender.com/admin/jobs');
        setJobs(response.data || []);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setJobs([]);
      }
    };
    fetchAllJobs();
  } else {
    const fetchFilteredData = async () => {
      try {
        const { location, jobtype, minsalary, maxsalary } = filter;

        // Fetch filtered jobs from backend
        const response = await axios.get('https://jobportal-2-i5xu.onrender.com/admin/filter', {
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

    if (bar) {
      const fetchSearchResults = async () => {
        try {
          // Search jobs by term on backend
          const response = await axios.get(`https://jobportal-2-i5xu.onrender.com/admin/bar?name=${bar}`);
          setJobs(response.data.resdata || []);
        } catch (error) {
          console.error('Search Error:', error);
          setJobs([]);
        }
      };
      fetchSearchResults();
    } else {
      fetchFilteredData();
    }
  }
}, [filter, bar]);

  const rangeSelector = (event, newValue) => {
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
  };

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
            <div>No jobs found.🫣</div>
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
