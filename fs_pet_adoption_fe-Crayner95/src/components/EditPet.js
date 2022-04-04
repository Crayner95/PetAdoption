import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export default function EditPet() {
    return (
        <Card sx={style}>
            <CardMedia
                component="img"
                image={pet.picture}
                alt="random"
            />
            <CardContent>
                <Typography>
                    Name: {pet.name}
                </Typography>
                <Typography>
                    Height: {pet.height}
                </Typography>
                <Typography>
                    Weight: {pet.weight}
                </Typography>
                <Typography>
                    Breed: {pet.breed}
                </Typography>
                <Typography>
                    Color: {pet.color}
                </Typography>
                <Typography>
                    hypoallergnic: {pet.hypoallergnic ? "Yes" : "No"}
                </Typography>
                <Typography>
                    {pet.adoptionStatus}
                </Typography>
            </CardContent>
            <Grid>
                <CardActions>
                    <Button size="small">Update</Button>
                </CardActions>
            </Grid>
        </Card>
    )
}
