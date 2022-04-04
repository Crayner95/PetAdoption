import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import { useHistory } from "react-router-dom";
import Modal from '@mui/material/Modal';
import { BsHeart } from 'react-icons/bs'
import { BsHeartFill } from 'react-icons/bs'
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';


export default function PetItem({ pet, update, updateSave }) {
    const [editing, setEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [answer, setAnswer] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [name, setName] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [breed, setBreed] = useState("");
    const [color, setColor] = useState("");
    const [hypoallergnic, setHypoallergnic] = useState("");
    const [adoptionStatus, setadoptionStatus] = useState("");
    const [file, setFile] = useState(null);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 23,
        p: 2,
    };

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleHeight = (event) => {
        setHeight(event.target.value)
    }

    const handleWeight = (event) => {
        setWeight(event.target.value)
    }

    const handleBreed = (event) => {
        setBreed(event.target.value)
    }

    const handleColor = (event) => {
        setColor(event.target.value)
    }

    const handleHypoallergnic = (event) => {
        setHypoallergnic(event.target.value)
    }

    const onUpload = (event) => {
        setFile(event.target.files[0])
    }

    const handleEdit = () => {
        setEditing(true);
        setName(pet.name);
        setHeight(pet.height);
        setWeight(pet.weight);
        setBreed(pet.breed);
        setColor(pet.color);
        setHypoallergnic(pet.hypoallergnic)
        setadoptionStatus(pet.adoptionStatus)
    }

    const handleSavePet = async () => {
        setEditing(false);
        const formData = new FormData()
        formData.append("name", name);
        formData.append("height", height);
        formData.append("weight", weight);
        formData.append("breed", breed);
        formData.append("color", color);
        formData.append("hypoallergnic", hypoallergnic);
        formData.append("adoptionStatus", adoptionStatus);
        formData.append("picture", file);
        const newPet = await axios.put(`/api/pets/${pet._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        update();
    }

    const handleFoster = async () => {
        const fostering = { adoptionStatus: "Fostered" }
        const getMyPets = await axios.put(`/api/pets/${pet._id}`, fostering);
        update();
        setOpen(false);

    };

    const handleAdopt = async (e) => {
        e.disabled = true; //how to disable
        const adopting = { adoptionStatus: "Adopted" }
        const getMyPets = await axios.put(`/api/pets/${pet._id}`, adopting);
        update();
        setOpen(false);

    };

    const handleReturn = async (e) => {
        const adopting = { adoptionStatus: "Available" }
        const getMyPets = await axios.put(`/api/pets/${pet._id}`, adopting);
        update();
        setOpen(false);

    };

    const handleSave = async () => {
        const saved = { savedPets: [...user.savedPets, pet._id] }
        const userWithSavedPets = await axios.put(`/api/user`, saved);
        setUser(userWithSavedPets.data);
    }

    const handleUnsave = async () => {
        const unsave = { savedPets: user.savedPets.filter(unhearted => unhearted != pet._id) };
        const userWithSavedPets = await axios.put(`/api/user`, unsave);
        setUser(userWithSavedPets.data);
    }

    const isSaved = user?.savedPets ? user.savedPets.includes(pet._id) : false;

    return (
        <Grid item key={pet.name} md={4}>
            <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
                <CardMedia
                    component="img"
                    image={pet.picture}
                    alt="random"
                />
                <CardContent>
                    <Typography>
                        {pet.name}
                    </Typography>
                    <Typography>
                        {pet.adoptionStatus}
                    </Typography>
                </CardContent>
                <CardActions>
                    {isSaved
                        ? <Button size="small" onClick={handleUnsave}> <BsHeartFill /> </Button>
                        : <Button size="small" onClick={handleSave}> <BsHeart /> </Button>
                    }
                    <Button onClick={handleOpen} size="small">Learn More</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Card sx={style}>
                            {!editing ?
                                (<CardMedia
                                    component="img"
                                    image={pet.picture}
                                    alt="random"
                                />)
                                : (<FormControl required>
                                    <input onChange={onUpload} className="petpic" type="file" name="picture" />
                                </FormControl>)}
                            <CardContent>
                                {editing ? (
                                    <TextField
                                        name="Name"
                                        label="Name"
                                        value={name}
                                        onChange={handleName}
                                        fullWidth
                                        variant="standard"
                                    />
                                ) :
                                    (<Typography>
                                        Name: {pet.name}
                                    </Typography>)}
                                {editing ? (
                                    <TextField
                                        name="Height"
                                        label="Height"
                                        value={height}
                                        onChange={handleHeight}
                                        fullWidth
                                        variant="standard"
                                    />
                                ) : (<Typography>
                                    Height: {pet.height}
                                </Typography>)}
                                {editing ? (
                                    <TextField
                                        name="Weight"
                                        label="Weight"
                                        value={weight}
                                        onChange={handleWeight}
                                        fullWidth
                                        variant="standard"
                                    />
                                ) : (<Typography>
                                    Weight: {pet.weight}
                                </Typography>)}
                                {editing ? (
                                    <TextField
                                        name="Breed"
                                        label="Breed"
                                        value={breed}
                                        onChange={handleBreed}
                                        fullWidth
                                        variant="standard"
                                    />
                                ) : (<Typography>
                                    Breed: {pet.breed}
                                </Typography>)}
                                {editing ? (
                                    <TextField
                                        name="Color"
                                        label="Color"
                                        value={color}
                                        onChange={handleColor}
                                        fullWidth
                                        variant="standard"
                                    />
                                ) : (<Typography>
                                    Color: {pet.color}
                                </Typography>)}
                                {editing ? (
                                    <TextField
                                        name="Hypo"
                                        label="hypoallergnic"
                                        value={hypoallergnic}
                                        onChange={handleHypoallergnic}
                                        fullWidth
                                        variant="standard"
                                    />
                                ) : (<Typography>
                                    hypoallergnic: {pet.hypoallergnic ? "Yes" : "No"}
                                </Typography>)}
                                <Typography>
                                    {pet.adoptionStatus}
                                </Typography>
                            </CardContent>
                            <Grid>
                                <CardActions>
                                    {isSaved
                                        ? <Button size="small" onClick={handleUnsave}> <BsHeartFill /> </Button>
                                        : <Button size="small" onClick={handleSave}> <BsHeart /> </Button>
                                    }
                                    <Button onClick={handleAdopt} size="small">Adopt</Button>
                                    <Button onClick={handleFoster} size="small">Foster</Button>
                                    <Button onClick={handleReturn} size="small">Return</Button>
                                    {(user?.isAdmin && !editing) && <Button onClick={handleEdit} size="small">Edit</Button>}
                                    {editing && <Button onClick={handleSavePet} size="small">Save</Button>}
                                </CardActions> 
                            </Grid>
                        </Card>
                    </Modal>
                </CardActions>
            </Card>
        </Grid>
    )
}
