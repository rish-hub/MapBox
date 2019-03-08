import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Header  from './components/Header';
import Map  from './components/Map';

require('dotenv').config();

class App extends Component {
  constructor(props){
    super(props); 
    this.state = {
      isOpen : false,
      applicationName:"Traffic-Map"
    }
  }

  toggle = ()=>{
    this.setState({
      isOpen : !this.state.isOpen 
    })
  }
  render() {
    return (
      <div className="App">
        <Header
        toggle={this.toggle}
        isOpen={this.state.isOpen}
        applicationName={this.state.applicationName}
        />
        <Container >
         <Map/>
        </Container>
       </div>
    );
  }
}

export default App;
