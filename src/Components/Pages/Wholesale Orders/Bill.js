import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { AiOutlineClose, AiOutlineFileAdd } from "react-icons/all";
import { useParams } from "react-router";

const Bill = () => {
  // const [fields, setFields] = useState([{productName:"", Price:"", Quantity:""}]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [fields, setFields] = useState([]);
  const dropdownRef = useRef(null);

  const add = () => {
    fields.push({ productName, price, quantity });

    console.log(fields);
  };

  useEffect(() => {
    fetch(
      `https://localhost:44302/api/WholeSaleProducts/GetWholeSaleProductsBySerial?serial=1`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        // console.log(res);
      });
  }, []);
  console.log(data);

  // click away listener
  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => document.removeEventListener("mousedown", handleClick, false);
  }, []);

  const handleClick = (e) => {
    if (dropdownRef.current.contains(e.target)) {
      return;
    }
    setVisible(false);
  };

  const selectItem = (item) => {
    setProductName(item.name);
    setPrice(item.price);
    setVisible(false);
  };

  console.log(productName);
  console.log(price);
  console.log(quantity);

  return (
    <div>
      <h1>Make Order</h1>
      <Button onClick={add}>
        <AiOutlineFileAdd />
      </Button>

      <Form>
        <Row>
          <Col>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Search Text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                onFocus={() => {
                  setVisible(true);
                }}
              />
            </div>
            <div ref={dropdownRef} className={`dropdown ${visible ? "v" : ""}`}>
              {visible && (
                <ul>
                  {!data && <li>no result</li>}
                  {data.map((x, i) => (
                    <li
                      value={selectedItem.id}
                      key={i}
                      onClick={() => selectItem(x)}
                      className="dropdown_item"
                    >
                      <div>{x.serialNumber}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Col>
          <Col>
            <Form.Control
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              disabled
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              name="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
          </Col>
          <Button>
            <AiOutlineClose />
          </Button>
        </Row>
      </Form>
      {fields.map((x, i) => {
        return (
          <div value={x.id} key={i}>
            <h1> {x.productName}</h1>
            <h1> {x.price}</h1>
            <h1> {x.quantity}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default Bill;
