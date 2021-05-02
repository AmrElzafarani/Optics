import React, {useRef} from "react";
import {useState, useEffect} from "react";
import TableContainer from "../Table/TableContainer";
import {AiOutlineClose, FiEdit} from "react-icons/all";
import UpdateUser from "./UpdateUser";

function AllUsers() {


    const [data, setData] = useState([]);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true
        return () => {
            mountedRef.current = false
        }
    }, [])

    const getUsers = () => {

        fetch("https://localhost:44302/api/Users/GetUsers")
            .then((response) => response.json())
            .then((result) => {
                if (mountedRef.current) {
                    setData(result.data)
                }
            });
    }
    useEffect(() => {
        getUsers();
    }, []);

    const removeUser = (id) => {
        fetch(`https://localhost:44302/api/Users/DeleteUser/${id}`,
            {method: 'DELETE'})
            .then(() => {
                const newUsers = data.filter(newUsers => id !== newUsers.id)
                setData(newUsers);
            })
    }
    const columns = React.useMemo(
        () => [
            {
                Header: "Id",
                accessor: "id",
                disableFilters: true,
            },
            {
                Header: "Name",
                accessor: "userName",
            },
            {
                Header: "Phone",
                accessor: "phoneNumber",
            },
            {
                Header: "Role",
                accessor: 'roles[0].roleId',
            },
            {
                Header: "Action",
                id: "action",
                accessor: () => 'action',
                Cell: ({row}) => (
                    <div>

                        <AiOutlineClose onClick={() => removeUser(row.original.id)} />
                        <UpdateUser data={row.original}
                                    updatedUser={getUsers}

                        />

                    </div>
                )
            },

        ], [data]
    );


    return (

        <TableContainer columns={columns} data={data}/>
    );
}

export default AllUsers;
