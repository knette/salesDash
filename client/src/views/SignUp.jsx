import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


// sign up form behaves almost identically to log in form. We could create a flexible Form component to use for both actions, but for now we'll separate the two:
class SignUp extends React.Component {
	state = {
		fields: { name: '', email: '', password: ''}
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
				this.props.history.push('/sales')
			}
		})
	}
	
	render() {
		const { name, email, password } = this.state.fields
		return (
			<div>
				<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<h1>Sign Up</h1>
					<FormGroup>
						<Label for="name">Name</Label>
						<Input type="text" name="name" id="name" placeholder="Gob Bluth" value={name} />
					</FormGroup>
					<FormGroup>
						<Label for="exampleEmail">Email</Label>
						<Input type="email" name="email" id="exampleEmail" placeholder="Gob@AllianceofMagicians.com" value={email} />
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input type="password" name="password" id="examplePassword" placeholder="*****" value={password} />
					</FormGroup>
					<Button>Submit</Button>
				</Form>	
			</div>
		)
	}
}

export default SignUp