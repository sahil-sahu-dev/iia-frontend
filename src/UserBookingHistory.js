import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';


const BookingHistory = () => {
  const [activeTab, setActiveTab] = useState('accepted');
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleFeedbackSubmit = () => {
    // Here, send the feedback to the server
    const url = `http://localhost:5008/store_feedback`
    const body = {
      "booking_id": selectedBookingId,
      "rating": rating,
      "comment": feedback
    }

    // Send the request
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert("Feedback submitted successfully!")
         // Close the modal after submission
        setShowModal(false);
        // Reset feedback state
        setFeedback('');
        setRating(5);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Error submitting feedback!")
         // Close the modal after submission
        setShowModal(false);
        // Reset feedback state
        setFeedback('');
        setRating(5);
      });
  };

  useEffect(() => {
    fetchBookings(activeTab);
  }, [activeTab]);

  const fetchBookings = (status) => {
    // Assuming you have an endpoint that takes a status and returns the relevant bookings
    fetch(`http://localhost:5008/fetch_user_bookings/${status}/1`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBookings(data);
      })
      .catch((error) => console.error('Error fetching bookings:', error));
  };

  const renderFeedbackModal = () => (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Give Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="comments">
            <Form.Label>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              aria-label="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFeedbackSubmit}>
          Submit Feedback
        </Button>
      </Modal.Footer>
    </Modal>
  );


  const renderBookingsTable = () => {
    return (
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Service Name</th>
            <th scope="col">Provider</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking.id}>
              <th scope="row">{index + 1}</th>
              <td>{booking.service_name}</td>
              <td>{booking.store_name}</td>
              <td>{booking.status}</td>
              {activeTab === 'accepted' && (
                <td>
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setSelectedBookingId(booking.id);
                      setShowModal(true);
                    }}
                  >
                    Give Feedback
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Booking History</h1>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'pending' && 'active'}`}
            onClick={() => setActiveTab('pending')}
          >
            Pending
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'accepted' && 'active'}`}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${activeTab === 'rejected' && 'active'}`}
            onClick={() => setActiveTab('rejected')}
          >
            Rejected
          </a>
        </li>
      </ul>
      {renderBookingsTable()}
      {renderFeedbackModal()}
    </div>
  );
};

export default BookingHistory;
