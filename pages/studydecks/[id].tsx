import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, LinearProgress, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import EditCard from '../../components/studydeck/EditCard';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import AddCardsButton from '../../components/studydeck/AddCardsButton';
import { useMutation, useQuery } from 'urql';
import AddAICardDialog from '../../components/studydeck/AddAICardDialog';
import { v4 as uuidv4 } from 'uuid';

StudyDeck.propTypes = {};

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

const AddCardMutation = `
mutation createCard($input:CardInput!){
  createCard(cardInput:$input){
    card{
      id
    }
  }
}
`;
// react renders component every time there is a state change, need to see where improvements can be made
function StudyDeck(props) {
    const router = useRouter();
    const { id } = router.query;

    const [mutationResult, executeMutation] = useMutation(AddCardMutation);
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [tempQuestions, setTempQuestions] = useState<
        { question: string; answer: string }[][]
    >([]);
    // get deck info from backend api
    const [result, reexecuteQuery] = useQuery({
        query: CardsQuery,
        variables: { id },
        pause: true
    });
    const { data: cardsdata, fetching, error } = result;
    useEffect(() => {
        if (router.isReady) {
            console.log('in the [id] page');

            reexecuteQuery();
        }
    }, [router.isReady]);

    if (fetching) {
        return <Spinner size={20}></Spinner>;
    }
    if (error) {
        console.log(error);

        return <div>There was an error.</div>;
    }
    if (cardsdata?.length == 0) {
        return <div>No data.</div>;
    }
    console.log(cardsdata);

    const fetcher = (url: string, id: string) =>
        fetch(url + `?id=${id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());

    const addAICard = () => {
        setOpenDialog(true);
    };

    const addOneCard = (
        questionText: string,
        answerText: string,
        deckId: string
    ) => {
        const variables = { input: { questionText, answerText, deckId } };
        executeMutation(variables).then((result) => {
            reexecuteQuery();
        });
    };

    const addEmptyCard = () => {
        // need to add empty card to deck
        addOneCard('question', 'answer', id as string);
    };
    const handleGo = () => {
        //get the text from dialog text
        //add to the end of the notes a sentence indicating the id of the text
        let qa = [];
        const qaid = uuidv4();
        const sentence = 'The request id is ' + qaid + '.';
        const mssg = encodeURIComponent(dialogText + sentence);
        // then call the fucntion subscribe to the ws backend with the id
        const ws = new WebSocket('ws://localhost:4000/ws/cards/');
        ws.onmessage = (event) => {
            let message = JSON.parse(event.data);
            console.log(message);
            if (message.message === qaid) {
                //wait for the backend to issue a message with the id and then get the q and a.
                fetcher('http://localhost:4000/qareceive', qaid).then((res) => {
                    qa = res;
                    //create the cards from the q and a.
                    qa.forEach((item) => {
                        const variables = {
                            input: {
                                questionText: item.question,
                                answerText: item.answer,
                                deckId: id
                            }
                        };
                        executeMutation(variables).then((result) => {});
                        console.log(item);
                    });
                    setLoading(false);
                    ws.close();
                });
            }
            //case where the AI did not generate a question for the id
            else {
                fetcher(
                    'http://localhost:4000/qareceive',
                    message.message
                ).then((res) => {
                    setTempQuestions((ques) => [...ques, res]);
                });
            }
        };
        // post the text to the backend
        fetch('http://localhost:4000/qa', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ text: mssg })
        }).then((res) => res);

        setOpenDialog(false);
        setLoading(true);
        setDialogText('');
    };

    return (
        <div className="mt-2">
            <div>
                <div>
                    <Typography>COMP 250</Typography>
                    <Typography variant="subtitle1">
                        {cardsdata?.deckById.cardSet.edges.length} cards
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
                {cardsdata?.deckById.cardSet.edges.map((card) => {
                    return (
                        <EditCard
                            key={card.node.id}
                            cardId={card.node.id}
                            answer={card.node.answerText}
                            question={card.node.questionText}
                        ></EditCard>
                    );
                })}
            </div>
            <div className="text-center">
                {loading ? <LinearProgress color="secondary" /> : null}
                <AddCardsButton
                    subscribeWS={addAICard}
                    addEmptyCard={addEmptyCard}
                ></AddCardsButton>
                <AddAICardDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                    dialogText={dialogText}
                    setDialogText={setDialogText}
                    handleGo={handleGo}
                ></AddAICardDialog>
            </div>
            <div>
                {tempQuestions.length != 0 ? (
                    <div>
                        <div className="flex">
                            <Typography component="div" className="mr-1">
                                Still don't have your cards? Maybe the Q&amp;A
                                below are yours:
                            </Typography>
                        </div>
                        {tempQuestions.map((qa) => {
                            console.log(qa);

                            return (
                                <div className="m-2">
                                    {qa.map((i) => {
                                        return (
                                            <div>
                                                <Paper className="">
                                                    Question: {i.question}{' '}
                                                    Answer: {i.answer}
                                                </Paper>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
export default StudyDeck;
