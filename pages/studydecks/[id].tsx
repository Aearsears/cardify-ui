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
import { Card } from '../../interfaces';
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

const DeleteCardMutation = `
mutation deleteCard($id:ID!){
  deleteCard(id:$id){
    res
  }
}
`;
// react renders component every time there is a state change, need to see where improvements can be made
function StudyDeck(props) {
    const router = useRouter();
    const { id } = router.query;

    const [AddCardMutationResult, executeAddCardMutation] =
        useMutation(AddCardMutation);
    const [DeleteCardMutationResult, executeDeleteCardMutation] =
        useMutation(DeleteCardMutation);

    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dialogText, setDialogText] = useState('');
    const [tempQuestions, setTempQuestions] = useState<Card[][]>([]);
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
        executeAddCardMutation(variables).then((result) => {
            reexecuteQuery({ requestPolicy: 'cache-and-network' });
        });
    };

    const addEmptyCard = () => {
        // need to add empty card to deck
        addOneCard('question', 'answer', id as string);
    };
    const handleGoAI = () => {
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
                        addOneCard(item.question, item.answer, id as string);
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

    const deleteCard = (id: string) => {
        const variables = {
            id: Buffer.from(id, 'base64').toString('ascii').split(':')[1]
        };
        executeDeleteCardMutation(variables).then((result) => {
            reexecuteQuery({ requestPolicy: 'cache-and-network' });
        });
    };

    const noIDHandler = (index: number) => {
        console.log('tempqeust' + index);
        let qa = tempQuestions[index];
        qa.forEach((card) => {
            addOneCard(card.question, card.answer, id as string);
            console.log(card);
        });
        setLoading(false);
        setTempQuestions([]);
        // close ws, need to make ws global maybe?
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
                <div className="cards w-4/6 m-auto">
                    {cardsdata?.deckById.cardSet.edges.map((card) => {
                        return (
                            <EditCard
                                key={card.node.id}
                                cardId={card.node.id}
                                answer={card.node.answerText}
                                question={card.node.questionText}
                                deleteCard={deleteCard}
                            ></EditCard>
                        );
                    })}
                </div>
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
                    handleGo={handleGoAI}
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
                        {tempQuestions.map((qa, index) => {
                            console.log(qa);

                            return (
                                <div className="m-2" key={'outer' + index}>
                                    {qa.map((item) => {
                                        return (
                                            // TODO: fix react unique key bug
                                            <div key={'inner' + index}>
                                                <Paper
                                                    key={'qa' + index}
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        noIDHandler(index);
                                                    }}
                                                >
                                                    Question: {item.question}{' '}
                                                    Answer: {item.answer}
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
