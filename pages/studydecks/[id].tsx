import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../interfaces';
import { Button, Fab, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import EditCard from '../../components/studydeck/EditCard';
import Link from 'next/link';
import CheckIcon from '@mui/icons-material/Check';
import Spinner from '../../components/Spinner';
import AddCardsButton from '../../components/studydeck/AddCardsButton';

StudyDeck.propTypes = {};

function StudyDeck(props) {
    const router = useRouter();
    const [isSaving, setSaving] = useState(false);
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
        <div className="mt-2">
            <div>
                <div>
                    <Typography>COMP 250</Typography>
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
                <div className="flex">
                    <Typography component="div" className="mr-1">
                        Cards
                    </Typography>
                    <div className="text-gray-400 ml-1">
                        {isSaving ? (
                            <span>
                                <Spinner size={20}></Spinner>Saving
                            </span>
                        ) : (
                            <span>
                                <CheckIcon></CheckIcon>
                                Saved
                            </span>
                        )}
                    </div>
                </div>
                {cards.map((value) => {
                    return (
                        <EditCard
                            answer={value.answer}
                            question={value.question}
                            context={value.context}
                            setSaving={setSaving}
                        ></EditCard>
                    );
                })}
            </div>
            <div className="text-center">
                <AddCardsButton></AddCardsButton>
            </div>
        </div>
    );
}
export default StudyDeck;
