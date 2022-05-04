import { CardActionArea, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import ReactCardFlip from 'react-card-flip';

interface Props {
    question?: string;
    answer?: string;
    context?: string;
    clickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
    flipped?: boolean;
    height?: number;
    width?: number;
}

function Flashcard(props: Props) {
    const innerCard = (
        text: string,
        handleClick: (event: React.MouseEvent<HTMLElement>) => void,
        width: number = props.width || 300,
        height: number = props.height || 300,
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
    return (
        <ReactCardFlip
            isFlipped={props.flipped}
            flipDirection="horizontal"
            flipSpeedBackToFront={0}
            flipSpeedFrontToBack={0.3}
        >
            {innerCard(props.question, props.clickHandler)}
            {innerCard(
                props.answer,
                props.clickHandler,
                undefined,
                undefined,
                props.context
            )}
        </ReactCardFlip>
    );
}

export default Flashcard;
