import React, { useState } from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";
import { FaUserAlt } from "react-icons/all";
import CryptoJS from "crypto-js";
// import HmacSHA1 from 'crypto-js/hmac-sha1';
import PKC57 from 'crypto-js/pad-pkcs7';


const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [passwords, setPassword] = useState("");

  

  let password = CryptoJS.AES.encrypt(passwords, "AAECAwQFBgcICQoLDA0ODw==",{keySize:128,padding:PKC57,mode:CryptoJS.mode.CBC,BlockSize:128}).toString();
  console.log(password);
  let decrypted = CryptoJS.AES.decrypt(password, "AAECAwQFBgcICQoLDA0ODw==",{keySize:128,padding:PKC57,mode:CryptoJS.mode.CBC,BlockSize:128}).toString();
console.log(decrypted);

  const Submit = (e) => {
    let payload = { userName, password };
    e.preventDefault();
    fetch("https://localhost:44302/api/Users/Login/", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((result) => result);
    console.log(payload);
  };

  return (
    <div className="justify-content-center d-flex text-center">
      <Form className="shadow rounded p-5" onSubmit={Submit}>
        <h2>Sign In</h2>
        <Form.Group as={Row} controlId="username">
          <Form.Label column sm={4}>
            Username
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaUserAlt />
                </InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                type="text"
                placeholder="username"
                name="Username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                autoComplete="true"
              />
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="password">
          <Form.Label column sm={4}>
            password
          </Form.Label>
          <Col md={8}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FaUserAlt />
                </InputGroup.Text>
              </InputGroup.Prepend>

              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={passwords}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="true"
              />
            </InputGroup>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 4 }}>
            <Button type="submit">Submit</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LogIn;
