import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

class Sales extends React.Component { 
	state= {
		sales: [],
		modalOpen: false,
		sortBy: null,
    	sortAscending: true
	}
	componentDidMount() {
		httpClient.getAllSales().then((serverResponse) => {
			this.setState({
				sales: serverResponse.data
			})
		})
	}
	handleEditClick() {
        this.setState({
            modalOpen: true
        })
	}
	handleDeleteButton() {
        httpClient.deleteSale(this.props.match.params.id).then((serverResponse) => {
            this.props.history.push('/sales')
        })
	}
	handleEditFormSubmit(evt) {
        evt.preventDefault()
        const { company, price, commission, invoiceDate, refund } = this.refs
        const saleFormFields = {
            company: company.refs.company.value,
			price: price.refs.price.value,
			commission: commission.refs.commission.value,
			invoiceDate: invoiceDate.refs.invoiceDate.value,
			refund: refund.refs.refund.value,
        }
        httpClient.updateSale(this.props.match.params.id, saleFormFields).then((serverResponse) => {
            console.log(serverResponse.data)
            this.setState({
                modalOpen: false, 
                sale: serverResponse.data
            })
        })
    }

	render (params) {
		const { sales, modalOpen } = this.state
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
					<th><Button onClick={this.handleDeleteButton.bind(this)} color="danger">Delete</Button></th>
					<th><Button color="warning">Edit</Button></th>
                    </tr>
                  )}) 
                }
				</tbody>
			</table>
		<Modal isOpen={modalOpen}>
			<ModalHeader>Edit Sale</ModalHeader>
			<Form onSubmit={this.handleEditFormSubmit.bind(this)}>
					<ModalBody>
						<FormGroup>
							<Label for="name">Company</Label>
							<Input ref="Company" innerRef="company" type="text" id="company" defaultValue={sales.company}/>
						</FormGroup>
						<FormGroup>
							<Label for="Price">Sale Price</Label>
							<Input ref="price" innerRef="price" type="nummber" id="price" defaultValue={sales.imageURL} />
						</FormGroup>
				</ModalBody>
			<ModalFooter>
				<Button type="submit" color="info">Update</Button>
				<Button type="button" color="danger" onClick={this.handleDeleteButton.bind(this)}>Delete</Button>
			</ModalFooter>
			</Form>
		</Modal>
		</div>
		)
	}
}

export default Sales