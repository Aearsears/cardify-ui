import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../interfaces';
import { Button, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import EditCard from '../../components/studydeck/EditCard';
import Link from 'next/link';
import AddCircleIcon from '@mui/icons-material/AddCircle';
StudyDeck.propTypes = {};

function StudyDeck(props) {
    const router = useRouter();
    const { id } = router.query;
    // get deck info from backend api
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
    return (
        <div>
            <div>
                <div>
                    <Typography>Title</Typography>
                    <Typography variant="subtitle1">
                        {cards.length} cards
                    </Typography>
                </div>
                <div className="text-right">
                    <Link href={`/studydecks/${id}/study`} passHref>
                        <Button color="secondary" variant="contained">
                            Start studying
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="edit-section">
                <Typography>edit cards</Typography>
                {cards.map((value) => {
                    return (
                        <EditCard
                            answer={value.answer}
                            question={value.question}
                            context={value.context}
                        ></EditCard>
                    );
                })}
            </div>
            <div className="text-center">
                <IconButton size="large">
                    <AddCircleIcon></AddCircleIcon>
                </IconButton>
            </div>
        </div>
    );
}
export default StudyDeck;
