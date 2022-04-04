import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PetItem from './PetItem';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


export default function SearchPet() {
    const [advanced, setAdvanced] = useState(false)
    const [hypoallergnic, setHypoallergnic] = useState(false)
    const [type, setType] = useState("");
    const [adoptionStatus, setadoptionStatus] = useState("");
    const [color, setColor] = useState("");
    const [height, setHeight] = useState([0, 100]);
    const [weight, setWeight] = useState([0, 100]);
    const [name, setName] = useState("")

    const [response, setResponse] = useState([]);


    const handleName = (event) => {
        setName(event.target.value)
    }

    const onChangesetHypoallergnic = (event) => {
        setHypoallergnic(event.target.checked)
    }

    const onChange = (event) => {
        setAdvanced(event.target.checked)
    }

    const handleClick = async () => {
        const searchOptions = { hypoallergnic, type, adoptionStatus, height, weight, color, name };
        const getPets = await axios.get('/api/pets', { params: searchOptions });
        setResponse(getPets.data.pets);

    };

    const handleWeightChange = (event, newWeight) => {
        setWeight(newWeight);
    };

    function weightKG(weight) {
        return `${weight}CM`;
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleColorChange = (event) => {
        setColor(event.target.value);
    }

    const handleStatusChange = (event) => {
        setadoptionStatus(event.target.value);
    }

    const handleHeightChange = (event, newHeight) => {
        setHeight(newHeight);
    }

    function heightChange(height) {
        return `${height}INCH`;
    }



    return (
        <div>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Search for your pet
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    id="name"
                                    name="Name"
                                    label="Name"
                                    fullWidth
                                    variant="standard"
                                    value={name}
                                    onChange={handleName}
                                />
                            </Grid>
                            <Grid item xs={12} sm={13}>
                                <FormControl variant="standard" sx={{ minWidth: 500 }}>
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        labelId="type"
                                        id="typeAnimal"
                                        value={type}
                                        onChange={handleTypeChange}
                                    >
                                        <MenuItem value="">
                                            <em>--</em>
                                        </MenuItem>
                                        <MenuItem value={"Dog"}>Dog</MenuItem>
                                        <MenuItem value={"Cat"}>Cat</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl variant="standard" sx={{ minWidth: 500 }}>
                                    <InputLabel>Adoption Status</InputLabel>
                                    <Select
                                        labelId="adoption"
                                        id="adoption"
                                        value={adoptionStatus}
                                        onChange={handleStatusChange}
                                    >
                                        <MenuItem value="">
                                            <em>--</em>
                                        </MenuItem>
                                        <MenuItem value={"Available"}>Available</MenuItem>
                                        <MenuItem value={"Fostered"}>Fostered</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {advanced &&
                                (<React.Fragment>
                                    <Grid item xs={12} sm={13}>
                                    <FormControl variant="standard" sx={{ minWidth: 500 }}>
                                        <InputLabel>Color</InputLabel>
                                        <Select
                                            labelId="color"
                                            value={color}
                                            onChange={handleColorChange}
                                        >
                                            <MenuItem value="">
                                                <em>--</em>
                                            </MenuItem>
                                            <MenuItem value={"Brown"}>Brown</MenuItem>
                                            <MenuItem value={"White"}>White</MenuItem>
                                            <MenuItem value={"Beige"}>Beige</MenuItem>
                                            <MenuItem value={"Black"}>Black</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <InputLabel>Weight in KG</InputLabel>
                                        <Box sx={{p: 2}}>
                                            <Slider
                                                value={weight}
                                                onChange={handleWeightChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={weightKG}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <InputLabel>Height in inches</InputLabel>
                                        <Box sx={{ p: 2 }}>
                                            <Slider
                                                value={height}
                                                onChange={handleHeightChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={heightChange}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox onChange={onChangesetHypoallergnic} color="secondary" name="hyperalergenic" value="yes" />}
                                            label="Hyperalergentic"
                                        />
                                    </Grid>
                                </React.Fragment>)}
                            <Grid item xs={3}>
                                <Button onClick={handleClick} variant="contained">Search</Button>
                            </Grid>
                            <Grid item xs={9}>
                                <FormControlLabel
                                    control={<Checkbox onChange={onChange} checked={advanced} color="secondary" name="advanced" value="yes" />}
                                    label="Advanced Search"
                                />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Paper>
            </Container>
            <Container sx={{ p: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {response.map((pet) => (
                        <PetItem pet={pet} key={pet._id} update={handleClick}/>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
