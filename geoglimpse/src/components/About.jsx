import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function About() {
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <br></br>
          <br></br>
          <h3>
            <strong>Stop wondering. Start Wandering.</strong>
          </h3>
          <p>  
          Welcome to GeoGlimpse, your one-stop portal for exploring the world! 
          <br></br>
          <br></br>
          Whether you're a curious traveler, a lifelong learner, or just someone who loves to discover new places, GeoGlimpse provides a wealth of information at your fingertips. 
          <br></br>
          <br></br>
          Simply search for in any country, and we'll instantly gather a snapshot of its weather, an interactive map to visualize its location, the latest headlines to understand its current events, and essential facts like currency, population, and leadership. 
          <br></br>
          <br></br>
          GeoGlimpse is your passport to global knowledge!          </p>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Img
              src="https://imagesupload.xyz/ib/UvtfaaCyPzH4jPy_1721464831.jpg"
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
