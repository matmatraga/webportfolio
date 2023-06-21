
import {Container, Row, Col, Button, Form} from 'react-bootstrap';

import {useState, useEffect, useContext} from 'react';
import {Navigate, Link, useNavigate} from 'react-router-dom';

// import sweet alert
import Swal2 from 'sweetalert2';

import UserContext from '../UserContext.js';

export default function Login(){
	const [email, setEmail] = useState('');
	const [password, setPassword1] = useState('');

	const navigate = useNavigate();

	// We are going to consume or the UserContext
	const {user, setUser} = useContext(UserContext);


	// get item method gets the value of the specified key from our local storage
	// const [user, setUser] = useState(localStorage.getItem('email'));

	const [isDisabled, setIsDisabled] = useState(true);

	const retrieveUserDetails = (token) => {
		fetch(`${process.env.REACT_APP_API_URL}/users`, {
			method : 'GET',
			headers : {
				Authorization : `Bearer ${token}`
			},
		})
		.then(result => result.json())
		.then(data => {
			console.log(data)
			setUser({
				id : data._id,
				isAdmin : data.isAdmin
			});
		})
	}

	useEffect(()=>{
	    if(email !== '' && password !== ''){
	        setIsDisabled(false);
	    }else{
	        setIsDisabled(true);
	    }
	},[email, password]);

	   	function login(event){
	        event.preventDefault();

	        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
	        	method : 'POST',
	        	headers : {
	        		'Content-Type' : 'application/json'
	        	},
	        	body : JSON.stringify({
	        		email : email,
	        		password: password
	        	}),
	        })
	        .then(result => result.json())
	        .then(data => {
	        	if(data === false){
	        		Swal2.fire({
	        			title : 'Authentication failed!',
	        			icon : 'error',
	        			text : 'Check your login details and try again!'
	        		})
	        		}else{
	        			
	        			localStorage.setItem('token', data.auth);

	        			retrieveUserDetails(data.auth)

	        			Swal2.fire({
	        				title : 'Login Successful',
	        				icon : 'success',
	        				text : 'Welcome to Zuitt!'
	        			})

	        			navigate('/')
	        		}
	        })
	    }

return(

	(user.id === null) ?

	<Container className = 'mt-5'>
		<Row>
			<Col className = 'col-6 mx-auto'>
				<h1 className = 'text-center'>Login</h1>
				<Form onSubmit = {event =>login(event)}>
				    <Form.Group className="mb-3" controlId="formBasicEmail">
				      <Form.Label>Email address</Form.Label>
				      <Form.Control type="email" value = {email} onChange = {event => setEmail(event.target.value)} placeholder="Enter email" />
				    </Form.Group>

				    <Form.Group className="mb-3" controlId="formBasicPassword1">
				      <Form.Label>Password</Form.Label>
				      <Form.Control type="password" value = {password} onChange = {event => setPassword1(event.target.value)}placeholder="Password" />
				    </Form.Group>

				    <p>No Account yet? <Link to = '/register'>Sign up here.</Link></p>

				    <Button variant="success" type="submit" disabled = {isDisabled}>
				      Login
				    </Button>
				</Form>
			</Col>
		</Row>
	</Container> :

	<Navigate to = '/notFound' />
	
	)
}