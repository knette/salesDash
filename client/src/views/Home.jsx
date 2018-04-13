import React from 'react'
import { Jumbotron, Button } from 'reactstrap';

const Home = (props) => {
  return (
    <div>
      <Jumbotron>
        <h1 className="display-3">salesDash is here to help</h1>
        <p className="lead">Reconciling invoices is hard AF. Submit your sales and returns here and have all the word done for you immediately. </p>
        <hr className="my-2" />
        <p>Coming soon: custom commission reporting and API integration with Costco, Walmart, Overstock and more!</p>
        <p className="lead">
          <Button color="primary">Sign Up</Button>
        </p>
      </Jumbotron>
    </div>
  );
};

export default Home