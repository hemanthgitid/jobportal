import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { GiSupersonicArrow } from "react-icons/gi";
import { TfiLocationPin } from "react-icons/tfi";
import filetring from '../css/Filtercart.module.css';
import Slider from '@mui/material/Slider';

const Filtercart = ({range, handlesearch, filterchange }) => {
  const [value, setValue] = useState([20, 40]);  

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    range(event, newValue);  
  };

  return (
    <div>
      <div className={filetring.out}>
        <div className={filetring.filedcenter}>
          <CiSearch size={20} />
          <input
            type="text"
            name="search"
            placeholder="Search By Job Title, Role"
            onChange={handlesearch}  
          />
        </div>
        <hr />

        <div className={filetring.filedcenter}>
          <TfiLocationPin size={20} />
          <select name="location" onChange={filterchange}>
            <option value="">Preferred Location</option>
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
        <hr />

        <div className={filetring.filedcenter}>
          <GiSupersonicArrow size={20} />
          <select name="jobtype" onChange={filterchange}>
            <option value="">Job type</option>
              <option value="Fulltime">Full Time</option>
              <option value="Internship">Internship</option>
              <option value="Partime">Partime</option>
              <option value="Contract">Contract</option>
          </select>
        </div>
        <hr />

        <div className={filetring.rangeoutline}>
          <div className={filetring.rangehead}>
            <label style={{ fontSize: '15px' }}>Salary Per Month</label>
            <div style={{ display: 'flex', justifyContent: 'space-around', width: '50%' }}>
              <div><span>₹{value[0]}k</span></div>
              <span>-</span>
              <div><span>₹{value[1]}k</span></div>
            </div>
          </div>
          <div style={{ margin: 'auto', display: 'block', width: 'fit-content' }} onChange={filterchange} >
            <Slider
              value={value || [20, 40]} 
              onChange={rangeSelector}  
              className={filetring.range_slider}
              min={0}
              max={10000000}
              style={{ minWidth: '200px', color: 'black', height: '2px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtercart;
