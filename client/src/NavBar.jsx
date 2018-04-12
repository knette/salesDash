import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
// import {Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
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
	DropdownItem } from 'reactstrap';

class NavBar extends React.Component {
	constructor(props) {
		super(props);
	
		this.toggle = this.toggle.bind(this);
		this.state = {
		  isOpen: false
		};
	  }
	  toggle() {
		this.setState({
		  isOpen: !this.state.isOpen
		});
	  }
	render() {
		return (
			<div className='NavBar'>
	
	<Navbar color="light" light expand="md">
          <NavbarBrand>reactstrap</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={RouterNavLink} to="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
	
	
				{/* <Navbar color="light" light expand='md'>
				<NavbarBrand href="/sales">salesDash</NavbarBrand>
					<Nav className="ml-auto" navbar>
				{props.currentUser
					? (
						<span>
							<NavItem>
							<NavLink to="/logout">Log Out</NavLink>
							</NavItem>
							<NavItem>
							<NavLink to="/sales">All Sales</NavLink>
							</NavItem>
							<NavItem>
							<NavLink to="/newsale">Add New Sale</NavLink>
							</NavItem>
							</span>
					)
					: (
					<span>
							<NavItem>
							<NavLink to="/login">Log In</NavLink>
							<NavItem>
							</NavItem>
							<NavLink to="/signup">Sign Up</NavLink>
							</NavItem>
						</span>
					)
				}
					</Nav>
				</Navbar> */}
			</div>
		)
	}
}

export default NavBar
