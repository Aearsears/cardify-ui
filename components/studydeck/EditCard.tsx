import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditCard.module.css';
import { Paper } from '@mui/material';
import InlineEdit from './InlineEdit';
EditCard.propTypes = {};

interface Props {
    question: string;
    answer: string;
    context: string;
}
function Row(prop: { question: string }) {
    return <div>Q : {prop.question}</div>;
}
function EditCard(props: Props) {
    const question = InlineEdit(
        Row({ question: 'What is the united Staets?' }),
        false
    );
    return (
        <Paper className={styles.wrapper}>
            <div>Q : {props.question}</div>
            <div>A : {props.answer}</div>
            <div>Context:{props.context}</div>
        </Paper>
    );
}

export default EditCard;
