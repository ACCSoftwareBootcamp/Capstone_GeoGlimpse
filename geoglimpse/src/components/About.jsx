import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            vestibulum suscipit nunc ut fermentum. Nam egestas, justo ac
            scelerisque vehicula, dui massa laoreet ligula, a facilisis arcu
            ipsum at sapien.
          </p>
          <p>
            Suspendisse potenti. Nunc hendrerit sapien eu tincidunt tempor.
            Curabitur et leo augue. Curabitur vehicula, velit nec vulputate
            placerat, felis sem consequat leo, ut cursus nisi mauris et nulla.
          </p>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img
              src="https://via.placeholder.com/600x400"
              alt="Placeholder"
            />
          </Card>
        </Col>
      </Row>
      <footer className="mt-4 text-center">
        <p>
          <a href="/contact">Contact Us</a>
        </p>
        <p>&copy; {new Date().getFullYear()} GeoGlimpse</p>
      </footer>
    </Container>
  );
}

export default About;
