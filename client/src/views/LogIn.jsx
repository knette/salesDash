import React from 'react'
import httpClient from '../httpClient'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class LogIn extends React.Component {
	state = {
		fields: { email: '', password: ''}
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
		httpClient.logIn(this.state.fields).then(user => {
			this.setState({ fields: { email: '', password: '' } })
			if(user) {
				this.props.onLoginSuccess(user)
				this.props.history.push('/sales')
			}
		})
	}
	render() {
		const { email, password } = this.state.fields
		return (
			<div>
				<Form onChange={this.onInputChange.bind(this)} onSubmit={this.onFormSubmit.bind(this)}>
					<h1>Log In</h1>
					<FormGroup>
						<Label for="exampleEmail">Email</Label>
						<Input type="email" name="email" id="exampleEmail" placeholder="Email" value={email} />
					</FormGroup>
					<FormGroup>
						<Label for="examplePassword">Password</Label>
						<Input type="password" name="password" id="examplePassword" placeholder="Password" value={password} />
					</FormGroup>
					<Button>Submit</Button>
				</Form>				
			</div>
		)
	}
}

export default LogIn