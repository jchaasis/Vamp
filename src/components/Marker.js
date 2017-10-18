import React, { Component } from 'react';

class Marker extends Component {



addMarker(lat, long) {
    
        // let popup = new window.mapboxgl.Popup({ offset: [0, -15] })
        //     .setText('poppin')
            //get request to when point was made
        
        // let el = document.createElement('div');
        // el.className = 'marker';
          
        
        const marker = new window.mapboxgl.Marker()
        .setLngLat([lat, long])
        // .setPopup(popup)
        .addTo(this.props.map);

        return marker;
    }
    
componentWillMount(){
    this.addMarker(35.22724180000001, -80.8464851)
}
    
    //  map.on('click', function(e) {
    
    //     if(e.originalEvent.target.tagName === "CANVAS") {
    //      addMarker(e.lngLat.lng, e.lngLat.lat);
    //     }
    //  });


render(){
    const marker2 = () =>  this.addMarker(35.22724180000001, -80.8464851);

    return (<div className="marker">{marker2}</div>);
}
}

export default Marker;