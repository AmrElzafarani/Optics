import React, {useEffect, useRef, useState} from 'react';
import TabContainer from '../../Table/TableContainer';

const AllOrders = () => {

    const [allOrders, setAllOrders] = useState([]);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    useEffect(() => {
        fetch("https://localhost:44302/api/WholeSaleSellingOrders/GetWholeSaleSellingOrders")
            .then((response) => response.json())
            .then((result) => {
                if (mountedRef.current) {
                    setAllOrders(result.data);
                }
            })
    }, [])
    console.log(allOrders);

    const columns = React.useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'id',
            },
            {
                Header: 'order Date',
                accessor: 'orderDate',
            },
            {
                Header: 'Product Name',
                accessor: (row) => {
                    return row.wholeSaleSellingOrderDetails.map(order => order.wholeSaleProductId);
                },
            },
            {
                Header:'Quantity',
                accessor: (row) => {
                    return row.wholeSaleSellingOrderDetails.map(order => order.quantity);
                },            },
            {
                Header: 'Price',
                accessor: (row) => {
                    return row.wholeSaleSellingOrderDetails.map(order => order.price);
                },
            },
        ],[]);

    return (
        <div>
            <TabContainer
                columns={columns} c
                data={allOrders}
            />
        </div>
    );

};

export default AllOrders;