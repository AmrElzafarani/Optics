import React, {useState, useEffect, useRef} from "react";
import PasswordValidation from "./passwordValidation";
import {Form, Col, Row, Button} from "react-bootstrap";

function AddUser() {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [role, setRole] = useState("");
    const [roleError, setRoleError] = useState("");
    // const [email, setEmail] = useState("");
    // const [emailError, setEmailError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [disable, setDisabled] = useState(true);

    // const [password, setPassword, passwordError] = PasswordValidation({
    //   min: 6,
    //   max: 10,
    //
    // });
    const firstRender = useRef(true);

    useEffect(() => {

        if (firstRender.current) {
            firstRender.current = false
            return
        }
        const formValidation = () => {
            const validations = [];

            function validateUserName() {
                if (userName === "") {
                    setUserNameError("Enter User Name");
                    return true;
                } else {
                    setUserNameError("");
                    return false;

                }
            }

            validations.push(validateUserName());

            function validatePassword() {
                if (password.length < 6) {
                    setPasswordError("password must be at least 6 characters");
                    return true;

                }
                if (password.length > 10) {
                    setPasswordError(`Password must be less than 10 Characters`);
                    return true;
                } else {
                    setPasswordError("");
                    return false;
                }
            }

            validations.push(validatePassword());

            function validateConfirmPassword() {
                if (password !== confirmPassword) {
                    setConfirmPasswordError("Password must match");
                    return true;
                } else {
                    setConfirmPasswordError("");
                    return false;
                }
            }

            validations.push(validateConfirmPassword());

            function validateNumber() {
                if (!phoneNumber) {
                    setPhoneNumberError("Enter Phone Number");
                    return true;
                } else {
                    setPhoneNumberError("");
                    return false;
                }
            }

            validations.push(validateNumber());

            function validateRole() {
                if (!role) {
                    setRoleError("Select Role");
                    return true;
                } else {
                    setRoleError("");
                    return false;
                }
            }

            validations.push(validateRole());


            return allAreValid(validations);
        };
        setDisabled(formValidation());
    }, [userName, password, phoneNumber, confirmPassword, role]);

    function allAreValid(validations) {
        let status = true;
        for (const validation of validations) {
            status &= !validation;
        }

        return !status;
    }

    const Submit = (e) => {
        e.preventDefault();


        fetch("https://localhost:44302/api/Users/CreateUser/", {
            mode: 'no-cors',
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify([{userName, password, confirmPassword, phoneNumber, role}]),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => res.text())
            .then((result) => console.log(result))
            .catch((err) => console.log(err));

        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        setRole("");

        console.log(userName);
        console.log(password);
        console.log(role);
    };


    return (
        <div className="justify-content-center d-flex text-center">
            <Form className="shadow rounded p-5" onSubmit={Submit}>
                <h2>Sign Up</h2>
                <Form.Group as={Row} controlId="name">
                    <Form.Label column sm={4}>
                        Name
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            type="text"
                            placeholder="user Name"
                            name="name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            autoComplete="true"
                        />
                        <div className="error">{userNameError}</div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm={4}>
                        Password
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="true"
                        />
                        <div className="error">{passwordError}</div>

                    </Col>

                </Form.Group>

                <Form.Group as={Row} controlId="confirmPassword">
                    <Form.Label column sm={6} md={4}>
                        Confirm Password
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            type="password"
                            placeholder="confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="true"
                        />
                        <div className="error">{confirmPasswordError}</div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm={4}>
                        Mobile NO.
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            type="text"
                            placeholder="Mobile NO."
                            name="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            autoComplete="true"
                        />
                        <div className="error">{phoneNumberError}</div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Role">
                    <Form.Label column sm={4}>
                        Role Type
                    </Form.Label>
                    <Col md={8}>
                        <Form.Control
                            as="select"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </Form.Control>
                        <h4>You selected {role}</h4>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Col sm={{span: 10, offset: 4}}>
                        <Button type="submit" disabled={disable}>
                            Submit
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    );
}

export default AddUser;
