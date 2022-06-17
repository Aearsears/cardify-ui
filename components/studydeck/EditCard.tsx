import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditCard.module.css';
import { Paper, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import Spinner from '../Spinner';
import InlineEdit from './InlineEdit';
import { useMutation } from 'urql';
EditCard.propTypes = {};

interface Props {
    question?: string;
    answer?: string;
    cardId?: string;
}

const UpdateCardMutation = `
mutation updateCard($input:CardInput!){
  updateCard(cardInput:$input){
    card{
        questionText
        answerText
    }
  }
}
`;
function EditCard(props: Props) {
    const [isSaving, setSaving] = useState(false);
    const [error, setError] = useState(false);
    const [hasSavedOnce, setHasSavedOnce] = useState(false);
    const [answer, setAnswer] = useState(props.answer);
    const [question, setQuestion] = useState(props.question);
    const [mutationResult, executeMutation] = useMutation(UpdateCardMutation);
    const mountedRef = useRef(null);

    const updateCard = (
        questionText: string,
        answerText: string,
        cardId: string
    ) => {
        const variables = { input: { questionText, answerText, cardId } };
        return executeMutation(variables);
    };

    useEffect(() => {
        if (isSaving) {
            setHasSavedOnce(true);
            updateCard(
                question,
                answer,
                Buffer.from(props.cardId, 'base64')
                    .toString('ascii')
                    .split(':')[1]
            ).then((result) => {
                console.log(result);
                if (result.error) {
                    setError(true);
                }
                //in case of retries
                else {
                    setError(false);
                }
                setSaving(false);
            });
        } else {
        }
    }, [isSaving]);

    return (
        <Paper className={styles.wrapper} ref={mountedRef}>
            <div className="text-gray-400 ml-1">
                {hasSavedOnce ? (
                    isSaving ? (
                        <span>
                            <Spinner size={20}></Spinner>Saving
                        </span>
                    ) : error ? (
                        <span>
                            <ErrorIcon></ErrorIcon>
                            Something went wrong, please try again.
                        </span>
                    ) : (
                        <span>
                            <CheckIcon></CheckIcon>
                            Saved
                        </span>
                    )
                ) : null}
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    Q:
                </Typography>
                <InlineEdit
                    value={question || ''}
                    setValue={setQuestion}
                    setSaving={setSaving}
                ></InlineEdit>
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    A:
                </Typography>
                <InlineEdit
                    value={answer || ''}
                    setValue={setAnswer}
                    setSaving={setSaving}
                ></InlineEdit>
            </div>
        </Paper>
    );
}

export default EditCard;
