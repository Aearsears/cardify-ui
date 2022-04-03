import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditCard.module.css';
import { Paper } from '@mui/material';
EditCard.propTypes = {};

interface Props {
    question: string;
    answer: string;
    context: string;
}
function EditCard(props: Props) {
    return (
        <Paper className={styles.wrapper}>
            <div>Q : {props.question}</div>
            <div>A : {props.answer}</div>
            <div>Context:{props.context}</div>
        </Paper>
    );
}

export default EditCard;
