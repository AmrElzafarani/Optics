import React, {useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {FiEdit} from "react-icons/all";

const UpdateProduct = (props) => {

    const[product, setProduct] = useState({serialNumber:props.data.serialNumber, name:props.data.name, price:props.data.price , unitsInStock:props.data.unitsInStock})

    const [showModal, setShowModal] = useState(false);

    const modalToggle = () => {
        setShowModal(!showModal);
    }
    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const update = (e) => {
        e.preventDefault()
        fetch(`https://localhost:44302/api/WholeSaleProducts/UpdateWholeSaleProduct/${props.data.id}`, {
            method: "PUT",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        })
            .then((response) => response.json())
            .then((result) => result.data)
            .then(() => props.clicked())
    }
    return (
        <div>
            <FiEdit onClick={modalToggle}/>
            <Modal show={showModal} onHide={modalToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={update}>
                        <Form.Group controlId="serialNumber">
                            <Form.Label>Serial NO.</Form.Label>
                            <Form.Control
                                type="text"
                                name="serialNumber"
                                // placeholder={props.data.serialNumber}
                                value={product.serialNumber}
                                onChange={handleChange}

                            />
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                // placeholder={props.data.name}
                                value={product.name}
                                onChange={handleChange}

                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                // placeholder={props.data.price}
                                value={product.price}
                                onChange={handleChange}

                            />
                        </Form.Group>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="unitsInStock"
                                // placeholder={props.data.unitsInStock}
                                value={product.unitsInStock}
                                onChange={handleChange}

                            />
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Col sm={{span: 10, offset: 4}}>
                                <Button type="submit" onClick={modalToggle}>
                                    Save
                                </Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Modal.Body>

            </Modal>
        </div>
    )

}

export default UpdateProduct;