import React from 'react';
import { connect } from 'react-redux';

class GMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { zoom: 12 };
    //only set these once se we can remove existing direction markers
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;
  }

	render() {
// console.log(this.props)
    return <div>
     <div className="GMap">
      <div className='GMap-canvas' ref="theMap">
      </div>
     </div>
    </div>
  }

  //update centering of map
  componentWillReceiveProps(nextProps) {
    //remove everything inside <> brackets (the HTML)
    const rmHTML = (t) => {
      return t.replace(/<(?:.|\n)*?>/gm, ' ');
    }



    const addDirs = (a) => {
      let ans = [];
      for(let i = 0; i < a.length; i++) {
        ans.push(rmHTML(a[i].instructions));
      }
      return ans;
    }

    if( (nextProps.dst.status === 'done' && 
         nextProps.org.status === 'done') && 
        (
         nextProps.dst.lat !== this.props.dst.lat || 
         nextProps.dst.lng != this.props.dst.lng ||
         nextProps.org.lng != this.props.org.lng ||
         nextProps.org.lat != this.props.org.lat 
        )
    ) {
      let addTime = this.props.addTime;
      let addDirections = this.props.addDirections;
      this.directionsDisplay.setMap(this.map)

      //remove existing direction markers from previous render
      this.directionsDisplay.setDirections({routes: []});

      let dd = this.directionsDisplay; 
      this.directionsService.route({
        origin:  new google.maps.LatLng(nextProps.org.lat, nextProps.org.lng),
        destination: new google.maps.LatLng(nextProps.dst.lat, nextProps.dst.lng),
        travelMode: 'BICYCLING'
      }, function(res, status) {
         if(status === 'OK') {
           addDirections(addDirs(res.routes[0].legs[0].steps));
           dd.setDirections(res);
           //directionsDisplay.setDirections(res);
           addTime(res.routes[0].legs[0].duration.value, res.routes[0].legs[0].duration.text);
         } else {
           console.error('directions failed: ' + status)
         }
      });
    }
  }


  componentDidMount() {
    // create the map, marker and infoWindow after the component has
    // been rendered because we need to manipulate the DOM for Google =(
    this.map = this.createMap()
  
    // have to define google maps event listeners here too
    // because we can't add listeners on the map until its created
    google.maps.event.addListener(this.map, 'zoom_changed', ()=> this.handleZoomChange())
  }

  // clean up event listeners when component unmounts
  componentDidUnMount() {
    google.maps.event.clearListeners(map, 'zoom_changed')
  }

  createMap() {
    let mapOptions = {
      zoom: this.state.zoom,
      center: this.mapCenter()
    }
    return new google.maps.Map(this.refs.theMap, mapOptions)
  }

  mapCenter() {
    return new google.maps.LatLng(
      this.props.dst.lat,
      this.props.dst.lng
    )
  }

/*
  createInfoWindow() {
    let contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
    return new google.maps.InfoWindow({
      map: this.map,
      content: contentString
    })
  }
*/
  
  handleZoomChange() {
    this.setState({
      zoom: this.map.getZoom()
    })
  }
}

export default GMap;
