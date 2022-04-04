import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';



export default function Logout() {


    return (
        <Box
            m={8}
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
                    Ciao for now!
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                    You have been successfully logged out -- see you next time.
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                </Stack>
            </Container>
        </Box>
    )
}