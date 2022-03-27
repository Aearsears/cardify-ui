import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
    width: number = 300,
    height: number = 300,
    context?: string
) => (
    <Box sx={{ width: width, height: height }}>
        <Card variant="elevation" className="w-full h-full">
            <CardActionArea onClick={handleClick} className="h-full w-full">
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
        </Card>
    </Box>
);

function Flashcard(props: Props) {
    const [isFlipped, setFlipped] = useState(false);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setFlipped(!isFlipped);
    };
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            {innerCard(props.question, handleClick)}
            {innerCard(
                props.answer,
                handleClick,
                undefined,
                undefined,
                props.context
            )}
        </ReactCardFlip>
    );
}

export default Flashcard;
