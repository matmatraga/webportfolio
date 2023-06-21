import {Container, Row, Col, Card} from 'react-bootstrap';


export default function Highlights(){
	
	return(
		<Container className = 'mt-5'>
			<Row >
				<Col className = "col-12 col-md-4 mt-3 ">
					<Card className = 'cardHighlight'>
					      
					      <Card.Body>
					        <Card.Title>Learn From Home</Card.Title>
					        <Card.Text>
					          Some quick example text to build on the card title and make up the
					          bulk of the card's content.
					        </Card.Text>
					        
					      </Card.Body>
					    </Card>
				</Col>

				<Col className = "col-12 col-md-4 mt-3 ">
					<Card className = 'cardHighlight'>
					      
					      <Card.Body>
					        <Card.Title>Study Now, Pay Later</Card.Title>
					        <Card.Text>
					          Some quick example text to build on the card title and make up the
					          bulk of the card's content.
					        </Card.Text>
					        
					      </Card.Body>
					    </Card>
				</Col>

				<Col className = "col-12 col-md-4 mt-3 ">
					<Card className = "cardHighlight">
					      
					      <Card.Body>
					        <Card.Title>Be Part of our community</Card.Title>
					        <Card.Text>
					          Some quick example text to build on the card title and make up the
					          bulk of the card's content.
					        </Card.Text>
					        
					      </Card.Body>
					    </Card>
				</Col>
			</Row>
		</Container>
		)
}
