import React from 'react'
import httpClient from '../httpClient.js'
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
		filter: '',
		sales: [],
		headings: headings,
		modalOpen: false,
		sortBy: null,
		sortAscending: true,
		saleBeingEdited: null
	}
	handleFilterChange(evt) {
		this.setState({ filter: evt.target.value })
	  }
	componentDidMount() {
		httpClient.getAllSales().then((serverResponse) => {
			this.setState({
				sales: serverResponse.data
			})
		})
	}
	handleEditClick(id) {
		const saleToEdit = this.state.sales.find((s) => {
			return s._id === id
		})

		console.log(saleToEdit)

        this.setState({
			modalOpen: true,
			saleBeingEdited: saleToEdit
        })
	}
	handleCancelClick() {
        this.setState({
			modalOpen: false,
			saleBeingEdited: null
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
			refund: refund.refs.refund.value
        }
        httpClient.updateSale(this.props.match.params.id, saleFormFields).then((serverResponse) => {
            console.log(serverResponse.data)
            this.setState({
				modalOpen: false,
				saleBeingEdited: null
                // sale: serverResponse.data
            })
        })
	}
	handleHeadingClick(field) {
		console.log(field)
		const { sortAscending, sortBy } = this.state 
		const newSortAscending = sortBy === field ? !sortAscending : true 
		this.setState({
		  sortBy: field, 
		  sortAscending: newSortAscending
		})
	  }
	  sortedSales() {
		const {sales, sortBy, sortAscending} = this.state
		return [...sales].sort((a, b) => {
		  if(a[sortBy] < b[sortBy] && sortAscending)  return -1 
		  if(a[sortBy] > b[sortBy] && !sortAscending) return -1 
		  if(a[sortBy] > b[sortBy] && sortAscending)  return 1 
		  if(a[sortBy] < b[sortBy] && !sortAscending) return 1 
		  return 0
		})
	  }

	formatDate(date) {
		var dateObj = new Date(date)
		var year = dateObj.getFullYear()
		var month = dateObj.getMonth() + 1
		var day = dateObj.getDate()

		return `${month}/${day}/${year}`
	}

	render (params) {
		const { sales, modalOpen, headings, saleBeingEdited } = this.state
		const filteredSales = this.sortedSales().filter((s) => {
			return s.company.toLowerCase().includes(this.state.filter.toLowerCase())
		  })
		var returnCount = 0 
		filteredSales.forEach((s)=> {
			if(s.refund) returnCount ++
		})
		var salePriceTotal = 0 
		filteredSales.forEach((s) => {
			salePriceTotal = s.price + salePriceTotal 
		})
		var commissionTotal = 0 
		filteredSales.forEach((s) => {
			commissionTotal = (s.commission*s.price) + commissionTotal
		})

		console.log(this.state)
		return (
		<div className='Sales'>
			<h1>Sales</h1>
			<input onChange={this.handleFilterChange.bind(this)} className="input is-large" type="text" placeholder="Filter The Companies" />
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
					{filteredSales.map((s) => {
                  return (
                  <tr key={s._id}>
                    <td>{s.company}</td> 
                    <td>${s.price}</td>
                    <td>{(s.commission*100)}%</td>
					<td>${(s.commission * s.price).toFixed(2)}</td>
                    <td>{(s.invoiceDate)}</td>
                    <td>{s.refund.toString()}</td>
					<th><Button onClick={this.handleDeleteButton.bind(this, s._id)} color="danger">Delete</Button></th>
					<th><Button color="warning" onClick={this.handleEditClick.bind(this, s._id)}>Edit</Button></th>
                    </tr>
                  )}) 
                }
				</tbody>
				<tfoot>
   					<tr>
						<td>Totals</td>
						<td>${salePriceTotal}</td>
						<td>{((commissionTotal/salePriceTotal)*100.).toFixed(2)}%</td>
						<td>${commissionTotal.toFixed(2)}</td>
						<td></td>
						<td>{ ((returnCount/ sales.length) *100).toFixed(2)}% </td>
						<td></td>
						<td></td>
    				</tr>
				</tfoot>
			</table>
		<Modal isOpen={modalOpen}>
			<ModalHeader>Edit Sale</ModalHeader>
			{saleBeingEdited && (
				<Form onSubmit={this.handleEditFormSubmit.bind(this)}>
						<ModalBody>
							<FormGroup>
								<Label for="company">Company</Label>
								<Input ref="company" innerRef="company" type="text" id="company" defaultValue={saleBeingEdited.company}/>
							</FormGroup>
							<FormGroup>
								<Label for="price">Sale Price</Label>
								<Input ref="price" innerRef="price" type="number" id="price" defaultValue={saleBeingEdited.price} />
							</FormGroup>
							<FormGroup>
								<Label for="commission">Commission</Label>
								<Input ref="commission" innerRef="commission" type="number" id="commission" defaultValue={saleBeingEdited.commission} />
							</FormGroup>
							<FormGroup>
								<Label for="invoiceDate">Invoice Date</Label>
								<Input ref="invoiceDate" innerRef="invoiceDate" type="date" id="invoiceDate" defaultValue={this.formatDate(saleBeingEdited.invoiceDate)} />
							</FormGroup>
							<FormGroup>
							<Label for="refund">Return</Label>
								<Input type="select" name="refund" innerRef="refund" id="refund" defaultValue={saleBeingEdited.refund}>
									<option>true</option>
									<option>false</option>
								</Input>
							</FormGroup>
					</ModalBody>
				<ModalFooter>
					<Button type="submit" color="info">Update</Button>
					<Button color="secondary" onClick={this.handleCancelClick.bind(this)}>Cancel</Button>
					{/* <Button type="button" color="danger" onClick={this.handleDeleteButton.bind(this)}>Delete</Button> */}
				</ModalFooter>
				</Form>
			)}
		</Modal>
		</div>
		)
	}
}

export default Sales