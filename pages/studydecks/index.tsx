import { Typography } from '@mui/material';
import * as React from 'react';
import Flashcard from '../../components/flashcard/flashcard';

type Props = {};

function StudyDecksIndex(props: Props) {
    return (
        <div>
            <Typography>Your Study Decks</Typography>
            <div className="flex">
                <Flashcard></Flashcard>
                <Flashcard></Flashcard>
                <Flashcard></Flashcard>
            </div>
        </div>
    );
}

export default StudyDecksIndex;
