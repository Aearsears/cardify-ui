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

const innerCard = (
    text: string,
    handleClick: (event: React.MouseEvent<HTMLElement>) => void,
    context?: string
) => (
    <React.Fragment>
        <CardActionArea onClick={handleClick}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {text}
                </Typography>
                {context ? (
                    <Typography variant="h6" component="div">
                        {context}
                    </Typography>
                ) : null}
            </CardContent>
        </CardActionArea>
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
                <Card variant="elevation">
                    {innerCard(props.question, handleClick)}
                </Card>
            </Box>
            <Box sx={{ width: 200 }}>
                <Card>
                    {innerCard(props.answer, handleClick, props.context)}
                </Card>
            </Box>
        </ReactCardFlip>
    );
}

export default Flashcard;
