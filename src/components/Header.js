import React , { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
  } from 'reactstrap';

export default class Header extends Component{  
     
     
    render(){
          const {applicationName,toggle,isOpen} = this.props;
        return(
            <div>
            <Navbar color="light" light expand="md">
          <NavbarBrand href="/">{applicationName}</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                1,000 Traffic Incidents
              </NavItem>               
            </Nav>
          </Collapse>
        </Navbar>
          </div>
        )
     }
}