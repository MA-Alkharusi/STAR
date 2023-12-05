import React, { useRef, useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import "./login.css"
import logo from "./logo.webp"


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate("/home")
    } catch {
      setError("Failed to log in")
    }finally{
      setLoading(false)
     }
  }
  
  return (
    <>
    <header className="Login-title">STAR</header>
      <Card className="login">
        <Card.Body >
        <div className="w-100 text-center mb-4">
      <img src={logo} alt="logo" width="100px" height="100px" style={{ borderRadius: '50%' }} />
    </div>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
         <Link to="/signup">Need An Account? Sign Up</Link>
      </div>
    </>
  )
}