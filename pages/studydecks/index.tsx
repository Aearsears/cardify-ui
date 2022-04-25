import { Fab, Typography } from '@mui/material';
import * as React from 'react';
import { useQuery } from 'urql';
import Flashcard from '../../components/flashcard/Flashcard';
import StudyDeck from '../../components/studydeck/StudyDeck';
import AddIcon from '@mui/icons-material/Add';

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
    // const [result, reexecuteQuery] = useQuery({
    //     query: CardsQuery
    // });
    // const { data, fetching, error } = result;

    // if (fetching) return <p>Loading...</p>;
    return (
        <div className="mt-2">
            <Typography>Your Study Decks</Typography>
            <Typography>new study deck</Typography>
            <div className="flex justify-start items-center">
                <StudyDeck studyDeckID={1}>
                    <div className="flex justify-center items-center h-full cursor-pointer">
                        <Typography className="">COMP 250</Typography>
                    </div>
                </StudyDeck>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
            {/* <div>
                {error
                    ? error.message
                    : data.allQuestions.edges[0].node.questionText}
            </div> */}
        </div>
    );
}

export default StudyDecksIndex;
