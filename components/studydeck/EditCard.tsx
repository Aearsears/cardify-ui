import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditCard.module.css';
EditCard.propTypes = {};

interface Props {
    question: string;
    answer: string;
    context: string;
}
function EditCard(props: Props) {
    return (
        <div className={styles.wrapper}>
            <div>Q : {props.question}</div>
            <div>A : {props.answer}</div>
            <div>Context:{props.context}</div>
        </div>
    );
}

export default EditCard;
