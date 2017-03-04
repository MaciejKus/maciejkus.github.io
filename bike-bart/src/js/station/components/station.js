import React from 'react';
import { connect } from 'react-redux';

//make choice of nearest bart station
let Station = (props) => {
  if(props.dstStation.name) {
    return (
    <div>
    </div>
    )
  } else {
    return (<div></div> )
  }
}

export default Station;
