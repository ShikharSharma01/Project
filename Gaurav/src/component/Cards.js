import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


// props.data.id} data={obj} />
export default function Cards(props) {
    return (
        <Card style={{ margin: "20px 40px" }} sx={{ maxWidth: 400 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.data.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.data.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Book a Table
                        onClick={() => {}}
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    );
}