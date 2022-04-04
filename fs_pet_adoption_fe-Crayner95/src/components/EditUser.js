import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useState } from 'react';
import { UserContext } from '../App';
import { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'

const columns = [
    { field: 'isAdmin', 
    headerName: 'Role', 
    width: 80, 
    valueGetter: (x) => x.row.isAdmin ? "Admin" : "User"},
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'phone',
        headerName: 'Phone Number',
        type: 'number',
        width: 200,
    },
    {
        field: 'username',
        headerName: 'Email',
        width: 250,
    },
   {
       field: 'ownedPets',
       headerName: 'Owned Pets',
       width: 250,
       valueGetter: (x) => x.row.ownedPets.map(pet => pet.name).join(", ")
   },
];



export default function EditUser() {
    const { user, setUser } = useContext(UserContext);
    const [tableData, setTableData] = useState([]);
    const [selection, setSelection] = useState([]);

    const update = async() => {
        const getUsers = await axios.get('/api/users')
        setTableData(getUsers.data)
    }

    React.useEffect(() => {
        update();

        //const d = getUsers.data.map((user) => ({ ...user, id: user._id }));

    }, [])

    const handleSelect = (e) => {
        setSelection(e)
    }

    const handleDeleteUser = async() => {
        for (let i=0; i<selection.length; i++){
        const deleteUser = await axios.delete(`/api/users/${selection[i]}`);
        }
        update();
        console.log(selection);

    }

    return (
        <div style={{ height: 700, width: '100%'}}>
            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeleteUser}>Delete</Button>
            <DataGrid
                rows={tableData}
                columns={columns}
                pageSize={11}
                rowsPerPageOptions={[11]}
                checkboxSelection
                onSelectionModelChange={handleSelect}
                getRowId={(row) => row._id}
            />
        </div>
    );
}