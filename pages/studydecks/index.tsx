import { Typography } from '@mui/material';
import * as React from 'react';
import { useQuery } from 'urql';
import Flashcard from '../../components/flashcard/flashcard';

type Props = {};
const CardsQuery = `query{
    allQuestions {
        edges {
        node {
            id
            questionText
            createdDate
        }
        }
    }
 
}`;
function StudyDecksIndex(props: Props) {
    const [result, reexecuteQuery] = useQuery({
        query: CardsQuery
    });
    const { data, fetching, error } = result;

    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    return (
        <div>
            <Typography>Your Study Decks</Typography>
            <div className="flex">
                <Flashcard></Flashcard>
                <Flashcard></Flashcard>
                <Flashcard></Flashcard>
            </div>
            <div>{data.allQuestions.edges[0].node.questionText}</div>
        </div>
    );
}

export default StudyDecksIndex;
