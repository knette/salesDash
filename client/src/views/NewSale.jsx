import React from 'react'
import httpClient from '../httpClient'
import { FormGroup, Label, Input, Form, Button, FormText } from 'reactstrap'

class NewSale extends React.Component {
	state = {
		fields: { company: '', price: '', commission: '', invoiceDate: '', refund: ''}
	}
	onInputChange(evt) {
		this.setState({
			fields: {
				...this.state.fields,
				[evt.target.name]: evt.target.value
			}
		})
	}
	onFormSubmit(evt) {
        evt.preventDefault()
        httpClient.createSale(this.state.fields).then(serverResponse => {
            console.log(serverResponse.data)
            //redirect to your sales
            
        })
        this.setState({ fields: { company: '', price: '', commission: '', invoiceDate: '', refund: ''} })
}
	render() {
		const { company, price, commission, invoiceDate, refund } = this.state.fields
		return (
			<div className='NewSale'>
						<h1>New Sale</h1>
						<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
                            <FormGroup>
                                <Label for="Company">Company</Label>
                                <Input type="text" placeholder="Company" name="company" value={company}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Sales Price</Label>
                                <Input type="number" placeholder="Price" name="price" value={price}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="price">Sales Price</Label>
                                <Input type="number" placeholder="Commission " name="commission" value={commission}/>
                            </FormGroup>
                            <FormGroup>
                                <FormText>Format as decimal. Ex: 0.05 for 5% commission</FormText>
                                <Label for="invoiceDate">Invoice Date</Label>
                                <Input type="date" name="invoiceDate" id="exampleDate" placeholder="date" value={invoiceDate} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="refund">Return?</Label>
                                    <FormText>Are you submitting data for a return vs a sale?</FormText>
                                    <Input type="select" name="refund" value={refund} placeholder="Return?">
                                    <option>true</option>
                                    <option>false</option>
                                </Input>
                            </FormGroup>
							<Button>Add Sale</Button>
						</Form>
			</div>
		)
	}
}

export default NewSale