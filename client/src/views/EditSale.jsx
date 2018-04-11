import React from 'react'
import httpClient from '../httpClient'

class EditSale extends React.Component {
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
            this.props.history.push('/sales')
        })
        this.setState({ fields: { company: '', price: '', commission: '', invoiceDate: '', refund: ''} })
}
	
	render() {
		const { company, price, commission, invoiceDate, refund } = this.state.fields
		return (
			<div className='NewSale'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>New Sale</h1>
						<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
							<input type="text" placeholder="Company" name="company" value={company} />
							<input type="number" placeholder="Price" name="price" value={price} />
							<input type="number" placeholder="Commission " name="commission" value={commission} />
                            <input type="date" placeholder="Invoice Date" name="invoiceDate" value={invoiceDate} />
							<input type="text" placeholder="refund" name="refund" value={refund} />
							<button>Add Sale</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default EditSale