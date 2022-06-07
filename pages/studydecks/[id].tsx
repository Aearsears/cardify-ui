import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import EditCard from '../../components/studydeck/EditCard';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import AddCardsButton from '../../components/studydeck/AddCardsButton';
import { useMutation, useQuery } from 'urql';

StudyDeck.propTypes = {};

const CardsQuery = `
query getDeck($id: Int) {
  deckById(id:$id) {
    cardSet {
      edges {
        node {
          answer {
            answerText
          }
          question {
            questionText
          }
        }
      }
    }
  }
}
`;

function StudyDeck(props) {
    const router = useRouter();
    const { id } = router.query;
    console.log(id);
    // get deck info from backend api
    const [result, reexecuteQuery] = useQuery({
        query: CardsQuery,
        variables: { id }
    });
    const { data, fetching, error } = result;

    if (fetching) {
        return <Spinner size={20}></Spinner>;
    }
    if (error) {
        console.log(error);

        return <div>There was an error.</div>;
    }
    if (data.length == 0) {
        return <div>No data.</div>;
    }
    console.log(data);
    return (
        <div className="mt-2">
            <div>
                <div>
                    <Typography>COMP 250</Typography>
                    <Typography variant="subtitle1">
                        {data.deckById.cardSet.edges.length} cards
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
                {data.deckById.cardSet.edges.map((i) => {
                    return (
                        <EditCard
                            answer={i.node.answer.answerText}
                            question={i.node.question.questionText}
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
