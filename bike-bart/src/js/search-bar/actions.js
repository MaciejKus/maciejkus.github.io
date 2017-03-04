import { updateDstStation } from '../station/actions';
import { updateOrgStation } from '../station/actions';
import { waitDstStation } from '../station/actions';
import { waitOrgStation } from '../station/actions';
import bartDist from '../find-station/bart-dist';

export const updateDepartTime = (departTime) => ({
  type: 'UPDATE_DEPART_TIME',
  departTime: departTime
});

export const updateDst = (address, lat, lng) => ({
    type: 'UPDATE_DST',
    dstAddress: {
      address: address,
      lat: lat,
      lng: lng
    }
});

export const updateOrg = (address, lat, lng) => ({
    type: 'UPDATE_ORG',
    orgAddress: {
      address: address,
      lat: lat,
      lng: lng
    }
});

export const waitOnOrg = (m) => ({
    type: 'WAIT_ON_ORG',
    m
});

export const waitOnDst = (m) => ({
    type: 'WAIT_ON_DST',
    m
});

export const updateStatus = (stat) => ({
    type: 'UPDATE_STATUS',
    stat
});

let prevDst, prevOrg;
const getLatLng = (address, dispatch, dstOrOrg) => {
    dispatch(updateStatus('fetching data...'))
    address = address.trim(); //.replace(' ', '+');
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {
          let lat = results[0].geometry.location.lat();
          let lng = results[0].geometry.location.lng();
          let add = results[0].formatted_address;
          if(dstOrOrg === 'dst' && prevDst !== add) {
            dispatch(updateDst(add, lat, lng));
            dispatch(updateDstStation(bartDist(lat, lng)))
            prevDst = add;
          } else if(dstOrOrg === 'org' && prevOrg !== add) {
            dispatch(updateOrg(add, lat, lng));
            dispatch(updateOrgStation(bartDist(lat, lng)))
            prevOrg = add;
          }
          dispatch(updateStatus(''))
       
        } else {
          console.error('Geocode was not successful for the following reason: ' + status);
          dispatch(updateStatus('Geocode was not successful'))
        }
      });
};


export const fetchWithAddress = (orgAddress, dstAddress) => {
  return function(dispatch) {
    dispatch(waitOnOrg());
    dispatch(waitOnDst());
    dispatch(waitDstStation());
    dispatch(waitOrgStation());
    getLatLng(orgAddress, dispatch, 'org')   
    getLatLng(dstAddress, dispatch, 'dst')   
  }
}
