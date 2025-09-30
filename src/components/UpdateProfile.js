import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateUserEmail, updateUserPassword, reauthenticate } =
    useAuth(); // ✅ include reauthenticate
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    setError("");
    setMessage("");

    const promises = [];

    // Add updates only if values have changed
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateUserEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updateUserPassword(passwordRef.current.value));
    }

    try {
      // ✅ Require reauthentication if updating password or email
      if (passwordRef.current.value) {
        await reauthenticate(passwordRef.current.value);
      }

      await Promise.all(promises);

      setMessage("Profile updated successfully!");
      navigate("/dashboard"); // ✅ redirect to dashboard
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={currentUser?.email}
                required
              />
            </Form.Group>

            <Form.Group id="password" className="mb-3">
              <Form.Label>
                New Password (leave blank to keep current)
              </Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep password"
              />
            </Form.Group>

            <Form.Group id="password-confirm" className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep password"
              />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/" className="btn btn-secondary w-100 mt-2">
          Cancel
        </Link>
      </div>
    </>
  );
}
