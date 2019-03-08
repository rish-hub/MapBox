import React, { Component } from 'react';
import MapGL, {Marker}  from 'react-map-gl';
import Pin from './Pins'

export default class Map extends Component{
    constructor(props){
        super(props)
        this.state={
            api_url:'https://data.edmonton.ca/resource/87ck-293k.json',
            viewport :{
                width: 1000,
                height:600,
                zoom: 10,
                latitude:53.5457,
                longitude:-113.4947
            },  
            cordes:[
                { latitude:18.5616,  longitude:73.8069},
                { latitude:18.5338,  longitude:73.8298},
                { latitude:18.5623,  longitude:73.8071},
                { latitude:18.5195,  longitude:73.9316},
            ],
            data:null                        
        }
    }
componentDidMount() {
    const {data, api_url} = this.state;
    if(!data){
        fetch(api_url, {method:'GET'})
        .then(response=>response.json())
        .then(res=>this.setState({data:res}))
    }
}
render(){
    const {cordes,data}  = this.state;
    return( 
        <MapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      >      
       {data && data.map((corde,i)=>
           <Marker key={`Marker-${i * (Math.random() * 200 +1)}`}
           latitude={parseFloat(corde.location.latitude)}
           longitude={parseFloat(corde.location.longitude)} >
            <Pin/>
           </Marker>
       )}
      </MapGL>
     
       
    )
}

}