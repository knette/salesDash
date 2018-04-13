import React from 'react'
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const Home = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">salesDash is here to help</h1>
        <p className="lead">Reconciling invoices is hard AF. Submit your sales and returns here and have all the work done for you. </p>
        <hr className="my-2" />
        <p>Coming soon: custom commission reporting and API integration with Costco, Walmart, Overstock and more!</p>
        <p className="lead">
		<Link to='/signup'>
          <Button outline color="primary">Sign Up</Button>
		</Link>
		<Link to='/login'>
          <Button outline color="info">Login</Button>
		</Link>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Home