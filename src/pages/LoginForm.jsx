import { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Added for error handling
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    function login() {
        const validUsername = "ruldolf";
        const validPassword = "12345";

        if (username === validUsername && password === validPassword) {
            authContext.setToken("1234");
            navigate("/");
        } else {
            setError("Invalid username or password."); // Updated error message
        }
    }

    return (
        <Container className="d-flex align-items-center justify-content-center vh-100">
            <div className="row border rounded-5 p-5 bg-white shadow box-area w-100">
                {/* Left Section with Image and Title */}
                <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
                    <div className="featured-img mb-3">
                        <img
                            src="https://image.boxrox.com/2022/05/212302321-1024x682.jpg"
                            className="img-fluid"
                            style={{ width: '100%' }}
                            alt="logo"
                        />
                    </div>
                    <h2 className="text-white bg-dark" style={{ fontFamily: 'Arial, Helvetica, sans-serif', fontWeight: 600 }}>Fitness Thrive</h2>
                    <small className="text-black">©Ruldolf Creation</small>
                </div>

                {/* Right Section - Login Form */}
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    <div className="w-100">
                        <h2 className="text-center mb-4">Login</h2>
                        <Form onSubmit={(e) => { e.preventDefault(); login(); }} className="p-3">
                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            {error && <p className="text-danger">{error}</p>}

                            <Button variant="primary" type="submit" className="w-100">
                                Login
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
}
