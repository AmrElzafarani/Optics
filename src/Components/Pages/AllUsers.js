import React from "react";
import {useState, useEffect} from "react";
import {useTable, useFilters} from "react-table";
import {Card, Col, Row, Table} from "react-bootstrap";

function AllUsers() {
    const ColumnFilter = ({column}) => {
        const {filterValue, setFilter} = column;
        return (
        <input style={{width:"5rem"}}
            value={filterValue || ""}
            onChange={(e) => setFilter(e.target.value)}
        />
        );
    };

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((result) => setData(result));
    }, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id", // accessor is the "key" in the data
                disableFilters: true,

            },
            {
                Header: "First_name",
                accessor: "title",
            },
            {
                Header: "Last_name",
                accessor: "body",
            },
            {
                Header: "Edit/Delete",
                Cell: () => (
                    <div>
                        <button onClick={() => console.log("mmmm")}>Edit</button>
                        <button onClick={() => console.log("delete")}>Delete</button>
                    </div>
                )
            },

        ],
        []
    );

    const defaultColumn = React.useMemo(
        () => ({
            Filter: ColumnFilter,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns, data, defaultColumn}, useFilters);

    return (
        // apply the table props
        <Row>
            <Col>
                <Card>
                    <Card.Body className="position-relative">
                        <Table striped hover bordered responsive size="sm" {...getTableProps()}>
                            <thead>
                            {
                                // Loop over the header rows
                                headerGroups.map((headerGroup) => (
                                    // Apply the header row props
                                    <tr  {...headerGroup.getHeaderGroupProps()}>
                                        {
                                            // Loop over the headers in each row
                                            headerGroup.headers.map((column) => (
                                                // Apply the header cell props
                                                <th {...column.getHeaderProps()}>
                                                    {
                                                        // Render the header
                                                        column.render("Header")
                                                    }
                                                    <div>
                                                    {column.canFilter ? column.render("Filter") : null}
                                                    </div>
                                                </th>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                            </thead>
                            {/* Apply the table body props */}
                            <tbody {...getTableBodyProps()}>
                            {
                                // Loop over the table rows
                                rows.map((row) => {
                                    // Prepare the row for display
                                    prepareRow(row);
                                    return (
                                        // Apply the row props
                                        <tr {...row.getRowProps()} onClick={() => console.log("AAAAA")}>
                                            {
                                                // Loop over the rows cells
                                                row.cells.map((cell) => {
                                                    // Apply the cell props
                                                    return (
                                                        <td {...cell.getCellProps()}>
                                                            {
                                                                // Render the cell contents
                                                                cell.render("Cell")
                                                            }
                                                        </td>
                                                    );
                                                })
                                            }
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}

export default AllUsers;
