import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import Flashcard from '../../../components/flashcard/Flashcard';
import { Card } from '../../../interfaces';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import Spinner from '../../../components/Spinner';

Study.propTypes = {};

const CardsQuery = `
query getDeck($id: ID!) {
  deckById(id:$id) {
    cardSet {
      edges {
        node {
            id
            answerText
            questionText
        }
      }
    }
  }
}
`;

function Study(props) {
    const router = useRouter();
    const { id } = router.query;

    const [cardCounter, setCounter] = useState(0);
    const [isFlipped, setFlipped] = useState(false);

    // get deck info from backend api
    const [result, reexecuteQuery] = useQuery({
        query: CardsQuery,
        variables: { id },
        pause: true
    });

    const { data: cardsdata, fetching, error } = result;

    useEffect(() => {
        if (router.isReady) {
            //no cache for first request
            reexecuteQuery();
        }
    }, [router.isReady]);

    useEffect(() => {
        setFlipped(false);
    }, [cardCounter]);

    if (fetching) {
        return <Spinner size={20}></Spinner>;
    }
    if (error) {
        return <div>There was an error.</div>;
    }
    if (cardsdata?.length == 0) {
        return <div>No cards.</div>;
    }

    const goForward = () => {
        //((a % n ) + n ) % n
        let n = cardsdata?.deckById.cardSet.edges.length;
        setCounter((((cardCounter + 1) % n) + n) % n);
    };
    const goBack = () => {
        let n = cardsdata?.deckById.cardSet.edges.length;
        setCounter((((cardCounter - 1) % n) + n) % n);
    };

    const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setFlipped(!isFlipped);
    };
    const handleSpacebar = (event: React.KeyboardEvent<HTMLElement>) => {
        if (event.code === 'Space') {
            setFlipped(!isFlipped);
        } else if (event.code === 'ArrowRight') {
            goForward();
        } else if (event.code === 'ArrowLeft') {
            goBack();
        }
    };

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
                        question={
                            cardsdata?.deckById.cardSet.edges[cardCounter].node
                                .questionText
                        }
                        answer={
                            cardsdata?.deckById.cardSet.edges[cardCounter].node
                                .answerText
                        }
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
                            {cardCounter + 1} of{' '}
                            {cardsdata?.deckById.cardSet.edges.length}
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
