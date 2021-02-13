import React, { useState, useEffect } from "react";
import PasswordValidation from "./passwordValidation";
import { Form, Col, Row, Button } from "react-bootstrap";

function AddUser() {
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [roles, setRoles] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [disable, setDisabled] = useState(true);

  const [password, setPassword, passwordError] = PasswordValidation({
    min: 6,
    max: 10,
  });
  useEffect(() => {
    const formValidation = () => {
      if (userName === "") {
        setUserNameError("Enter User Name");
      } else {
        setUserNameError("");
      }
      if (!confirmPassword || !password) {
        setConfirmPasswordError("");
        // return true
      } else if (password !== confirmPassword) {
        setConfirmPasswordError("The passwords must match.");
        // return true
      } else {
        setConfirmPasswordError("");
      }
      if (!email) {
        setEmailError("Enter correct email");
      } else {
        setEmailError("");
      }
      if (isNaN(phoneNumber)) {
        setPhoneNumberError("Enter Phone Number");
      } else {
        setPhoneNumberError("");
      }
    };
    setDisabled(formValidation());
  }, [userName, password, email, phoneNumber, confirmPassword]);

  const Submit = (e) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify([
      {
        userName: userName,
        password: password,
        confirmPassword: confirmPassword,
        email: email,
        phoneNumber: phoneNumber,
        roles: [{ roleId: "1" }],
      },
    ]);

    var requestOptions = {
      mode: "no-cors",
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://localhost:44302/api/Users/CreateUser/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
    // fetch("https://localhost:44302/api/Users/CreateUser/", {
    //   mode: 'no-cors',
    //   method: "POST",
    //   credentials: "same-origin",
    //   body: JSON.stringify([{ userName, password, confirmPassword, email,phoneNumber, role }]),
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //   },
    // })
    //   .then((res) => res.text())
    //   .then((result) => console.log(result) )
    //   .catch((err) => console.log(err));

    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setPhoneNumber("");

    // console.log(userName);
    // console.log(password);
    // console.log(role);
  };

  // useEffect(() => {
  //   console.log("name");
  //   if (userName) {
  //     setNameError("");
  //   } else {
  //     setNameError("Enter User Name");
  //   }
  // }, [userName]);

  // useEffect(() => {
  //   console.log("password");
  //   if (!confirmPassword || !password) {
  //     setConfirmPasswordError("");
  //   } else if (password !== confirmPassword) {
  //     setConfirmPasswordError("The passwords must match.");
  //   } else {
  //     setConfirmPasswordError("");
  //   }
  // }, [password, confirmPassword]);

  return (
    <div>
        <Form onSubmit={Submit}>
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={6}>
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
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={6}>
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
            <Form.Label column sm={2}>
              Confirm Password
            </Form.Label>
            <Col sm={6}>
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

          <Form.Group as={Row} controlId="email">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="true"
              />
              <div className="error">{emailError}</div>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="phone">
            <Form.Label column sm={2}>
              Mobile NO.
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                type="number"
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
            <Form.Label column sm={2}>
              Role Type
            </Form.Label>
            <Col sm={6}>
              <Form.Control
                as="select"
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Form.Control>
              <h4>You selected {roles}</h4>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 4 }}>
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
