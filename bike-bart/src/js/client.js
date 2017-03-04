import React from 'react';
import ReactDOM from 'react-dom';
import SearchAddress from './search-bar/components/search-bar-container.js';
import BartStation from './station/components/station-container.js';
import DstGoogleMap from './map/components/dst-map-container.js';
import OrgGoogleMap from './map/components/org-map-container.js';
import OrgDirections from './directions/components/org-directions-container.js';
import DstDirections from './directions/components/dst-directions-container.js';
import BartInfoContainer from './bart-info/components/bart-info-container.js';
//import GMap from './map/components/map.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'; 

let store = applyMiddleware(thunk)(createStore)(rootReducer);
window.store = store;

const Main = () => {
    return (
      <div>
        <SearchAddress/>
        <BartStation />
        <BartInfoContainer />
         <a name="origin"></a>
        <h2>Origin Directions</h2>
        <OrgDirections />
        <OrgGoogleMap />
         <a name="destination"></a>
        <h2>Destination Directions</h2>
        <DstDirections />
        <DstGoogleMap />
      </div>
    );
}

const app = document.getElementById('app');
ReactDOM.render(
   <Provider store={store}>
     <Main />
   </Provider>
, app);
