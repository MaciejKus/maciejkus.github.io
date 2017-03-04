import React from 'react';
import { connect } from 'react-redux';

class Directions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.directions.length > 0) {
      return(
        <div>
          <ol>
            {this.props.directions.map( (d, i) =>
               <li key={d + i}>{d}</li>
            )}
          </ol>
        </div>
      )
    } else {
      return(<div>No directions</div>); 
    }
  }

  componentWillReceiveProps(nextProps) {
  }
}

export default Directions;
