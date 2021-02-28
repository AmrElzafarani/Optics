import React, {useState, useEffect, useRef} from "react";
import {Form, Col, Row, Button, InputGroup} from "react-bootstrap";
import {
    AiFillPhone,
    FaUserAlt,
    IoIosArrowDropdownCircle,
    RiLockPasswordFill
} from "react-icons/all";
import languageSwitcher from "../../Utilities/LanguageSwitcher";


function AddUser(props) {
    const [userName, setUserName] = useState("");
    const [userNameError, setUserNameError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [email, setEmail] = useState("moh.mourad9519@gmail.com");
    const [roles, setRole] = useState([]);

    const [roleError, setRoleError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [disable, setDisabled] = useState(true);
    languageSwitcher(props);

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
                if (roles.length === 0) {
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
    }, [userName, password, phoneNumber, confirmPassword, roles]);

    useEffect(() => {
        fetch("https://localhost:44302/api/Roles/GetRoles")
            .then((response) => response.json())
            .then((result) => setRole(result.data));
    }, []);

    function allAreValid(validations) {
        let status = true;
        for (const validation of validations) {
            status &= !validation;
        }

        return !status;
    }

    const Submit = (e) => {
        e.preventDefault();
        let payload = {
            userName,
            password,
            confirmPassword,
            email,
            phoneNumber,
            roles
        };

        console.log(payload);
        console.log("fetch called");
        fetch("https://localhost:44302/api/Users/CreateUser/", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log((result));
            });
        // .catch((err) => console.log("error" + err));

        setUserName("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNumber("");
        // setRole([]);

        // console.log(userName);
        // console.log(password);
        // console.log(roles);
    };


    return (
        <div className="justify-content-center d-flex text-center">
            <Form className="shadow rounded p-5" onSubmit={Submit}>
                <h2>Sign Up</h2>
                <Form.Group as={Row} controlId="name">
                    <Form.Label column sm={4}>
                        Username
                    </Form.Label>

                    <Col md={8}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FaUserAlt/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control

                                type="text"
                                placeholder="username"
                                name="name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                autoComplete="true"
                            />
                        </InputGroup>

                        <div className="error">{userNameError}</div>
                    </Col>

                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm={4}>
                        Password
                    </Form.Label>
                    <Col md={8}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <RiLockPasswordFill/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="true"

                            />
                        </InputGroup>
                        <div className="error">{passwordError}</div>

                    </Col>

                </Form.Group>

                <Form.Group as={Row} controlId="confirmPassword">
                    <Form.Label column sm={6} md={4}>
                        Confirm Password
                    </Form.Label>
                    <Col md={8}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <RiLockPasswordFill/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                                type="password"
                                placeholder="confirm Password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="true"
                            />
                        </InputGroup>
                        <div className="error">{confirmPasswordError}</div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm={4}>
                        Mobile NO.
                    </Form.Label>
                    <Col md={8}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <AiFillPhone/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                                type="text"
                                placeholder="Mobile NO."
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                autoComplete="true"
                            />
                        </InputGroup>
                        <div className="error">{phoneNumberError}</div>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="Role">
                    <Form.Label column sm={4}>
                        Role Type
                    </Form.Label>
                    <Col md={8}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <IoIosArrowDropdownCircle/>
                                </InputGroup.Text>
                            </InputGroup.Prepend>

                            <Form.Control
                                as="select"
                                value={roles}
                                onChange={(e) => setRole([{roles: e.target.value}])}
                                custom
                            >
                                {roles.map((value,i) => <option defaultValue="Choose" key={i} value={value.id}>{value.name}</option>)}
                            </Form.Control>
                        </InputGroup>
                        <div className="error">{roleError}</div>
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
