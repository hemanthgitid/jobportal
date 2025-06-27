const mongoose = require('mongoose');
const path = require('path');
const logoImages = [
  'logo2.png',
  'logo3.png',
  'logo4.png'
];
const getRandomImage = () => {
  const index = Math.floor(Math.random() * logoImages.length);
  return logoImages[index];
};
const JobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    trim: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  jobtype: {
    type: String,
    required: true,
    enum: ['Fulltime', 'Partime', 'Contract', 'Internship','Onsite'],
  },
   minsalary: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        if (value < 0) {
          this.minsalary = 0;
          return true; 
        }
        
        if (value > 2000000) {
          this.minsalary = 2000000;
          return true;
        }

        return value >= 0 && value <= this.maxsalary;
      },
      message: 'Minimum salary must be between 0 and 20 lakhs, and less than or equal to maximum salary.'
    }
  },
  maxsalary: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        if (value < 0) {
          this.maxsalary = 500000;
          return true; 
        }
        
        if (value > 2000000) {
          this.maxsalary = 2000000;
          return true; 
        }

        return value >= this.minsalary;
      },
      message: 'Maximum salary must be greater than or equal to minimum salary and less than or equal to 20 lakhs.'
    }
  },
  minExperience: {
    type: Number,
    required: false,
    min: 0,
    default:1
  },
  maxExperience: {
    type: Number,
    required: false,
    min: 0,
    default:3
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  companyLogo: {
    type: String,
    default: getRandomImage 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Job', JobSchema);
