import React, {useEffect, useState} from 'react';
import {useTable} from "react-table";
import {Button, Col, Form, Modal, Row, Table} from "react-bootstrap";

const Products = () => {

    const EditableCell = ({
                              value: initialValue,
                              row: {index},
                              column: {id},
                              updateMyData: updateMyData,
                          }) => {
        const [value, setValue] = useState(initialValue);

        const onChange = e => {
            setValue(e.target.value)
        }
        const onBlur = () => {
            updateMyData(index, id, value)
        }
        useEffect(() => {
            setValue(initialValue)
        }, [initialValue])
        return <input value={value} onChange={onChange}/>

    }
    //Fetch Data
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://localhost:44302/api/WholeSaleProducts/GetWholeSaleProducts")
            .then((response) => response.json())
            .then((result) => setData(result.data))
    }, []);

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Serial NO.',
                accessor: 'serialNumber',

            },
            {
                Header: 'Name',
                accessor: 'name',
                Cell: EditableCell,
            },
            {
                Header: 'Price',
                accessor: 'price',
                Cell: EditableCell,

            },
            {
                Header: 'Quantity',
                accessor: 'unitsInStock',

            },
    //         {
    //             Header: "Edit",
    //             Cell: () => (
    //                 <Button onClick={EditableCell}>Edit</Button>
    // )
    //         }


        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data})

    const [serialNumber, setSerialNumber] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(isNaN);
    const [unitsInStock, setUnitsInStock] = useState(isNaN);


    const Save = (e) => {
        e.preventDefault();
        fetch("https://localhost:44302/api/WholeSaleProducts/CreateWholeSaleProduct", {
            method: "POST",
            body: JSON.stringify({serialNumber, name, price, unitsInStock}),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            },
        })
            .then((response) => response.json())
            .then((result) => {
                return ((result.data))
            });


    }

    return (
        <React.StrictMode>
            <div>
                <Button variant='primary' onClick={handleShow}>
                    Add Product
                </Button>
                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={Save}>
                            <Form.Group controlId="serialNumber">
                                <Form.Label>Serial NO.</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Serial NO."
                                    value={serialNumber}
                                    onChange={(e) => setSerialNumber(e.target.value)}

                                />
                            </Form.Group>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}

                                />
                            </Form.Group>
                            <Form.Group controlId="price">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.valueAsNumber)}

                                />
                            </Form.Group>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Quantity"
                                    value={unitsInStock}
                                    onChange={(e) => setUnitsInStock(e.target.valueAsNumber)}

                                />
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Col sm={{span: 10, offset: 4}}>
                                    <Button type="submit" onClick={handleClose}>
                                        Save
                                    </Button>
                                </Col>
                            </Form.Group> </Form>
                    </Modal.Body>

                </Modal>
            </div>
            <Table striped hover bordered responsive size="sm"{...getTableProps()} style={{border: 'solid 1px blue'}}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </React.StrictMode>
    )


}

export default Products;