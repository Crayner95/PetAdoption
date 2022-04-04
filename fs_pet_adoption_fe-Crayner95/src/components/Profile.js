import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { UserContext } from '../App';
import { useContext } from 'react';
import axios from 'axios'


export default function SearchPet() {
    const { user, setUser } = useContext(UserContext);
    const [advanced, setAdvanced] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [bio, setBio] = useState("");

    React.useEffect(() => {
        if(user){
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setUsername(user.username)
            setBio(user.bio)
        }
    }, [user])

    const handleFirstName = (event) => {
        setFirstName(event.target.value)
    } 

    const handleLastName =(event) => {
        setLastName(event.target.value)
    }

    const handleUsername = (event) => {
        setUsername(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleBio = (event) => {
        setBio(event.target.value)
    }

    const onChange = (event) => {
        setAdvanced(event.target.checked)
    }

    const handleProfile = async () => {
        const profileOptions = { firstName, lastName, username, password, bio };
        const newProfile = await axios.put(`/api/user`, profileOptions);
        setUser(newProfile.data);
    }

    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <React.Fragment>
                    <Typography variant="h6" gutterBottom>
                        Profile
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={13}>
                            <TextField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                value={firstName}
                                onChange={handleFirstName}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={13}>
                            <TextField
                                id="latsName"
                                name="lastName"
                                label="Last Name"
                                fullWidth
                                value={lastName}
                                onChange={handleLastName}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                type="email"
                                name="email"
                                label="Email Address"
                                value={username}
                                onChange={handleUsername}
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <React.Fragment>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    id="password"
                                    type="password"
                                    name="password"
                                    label="Password"
                                    value={password}
                                    onChange={handlePassword}
                                    fullWidth
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <FormControl
                                    className="bio"
                                    as="textarea"
                                    rows={4}
                                    value={bio}
                                    onChange={handleBio}
                                    style={{
                                        border: "0", 
                                        margin: "0px",
                                        width: "506px",
                                        height: "134px" }}
                                    placeholder="Tell us about yourself"
                                />
                            </Grid>
                        </React.Fragment>
                        <Grid item xs={3}>
                            <Button variant="contained" onClick={handleProfile}>Save</Button>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Paper>
        </Container>
    );
}