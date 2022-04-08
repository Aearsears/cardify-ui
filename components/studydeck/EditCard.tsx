import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditCard.module.css';
import { Paper } from '@mui/material';
import withInlineEdit from './InlineEdit';
EditCard.propTypes = {};

interface Props {
    question?: string;
    answer?: string;
    context?: string;
}
function Row(props: Props) {
    if (props.question) {
        return <div {...props}>Q : {props.question}</div>;
    }
    if (props.answer) {
        return <div {...props}>A : {props.answer}</div>;
    }
    if (props.context) {
        return <div {...props}>Context : {props.context}</div>;
    }
}
function EditCard(props: Props) {
    const RowInlineEdit = withInlineEdit(Row);

    return (
        <Paper className={styles.wrapper}>
            <RowInlineEdit question={props.question}></RowInlineEdit>
            <RowInlineEdit answer={props.answer}></RowInlineEdit>
            <RowInlineEdit context={props.context}></RowInlineEdit>
        </Paper>
    );
}

export default EditCard;
