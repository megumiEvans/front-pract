import React, { useState } from 'react';
import {Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, NavbarText } from 'reactstrap';

const NavAdmin = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="info" light expand="md" >
        <NavbarBrand style={{color: 'white'}} href="/">BBVA</NavbarBrand>
        
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav  navbar>
            <NavItem >
              <NavLink style={{color: 'white'}} href="/users">Usuarios</NavLink>
            </NavItem>
            <NavItem >
              <NavLink style={{color: 'white'}} href="/adminmov">Movimientos</NavLink>
            </NavItem>
            <NavItem >
              <NavLink style={{color: 'white'}} href="/logout">Cerrar Sesión</NavLink>
            </NavItem>
          </Nav>          
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavAdmin;