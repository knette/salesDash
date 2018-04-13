import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

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
          <NavbarBrand className="nav-brand" href="/sales">salesDash</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
			{this.props.currentUser
					? (
						<div className="nav-div">
              <NavItem>
                <NavLink tag={RouterNavLink} to="/sales/">All Sales</NavLink>
              </NavItem>
							<NavItem>
                <NavLink tag= {RouterNavLink}to="/charts">Charts</NavLink>
              </NavItem>
							<NavItem>
                <NavLink tag= {RouterNavLink}to="/newsale">Add New Sale</NavLink>
              </NavItem>
							<NavItem>
                <NavLink tag= {RouterNavLink}to="/logout">LogOut</NavLink>
              </NavItem>
			  </div>
					)
					: (
						<div className="nav-div">
				<NavItem>
                <NavLink tag={RouterNavLink} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={RouterNavLink} to="/signup">Sign Up</NavLink>
              </NavItem>
			  </div>
					)}
            </Nav>
          </Collapse>
        </Navbar>
			</div>
		)
	}
}

export default NavBar
