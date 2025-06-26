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
    default: 'Onsite'
  },
  minsalary: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value <= this.maxsalary;
      },
      message: 'Minimum salary must be lesser than or equal to Maximum salary.'
    }
  },
  maxsalary: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function (value) {
        return value >= this.minsalary;
      },
      message: 'Maximum salary must be greater than or equal to minimum salary.'
    }
  },
  minExperience: {
    type: Number,
    required: true,
    min: 0,
    default:1
  },
  maxExperience: {
    type: Number,
    required: true,
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
