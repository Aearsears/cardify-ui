import { Button, Fab, Typography } from '@mui/material';
import * as React from 'react';
import { useMutation, useQuery } from 'urql';
import StudyDeck from '../../components/studydeck/StudyDeck';

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
const QuestionCreate = `
mutation createq{
  questionCreate(input:{questionText:"first question",createdDate:"2022-05-03T21:18:25+00:00"}){
    ok
    errors{
      messages
    }
    result{
      id
    }
  }
}
`;
function StudyDecksIndex(props: Props) {
    // const [result, reexecuteQuery] = useQuery({
    //     query: CardsQuery
    // });
    // const { data, fetching, error } = result;

    // if (fetching) return <p>Loading...</p>;
    // const [addquestionresult, addQuestion] = useMutation(QuestionCreate);
    // addQuestion().then((res) => {
    //     if (res.error) {
    //         console.error('Oh no!', res.error);
    //     }
    //     console.log(res);
    //     return;
    // });
    return (
        <div className="mt-2">
            <Typography>Your Study Decks</Typography>
            <Button variant="contained" style={{ textTransform: 'none' }}>
                New study deck
            </Button>
            <div className="flex justify-center items-center">
                <StudyDeck studyDeckID={1}>
                    <div className="flex justify-center items-center h-full cursor-pointer">
                        <Typography className="">COMP 250</Typography>
                    </div>
                </StudyDeck>
                <StudyDeck studyDeckID={1}>
                    <div className="flex justify-center items-center h-full cursor-pointer">
                        <Typography className="">COMP 250</Typography>
                    </div>
                </StudyDeck>
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
