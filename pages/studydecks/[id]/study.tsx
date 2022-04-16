import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import Flashcard from '../../../components/flashcard/Flashcard';
import { Card } from '../../../interfaces';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';

Study.propTypes = {};

function Study(props) {
    const router = useRouter();
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
        console.log(event.code);
        if (event.code === 'Space') {
            setFlipped(!isFlipped);
        } else if (event.code === 'ArrowRight') {
            goForward();
        } else if (event.code === 'ArrowLeft') {
            goBack();
        }
    };

    useEffect(() => {
        setFlipped(false);
    }, [cardCounter]);

    return (
        <div
            className="w-full mt-4"
            // The keydown event is fired when a key is pressed down. Unlike the keypress event, the keydown event is fired for keys that produce a character value and for keys that do not produce a character value.
            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                handleSpacebar(e);
            }}
            tabIndex={-1}
        >
            <div className="buttons text-right">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => router.back()}
                >
                    Go back
                </Button>
            </div>
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
                        <span>
                            {cardCounter + 1} of {cards.length}
                        </span>
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

export default Study;
