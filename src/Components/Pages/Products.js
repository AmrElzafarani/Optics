import React, {useEffect, useRef, useState} from "react";
import TableContainer from "../Table/TableContainer";
import AddProduct from "./AddProduct";
import {AiOutlineClose} from "react-icons/all";
import UpdateProduct from "./UpdateProduct";


const Products = () => {

    const [data, setData] = useState([]);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const Data = () => {

        fetch("https://localhost:44302/api/WholeSaleProducts/GetWholeSaleProducts")
            .then((response) => response.json())
            .then((result) => {
                if (mountedRef.current) {
                    setData(result.data);
                }
            });
    }
    console.log(data)

    useEffect(() => {
        Data();
    }, [])

    const removeData = (id) => {

        fetch(`https://localhost:44302/api/WholeSaleProducts/DeleteWholeSaleProduct/${id}`,
            {method: 'DELETE'})
            .then(() => {
                const newData = data.filter(newData => id !== newData.id)
                setData(newData);

            })
    }
    const columns = React.useMemo(
        () => [
            {
                Header: 'Serial NO.',
                accessor: 'serialNumber',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Price',
                accessor: 'price',

            },
            {
                Header: 'Quantity',
                accessor: 'unitsInStock',

            },
            {
                Header: 'Action',
                id: 'action',
                accessor: () => 'action',
                Cell: ({row}) => (
                    <div>
                        <AiOutlineClose onClick={() => removeData(row.original.id)}/>
                        <UpdateProduct data={row.original}
                                       clicked={Data}
                        />

                    </div>
                )

            },
        ], [data]
    );


    return (
        <>
            <AddProduct clicked={Data}/>
            <TableContainer
                columns={columns}
                data={data}
            />
        </>
    )

}

export default Products;