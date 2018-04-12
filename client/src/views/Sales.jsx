import React from 'react'
import httpClient from '../httpClient.js'
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'

const headings = [
    {"field": "company", "label": "Company"},
    {"field": "price", "label": "Sale Price"},
    {"field": "commission", "label": "Commission %"},
    {"field": "commission calculated", "label": "Commission $"},
    {"field": "invoiceDate", "label": "Invoice Date"},
    {"field": "refund", "label": "Return?"},
    {"field": "delete", "label": "Delete"},
    {"field": "edit", "label": "Edit"}
  ]

class Sales extends React.Component { 
	state= {
		sales: [],
		headings: [],
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
	handleDeleteButton(id) {
        httpClient.deleteSale(id).then((serverResponse) => {
			// this.props.history.push('/sales')
			console.log(serverResponse.data)
			this.setState({
				sales: this.state.sales.filter((s) => {
					return s._id !== id
				})
			})

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
		const { sales, modalOpen, headings } = this.state
		var returnCount = 0 
		sales.forEach((s)=> {
			if(s.refund) returnCount ++
		})
		var salePriceTotal = 0 
		sales.forEach((s) => {
			salePriceTotal = s.price + salePriceTotal 
		})
		var commissionTotal = 0 
		sales.forEach((s) => {
			commissionTotal = (s.commission*s.price) + commissionTotal
		})
		return (
		<div className='Sales'>
			<h1>Sales</h1>
			<table>
  				<thead>
					<tr>
					{headings.map((h, index) => {
                  return <th key={index} onClick={this.handleHeadingClick.bind(this, h.field)}> <span> {h.label}</span></th>
                }) 
                }
					</tr>
				</thead>
				<tbody>
					{sales.map((s) => {
                  return (
                  <tr key={s._id}>
                    <td>{s.company}</td> 
                    <td>${s.price}</td>
                    <td>{(s.commission*100)}%</td>
					<td>${(s.commission * s.price).toFixed(2)}</td>
                    <td>{(s.invoiceDate)}</td>
                    <td>{s.refund.toString()}</td>
					<th><Button onClick={this.handleDeleteButton.bind(this, s._id)} color="danger">Delete</Button></th>
					<th><Button color="warning" onclick="return confirm('Are you sure you want to delete?');" onClick={this.handleEditClick.bind(this)}>Edit</Button></th>
                    </tr>
                  )}) 
                }
				</tbody>
				<tfoot>
   					<tr>
						<td>Totals</td>
						<td>${salePriceTotal}</td>
						<td>Totals</td>
						<td>${commissionTotal.toFixed(2)}</td>
						<td>Totals</td>
						<td>{ ((returnCount/ sales.length) *100).toFixed(2)}% </td>
						<td></td>
						<td></td>
    				</tr>
				</tfoot>
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
							<Input ref="price" innerRef="price" type="nummber" id="price" defaultValue={sales.price} />
						</FormGroup>
						<FormGroup>
							<Label for="Price">Sale Price</Label>
							<Input ref="price" innerRef="price" type="nummber" id="price" defaultValue={sales.price} />
						</FormGroup>
						<FormGroup>
							<Label for="Price">Sale Price</Label>
							<Input ref="price" innerRef="price" type="nummber" id="price" defaultValue={sales.price} />
						</FormGroup>
						<FormGroup>
							<Label for="Price">Sale Price</Label>
							<Input ref="price" innerRef="price" type="nummber" id="price" defaultValue={sales.price} />
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