const express = require('express');
const router = express.Router();
const Job = require('../models/JobSchema');

router.get('/', (req, res) => {
    res.send('Backend is running');
});
router.post('/createjob', async (req, res) => {
  let {
    jobTitle, companyName, location, jobtype,
    minsalary, maxsalary, jobDescription,
    applicationDeadline,
  } = req.body;
console.log('Received job data:', req.body);
  // Convert salary strings to numbers:
  minsalary = Number(minsalary);
  maxsalary = Number(maxsalary);

  if (
    !jobTitle || !companyName || !location ||
    !jobtype || minsalary == null ||
    maxsalary == null || !jobDescription
  ) {
    return res.status(400)
      .json({ message: "All fields including experience are required." });
  }

  try {
    const newJob = new Job({
      jobTitle,
      companyName,
      location,
      jobtype,
      minsalary,
      maxsalary,
      applicationDeadline: new Date(applicationDeadline), // ensure Date type
      jobDescription,
    });
    console.log('Saving job:', newJob);

    await newJob.save();
    res.status(201).json({ message: "Job created successfully!" });
  } catch (err) {
    console.error("Error creating job:", err);
    if (err.name === 'ValidationError') {
      for (const field in err.errors) {
        console.error(`Validation error in ${field}: ${err.errors[field].message}`);
      }
      return res.status(400).json({ message: err.message, errors: err.errors });
    }
    res.status(500).json({ message: "Server error while creating job." });
  }
});


router.get('/jobs', async (req, res) => {
    try {
      const jobs = await Job.find(); 
      res.status(200).json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs", error });
    }
});

  router.get('/filter', async (req, res) => {
    try {
      let { location, jobtype, minsalary, maxsalary } = req.query;
    
      const filter = {};
      
      minsalary = Number(minsalary);
      maxsalary = Number(maxsalary);
      
      if (location) {
        filter.location = { $regex: new RegExp(location, 'i') }; 
      }
      
      if (jobtype) {
        filter.jobtype = { $regex: new RegExp(jobtype, 'i') }; 
      }
      
      if (minsalary >= 0 && maxsalary >= 0) {
        filter.minsalary = { $gte: minsalary };  
        filter.maxsalary = { $lte: maxsalary };  
      }
  
      console.log("Received filters:", filter);
      
      const jobs = await Job.find(filter);
      res.json({ resdata: jobs });
      console.log("Filtered jobs:", jobs);
      
    } catch (err) {
      console.error('Error fetching filtered jobs:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

router.get('/bar', async (req, res) => {
  try {
    const searchTerm = req.query.name;

    if (!searchTerm) {
      return res.status(400).json({ message: 'Search term is required' });
    }

    const jobs = await Job.find({
      $or: [
        { jobTitle: { $regex: searchTerm, $options: 'i' } },  
        { jobtype: { $regex: searchTerm, $options: 'i' } },  
        { location: { $regex: searchTerm, $options: 'i' } },   
        { companyName: { $regex: searchTerm, $options: 'i' } }, 
      ],
    });

    res.json({ resdata: jobs });

  } catch (err) {
    console.error('Error during search:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

  

module.exports = router;
