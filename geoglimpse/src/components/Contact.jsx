import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

function Contact() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlert(true);

    // Clear form fields after submission
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <Container className="mt-4">
      <h2>Contact Us</h2>
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Thank you for your message! We will get back to you shortly.
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Your Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSubject" className="mb-3">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formMessage" className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
    </Container>
  );
}

export default Contact;
