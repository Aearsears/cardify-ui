import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

interface Props {
    question?: string;
    answer?: string;
    context?: string;
}

const card = (
    <React.Fragment>
        <CardContent>
            <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
            >
                Word of the Day
            </Typography>
            <Typography variant="h5" component="div">
                What is AWS Glue?
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                adjective
            </Typography>
            <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Learn More</Button>
        </CardActions>
    </React.Fragment>
);

function Flashcard(props: Props) {
    const [isFlipped, setFlipped] = useState(false);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setFlipped(!isFlipped);
    };
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Box sx={{ width: 200 }}>
                <Card variant="elevation">{card}</Card>
                <Button onClick={handleClick}>Click to flip</Button>
            </Box>
            <Box sx={{ width: 200 }}>
                <Card sx={{ width: 200 }}>
                    <CardActionArea onClick={handleClick}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                ETL service
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </ReactCardFlip>
    );
}

export default Flashcard;
