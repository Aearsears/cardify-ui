import React, { SetStateAction, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditCard.module.css';
import { Paper, Typography } from '@mui/material';
import EditCardRow from './EditCardRow';
import CheckIcon from '@mui/icons-material/Check';
import Spinner from '../Spinner';
import InlineEdit2 from './InlineEdit2';
EditCard.propTypes = {};

interface Props {
    question?: string;
    answer?: string;
    context?: string;
}

function EditCard(props: Props) {
    const [isSaving, setSaving] = useState(false);
    const [answer, setAnswer] = useState(props.answer);
    const [question, setQuestion] = useState(props.question);
    const [context, setContext] = useState(props.context);
    return (
        <Paper className={styles.wrapper}>
            <div className="text-gray-400 ml-1">
                {isSaving ? (
                    <span>
                        <Spinner size={20}></Spinner>Saving
                    </span>
                ) : (
                    <span>
                        <CheckIcon></CheckIcon>
                        Saved
                    </span>
                )}
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    Q:
                </Typography>
                <InlineEdit2
                    value={question}
                    setValue={setQuestion}
                    setSaving={setSaving}
                ></InlineEdit2>
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    A:
                </Typography>
                <InlineEdit2
                    value={answer}
                    setValue={setAnswer}
                    setSaving={setSaving}
                ></InlineEdit2>
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    Context:
                </Typography>
                <InlineEdit2
                    value={context}
                    setValue={setContext}
                    setSaving={setSaving}
                ></InlineEdit2>
            </div>
        </Paper>
    );
}

export default EditCard;
