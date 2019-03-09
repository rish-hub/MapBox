import React, { Component } from 'react';
import MapGL  from 'mapbox-gl';
import Pin from './Pins'

export default class Map extends Component{
    constructor(props){
        super(props)
        this.state={
            api_url:'https://data.edmonton.ca/resource/87ck-293k.json',
            map:false,
            viewport :{
                zoom: 10,
                latitude:53.5457,
                longitude:-113.4947,
                center:[-113.4999, 53.5444]
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
    initializeMap(){
        MapGL.accessToken = process.env.REACT_APP_MAPBOX_TOKEN
        let map = new MapGL.Map({
            container:'map',
            style:'mapbox://styles/mapbox/light-v9',
            ...this.state.viewport
        }); 
            map.on("load",()=>{
                map.addLayer({
                    "id":"points",
                    "type":"circle",
                    "source":{
                        "type":"geojson",
                        "data":this.state.data
                    },
                    "point":{
                        "circle-radius":5,
                        "circle-color":"#B4D455"
                    }
                    
                })
            })
        map.on('click','points',(e)=>{
                const coordinates = e.features[0].geometry.coordinates.slice();
                const {details, description, impact, duration} = e.features[0].properties;
                while(Math.abs(e.lngLat - coordinates[0])>180){
                    coordinates[0] += e.lngLat>coordinates ? 300 : -300;
                } 
                new MapGL.Popup()
                .setLngLat(coordinates)
                .setHTML(`
                    <strong>${description}</strong>
                    <em>${impact}</em>
                    <em>${duration}</em>
                    <p>${details}</p>
                `)
                .addTo(map);
            })
         this.setState({map})
    }

    createFeatureCollection(res){
    let features  = [];
    res.forEach(point => {
        features.push({
            "type":"Feature",
            "geometry":{
                "type": "Point",
                "coordinates":[
                    parseFloat(point.location.longitude),
                    parseFloat(point.location.latitude),
                ]
            },
            "properties":{
                "description":point.description,
                "details":point.details,
                "duration":point.duration,
                "impact":point.impact
            }
        })
    });  
    return {
        "type":"FeatureCollection",
        "features":features
    }
    }    
    
    componentDidMount() {
    const {data, api_url} = this.state;
    if(!data){
        fetch(api_url, {method:'GET'})
        .then(response=>response.json())
        .then(res=> this.createFeatureCollection(res))
        .then(res=>this.setState({data:res}))
    }
}
render(){
    const {data,map}  = this.state;
    if(data && !map) this.initializeMap();
    return( 
     <div style={{width:1100, height:600}} id="map"/>              
    )
}

}
