import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {
	return (
		<div className='NavBar'>
			<Link to="/">Home</Link>
			{props.currentUser
				? (
					<span>
						<Link to="/logout">Log Out</Link>
						<Link to="/sales">Your Sales</Link>
						<Link to="/newsale">Add New Sale</Link>
					</span>
				)
				: (
					<span>
						<Link to="/login">Log In</Link>
						<Link to="/signup">Sign Up</Link>
					</span>
				)
			}
		</div>
	)
}

export default NavBar