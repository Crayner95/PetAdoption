import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import axios from 'axios';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function SearchPet() {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleAdd = async (event) => {
        const data = new FormData(event.currentTarget);
        event.preventDefault();
        try {

            const petInfo = await axios.post('/api/pets', data, {headers: { "Content-Type": "multipart/form-data" }})
            setOpen(true)
        } catch (err) {
            alert(err.response.data.message);
        }
    };


    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Box component="form" onSubmit={handleAdd}>
                    <Typography variant="h6" gutterBottom>
                        Add a pet
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                label="Name"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={13}>
                            <FormControl variant="standard" sx={{ minWidth: 500 }} required>
                                <InputLabel>Type</InputLabel>
                                <Select
                                    labelId="type"
                                    name="type"
                                >
                                    <MenuItem value={"Dog"}>Dog</MenuItem>
                                    <MenuItem value={"Cat"}>Cat</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="standard" sx={{ minWidth: 500 }} required>
                                <InputLabel>Adoption Status</InputLabel>
                                <Select
                                    labelId="status"
                                    name="adoptionStatus"
                                >
                                    <MenuItem value={"Available"}>Available</MenuItem>
                                    <MenuItem value={"Fostered"}>Fostered</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <React.Fragment>
                            <Grid item xs={12} sm={13}>
                                <FormControl variant="standard" sx={{ minWidth: 500 }}>
                                    <InputLabel>Color</InputLabel>
                                    <Select
                                        labelId="color"
                                        name="color"
                                    >
                                        <MenuItem value={"Brown"}>Brown</MenuItem>
                                        <MenuItem value={"White"}>White</MenuItem>
                                        <MenuItem value={"Beige"}>Beige</MenuItem>
                                        <MenuItem value={"Black"}>Black</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="height"
                                    label="Height in inches"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    name="weight"
                                    label="Weight in KG"
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <FormControlLabel
                                    control={<Checkbox 
                                        color="secondary" 
                                        name="hypoallergnic"  
                                        />}
                                    label="Hyperalergentic"
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl required>
                                    <input className="petpic" type="file" name="picture"/>
                                </FormControl>
                            </Grid>
                        </React.Fragment>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained">Add</Button>
                        </Grid>
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Your pet was added successfully!
                            </Alert>
                        </Snackbar>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}