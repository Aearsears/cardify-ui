import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../../components/flashcard/Flashcard';
import { Card } from '../../interfaces';
import { IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
StudyDeck.propTypes = {};

function StudyDeck(props) {
    const cards: Card[] = [
        {
            question: 'What is the capital of USA?',
            answer: 'washington',
            context: 'geography'
        },
        {
            question: 'what is the powerhouse of the cell?',
            answer: 'Mitochondira',
            context: 'biology'
        },
        {
            question: 'What is a prime number?',
            answer: 'a number that is only divisible by itself and one',
            context: 'math'
        }
    ];

    const [cardCounter, setCounter] = useState(0);
    const [isFlipped, setFlipped] = useState(false);

    const goForward = () => {
        //((a % n ) + n ) % n
        let n = cards.length;
        setCounter((((cardCounter + 1) % n) + n) % cards.length);
    };
    const goBack = () => {
        let n = cards.length;
        setCounter((((cardCounter - 1) % n) + n) % cards.length);
    };

    const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setFlipped(!isFlipped);
    };
    const handleSpacebar = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.code === '32') {
            setFlipped(!isFlipped);
        }
    };

    useEffect(() => {
        setFlipped(false);
    }, [cardCounter]);

    return (
        <div
            className=" w-full"
            onKeyPress={(e: React.KeyboardEvent<HTMLElement>) => {
                handleSpacebar(e);
            }}
        >
            <div className=" w-full p-4">
                <div className="card-container text-center flex items-center justify-center">
                    <Flashcard
                        question={cards[cardCounter].question}
                        answer={cards[cardCounter].answer}
                        context={cards[cardCounter].context}
                        clickHandler={handleCardClick}
                        flipped={isFlipped}
                    ></Flashcard>
                </div>
                <div className="buttons-wrapper text-center">
                    <div className="inline-block align-middle">
                        <IconButton
                            aria-label="back"
                            size="large"
                            onClick={goBack}
                        >
                            <ArrowBackIosNewIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                            aria-label="forward"
                            size="large"
                            onClick={goForward}
                        >
                            <ArrowForwardIosIcon fontSize="inherit" />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudyDeck;
