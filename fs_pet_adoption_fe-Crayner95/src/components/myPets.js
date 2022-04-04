import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useHistory } from "react-router-dom";
import PetItem from './PetItem';
import { useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { useContext } from 'react'

export default function MyPets() {
    const userContext = useContext(UserContext);
    const history = useHistory();
    const [results, setResults] = useState([]);
    const [saved, setSaved] = useState([]);

    const updateOwnership = () => {
        (async () => {
            const allMyPets = await axios.get(`/api/mypets`);
            setResults(allMyPets.data);
        })()
    }

    const updateSaved = () => {
        (async () => {
            const UpdateSaved = await axios.get(`/api/savedpets`);
            setResults(UpdateSaved.data);
        })()
    }

    React.useEffect(updateOwnership, [])

    React.useEffect(updateSaved, [])

    const updateSavedPets = () => {
        (async () => {
            const saved = await axios.get(`/api/savedpets`);
            setSaved(saved.data);
        })()
    }

    React.useEffect(updateSavedPets, [])


    const ColoredLine = () => (
        <hr
            style={{
                width: 1000
            }}
        />
    );


    return (
        <div>
            {/* Hero unit */}
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                {!saved && !results && (<Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h4"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Your Furry Friends
                    </Typography>
                    <Typography variant="h6" align="center" color="text.secondary" paragraph>
                        You currently do not own or are fostering any pets.
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={3}
                        justifyContent="center"
                    >
                        <Button variant="contained" onClick={() => history.push('/')}>Keep Searching</Button>
                    </Stack>
                </Container>)}
            </Box>
            <Typography className="saved" variant="h6" align="center" color="text.secondary" paragraph>
                Saved
            </Typography>
            <ColoredLine />
            {saved.length === 0 && (<Typography className="saved" variant="h6" align="center" color="text.secondary" paragraph>
                You currently have no saved pets.
            </Typography>)}
            <Container sx={{ p: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {saved.map((pet) => (
                        <PetItem pet={pet} key={pet._id} update={updateSavedPets} />
                    ))}
                </Grid>
            </Container>
            <Typography className="fostered" variant="h6" align="center" color="text.secondary" paragraph>
                Fostered
            </Typography>
            <ColoredLine />
            {results.filter(pet => pet.adoptionStatus == "Fostered").length === 0 && (<Typography className="saved" variant="h6" align="center" color="text.secondary" paragraph>
                You currently have no fostered pets.
            </Typography>)}
            <Container sx={{ p: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {results.filter(pet => pet.adoptionStatus == "Fostered").map((pet) => (
                        <PetItem pet={pet} key={pet._id} update={updateOwnership}/>
                    ))}
                </Grid>
            </Container>
            <Typography className="adopted" variant="h6" align="center" color="text.secondary" paragraph>
                Adopted
            </Typography>
            <ColoredLine />
            {results.filter(pet => pet.adoptionStatus == "Adopted").length === 0 && (<Typography className="saved" variant="h6" align="center" color="text.secondary" paragraph>
                You currently have no adopted pets.
            </Typography>)}
            <Container sx={{ p: 8 }} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {results.filter(pet => pet.adoptionStatus == "Adopted").map((pet) => (
                        <PetItem pet={pet} key={pet._id} update={updateOwnership} updateSave={updateSaved}/>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
