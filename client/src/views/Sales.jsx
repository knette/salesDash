import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom';

class Sales extends React.Component { 
	state= {
		sales: []
	}
	componentDidMount() {
		httpClient.getAllSales().then((serverResponse) => {
			this.setState({
				sales: serverResponse.data
			})
		})
	}

	render () {
		const { sales } = this.state
		return (
		<div className='Sales'>
			<h1>Sales</h1>
			<table>
  				<thead>
					<tr>
					<th>Company</th>
					<th>Sale Price</th>
					<th>Commission %</th>
					<th>Commission $</th>
					<th>Invoice Date</th>
					<th>Return?</th>
					<th>Delete</th>
					<th>Edit</th>
					</tr>
				</thead>
				<tbody>
					{sales.map((s) => {
                  return (
                  <tr key={s._id}>
                    <td>{s.company}</td> 
                    <td>${s.price}</td>
                    <td>{(s.commission/100).toFixed(2)}</td>
					<td>${(s.commission * s.price).toFixed(2)}</td>
                    <td>{(s.invoiceDate)}</td>
                    <td>{s.refund}</td>
					<th>Delete</th>
					<th>Edit</th>
                    </tr>
                  )}) 
                }
				</tbody>
			</table>
		</div>
		)
	}
}

export default Sales