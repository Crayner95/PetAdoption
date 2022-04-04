import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { useHistory } from "react-router-dom";
import { UserContext } from '../App';
import { useContext } from 'react'


export default function Main() {
    const { user } = useContext(UserContext);
    const history = useHistory();
    return (
        <Box m={8}
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    component="h2"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Welcome to Paws
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    Find the yin to your yan with the first adoptable pet search site to exclusively offer real-time updates of adoptable pets in shelters.
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                {user && (<Button variant="contained" onClick={() => history.push("/search")}>Find your pet</Button>)}
                {!user && (<Button variant="contained" onClick={() => history.push("/login")}>Find your pet</Button>)}

                </Stack>
            </Container>
        </Box>
    )
}
