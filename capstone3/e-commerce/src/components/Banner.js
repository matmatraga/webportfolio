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
					<h1>Aster</h1>
					<p>Built By Gamers</p>
					<Button as = {Link} to = '/Products'>Products</Button>
				</Col>
			</Row>
		</Container>
		)

}
