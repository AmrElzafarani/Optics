import React, {useEffect, useRef, useState} from 'react';
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {AiOutlineClose, AiOutlineFileAdd} from "react-icons/all";
import { useParams } from 'react-router';

const Add = () => {

    const [fields, setFields] = useState([{productName:"", Price:"", Quantity:""}]);

    const [data, setData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const dropdownRef = useRef(null);
    const {id} = useParams("");

    useEffect(() => {
        fetch(`https://localhost:44302/api/WholeSaleProducts/GetWholeSaleProductsBySerial?serial=1`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setData(res);
                console.log(res);
            })
    }, [id]);

    // click away listener
    useEffect(() => {
        document.addEventListener('mousedown', handleClick, false);
        return () => document.removeEventListener('mousedown', handleClick, false);
    }, []);

    const handleClick = e => {
        if (dropdownRef.current.contains(e.target)) {
            return;
        }
        setVisible(false);
    };

    const selectItem = (item) => {
        setSelectedItem(item.id);
        setVisible(false);
    };


    const handleChange = (i, event) => {
        const values = [...fields];
        const {name, value} = event.target
        values[i][name] = value;
        setFields(values);
        console.log(fields);
    }

    const addNewProductInBill = () => {
        const values = [...fields];
        values.push({
            productName: "",
            Price: '',
            Quantity: null
        });
        setFields(values);

    }
    const removeProductFromBill = (id) => {
        const values = [...fields];
        values.splice(id, 1)
        setFields(values);
    }
    return (
        <div>

            <h1>Make Order</h1>
            <Button onClick={addNewProductInBill}>
                <AiOutlineFileAdd/>
            </Button>

            {fields.map((field, i) => {
                return (
                    <div key={`${field}-${i}`}>
                        <Form>
                            <Row>
                                <Col>
                                    <input
                                        type="text"
                                        name="productName"
                                        placeholder="product Name"
                                        value={field.productName}
                                        onChange={e => handleChange(i, e)}
                                        // onChange={(e) => setData(e.target.value)}
                                        onFocus={() => {
                                            setVisible(true)
                                        }}
                                    >

                                    </input>

                                    <Dropdown ref={dropdownRef}>
                                        {visible && (
                                            <ul>

                                                {data.map((d) =>
                                                    <li key={d.id} className="dropdown-item" onClick={() => selectItem(d)}>
                                                        {d.serialNumber}
                                                    </li>
                                                    
                                                )}

                                            </ul>
                                        )}
                                    </Dropdown>

                                </Col>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        name="Price"
                                        value={data.Price}
                                        onChange={e => handleChange(i, e)}
                                        placeholder="Price"/>
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        name="Quantity"
                                        value={field.Quantity}
                                        onChange={e => handleChange(i, e)}
                                        placeholder="Quantity"/>
                                </Col>
                                <Button onClick={() => removeProductFromBill(i)}>
                                    <AiOutlineClose/>
                                </Button>

                            </Row>
                        </Form>
                    </div>
                );
            })}
        </div>
    );

}

export default Add;