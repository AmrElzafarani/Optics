import React, { useState} from 'react';
import {Button, Col, Form, Modal, Row} from "react-bootstrap";

const AddProduct = (props) => {

    // const [serialNumber, setSerialNumber] = useState("");
    // const [name, setName] = useState("");
    // const [price, setPrice] = useState(0);


    // const [unitsInStock, setUnitsInStock] = useState(0);

    const[product, setProduct] = useState({serialNumber:"", name:"", price:0 , unitsInStock:0})
    const [showModal, setShowModal] = useState(false);

    const modalToggle = () => {
        setShowModal(!showModal);
    }

    const handleChange = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };
    const Save = (e) => {
        e.preventDefault();
        fetch("https://localhost:44302/api/WholeSaleProducts/CreateWholeSaleProduct", {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        })
            .then((response) => response.json())
            .then((result) => ((result.data)))
            .then(() => props.clicked())
    }

    return (
        <div>
            <Button variant='primary' onClick={modalToggle}>
                Add Product
            </Button>
            <Modal show={showModal} onHide={modalToggle}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={Save} >
                        <Form.Group controlId="serialNumber">
                            <Form.Label>Serial NO.</Form.Label>
                            <Form.Control
                                type="text"
                                name="serialNumber"
                                placeholder="Serial NO."
                                value={product.serialNumber}
                                onChange={handleChange}

                            />
                        </Form.Group>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={product.name}
                                onChange={handleChange}

                            />
                        </Form.Group>
                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={product.price}
                                onChange={handleChange}

                            />
                        </Form.Group>
                        <Form.Group controlId="quantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="unitsInStock"
                                placeholder="Quantity"
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

export default AddProduct;