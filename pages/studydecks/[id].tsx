import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from '../../interfaces';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import EditCard from '../../components/studydeck/EditCard';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import AddCardsButton from '../../components/studydeck/AddCardsButton';
import useSWR, { Fetcher } from 'swr';

StudyDeck.propTypes = {};

function StudyDeck(props) {
    const router = useRouter();
    const { id } = router.query;
    // get deck info from backend api
    const fetcher: Fetcher<Card[], string> = (url: string) =>
        fetch(url).then((res) => res.json());
    const { data, error } = useSWR('/api/cards', fetcher);
    if (!data) {
        return <Spinner size={20}></Spinner>;
    }
    if (error) {
        return <div>There was an error.</div>;
    }
    return (
        <div className="mt-2">
            <div>
                <div>
                    <Typography>COMP 250</Typography>
                    <Typography variant="subtitle1">
                        {data.length} cards
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
                </div>
                {data.map((value) => {
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
                <AddCardsButton></AddCardsButton>
            </div>
        </div>
    );
}
export default StudyDeck;
