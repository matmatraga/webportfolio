//Manual import of module from package.
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

//Object destructuring

import {Button, Container, Row, Col} from 'react-bootstrap';

import {Link} from 'react-router-dom';

export default function Banner(){


	return(
		<Container>
			<Row>
				<Col className = 'mt-3 text-center'>
					<h1>ASTER Soda</h1>
					<p>Soda drinks for you!</p>
					<Button as = {Link} to = '/products'>Products</Button>
				</Col>
			</Row>
		</Container>
		)

}
