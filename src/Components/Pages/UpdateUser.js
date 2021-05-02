import React, {useState} from 'react';
import {FiEdit} from "react-icons/all";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const UpdateUser = (props) => {

    const[user, setUser] = useState({id:props.data.id, userName: props.data.userName, phoneNumber: props.data.phoneNumber, email:"moha@gmail.com", roles:[{id:"1"}]});
    const[showModal, setShowModal] = useState(false);
    const modalToggle= () => {
        setShowModal(!showModal);
    }

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const updateUser = (e) => {
        e.preventDefault();
        fetch(`https://localhost:44302/api/Users/UpdateUser/${props.data.id}`, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        })
            .then((response)=>response.json())
            .then((result) => result.data)
            .then(() => props.updatedUser())
        console.log(user);
    }

    return (
        <div>
            <FiEdit onClick={modalToggle} />
            <Modal show={showModal} onHide={modalToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Update User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={updateUser}>
                        <Form.Group>
                            <Form.Label>ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="id"
                                // placeholder={props.data.id}
                                value={user.id}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type="text"
                                name="userName"
                                // placeholder={props.data.userName}
                                value={user.userName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>PhoneNumber</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                // placeholder={props.data.phoneNumber}
                                value={user.phoneNumber}
                                onChange={handleChange}
                            />

                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={{span: 10, offset: 4}}>
                                <Button type="submit" onClick={modalToggle}>
                                    Update
                                </Button>
                            </Col>
                        </Form.Group>


                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    )

}

export default UpdateUser;