import React from 'react';
import { connect } from 'react-redux';

let SearchBar = (props) => {
//  console.log(props)
  let orgInput;
  let dstInput;
  let departTime;

  return (
  <div className='searchBar'>
    <h1>Bike and Bart</h1>
    <form onSubmit={ e => {
      e.preventDefault();
      props.onClick(orgInput.value, dstInput.value, departTime.value);
    }}>
        <div className="labelAndInput">
        <label className="block">Origin Address:</label>
        <input 
          ref = {node => {
            orgInput = node;
        }}/>
        </div>
        <div className="labelAndInput">
        <label className="block">Destination Address:</label>
        <input 
          ref = {node => {
            dstInput = node;
        }}/>
        </div>
        <br />
        <div className="labelAndInput">
        <label className="block">Departure Time (optional):</label>
        <select className="subbutton"  ref= { node => {departTime = node }}>
           <option value="0 0"></option>
           <option value="4 00">4:00am</option>
           <option value="4 30">4:30am</option>
           <option value="5 00">5:00am</option>
           <option value="5 30">5:30am</option>
           <option value="6 00">6:00am</option>
           <option value="6 30">6:30am</option>
           <option value="7 00">7:00am</option>
           <option value="7 30">7:30am</option>
           <option value="8 00">8:00am</option>
           <option value="8 30">8:30am</option>
           <option value="9 00">9:00am</option>
           <option value="9 30">9:30am</option>
           <option value="10 00">10:00am</option>
           <option value="10 30">10:30am</option>
           <option value="11 00">11:00am</option>
           <option value="11 30">11:30am</option>
           <option value="12 00">12:00pm</option>
           <option value="12 30">12:30pm</option>
           <option value="13 00">1:00pm</option>
           <option value="13 30">1:30pm</option>
           <option value="14 00">2:00pm</option>
           <option value="14 30">2:30pm</option>
           <option value="15 00">3:00pm</option>
           <option value="15 30">3:30pm</option>
           <option value="16 00">4:00pm</option>
           <option value="16 30">4:30pm</option>
           <option value="17 00">5:00pm</option>
           <option value="17 30">5:30pm</option>
           <option value="18 00">6:00pm</option>
           <option value="18 30">6:30pm</option>
           <option value="19 00">7:00pm</option>
           <option value="19 30">7:30pm</option>
           <option value="20 00">8:00pm</option>
           <option value="20 30">8:30pm</option>
           <option value="21 00">9:00pm</option>
           <option value="21 30">9:30pm</option>
           <option value="22 00">10:00pm</option>
           <option value="22 30">10:30pm</option>
           <option value="23 00">11:00pm</option>
           <option value="23 30">11:30pm</option>
           <option value="24 00">12:00am</option>
           <option value="24 30">12:30am</option>
        </select>
        </div>
        <br />
        <input className="subbutton sub"
          type="submit"
	  value="Submit"
	/>
      </form>
      <div className="addresses">
        { props.org.address} 
        <br />
          { props.dst.address ? "to" : "" }
        <br />
         { props.dst.address } 
        <p> { props.stat } </p>
      </div>
  </div>
)
}

export default SearchBar;
