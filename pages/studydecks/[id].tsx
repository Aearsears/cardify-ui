import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import EditCard from '../../components/studydeck/EditCard';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import AddCardsButton from '../../components/studydeck/AddCardsButton';
import { useMutation, useQuery } from 'urql';
import { Card } from '../../interfaces';
import AddAICardDialog from '../../components/studydeck/AddAICardDialog';

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

    const subscribeWS = () => {
        const ws = new WebSocket('ws://localhost:4000/ws/cards/');
        const id = '54';
        ws.onmessage = (event) => {
            let message = JSON.parse(event.data);
            console.log(message);
            if (message.message === id) {
                fetcher('http://localhost:4000/qareceive', id).then((res) => {
                    console.log(res);
                });
                ws.close();
            }
        };
        ws.onopen = () => {
            ws.send('{"message":"hello"}');
        };
    };

    const addAICard = () => {
        setOpenDialog(true);
    };

    const addCard = (
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
        addCard('question', 'answer', id as string);
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
                <AddCardsButton
                    subscribeWS={addAICard}
                    addEmptyCard={addEmptyCard}
                ></AddCardsButton>
                <AddAICardDialog
                    open={openDialog}
                    setOpen={setOpenDialog}
                ></AddAICardDialog>
            </div>
        </div>
    );
}
export default StudyDeck;
