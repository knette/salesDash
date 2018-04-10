import React from 'react'
import httpClient from '../httpClient'

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
		httpClient.signUp(this.state.fields).then(user => {
			this.setState({ fields: { name: '', email: '', password: '' } })
			if(user) {
				this.props.onSignUpSuccess(user)
				this.props.history.push('/')
			}
		})
	}
	
	render() {
		const { company, price, commission, invoiceDate, refund } = this.state.fields
		return (
			<div className='NewSale'>
				<div className='row'>
					<div className='column column-33 column-offset-33'>
						<h1>New Sale</h1>
						<form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
							<input type="text" placeholder="Name" name="name" value={name} />
							<input type="text" placeholder="Email" name="email" value={email} />
							<input type="password" placeholder="Password" name="password" value={password} />
                            <input type="text" placeholder="Email" name="email" value={email} />
							<input type="password" placeholder="Password" name="password" value={password} />
							<button>Add Sale</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}

export default NewSale