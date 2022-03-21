import React from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../../components/flashcard/Flashcard';

StudyDeck.propTypes = {};

function StudyDeck(props) {
    return (
        <div className="flex w-full">
            <Flashcard></Flashcard>
            <Flashcard></Flashcard>
            <Flashcard></Flashcard>
        </div>
    );
}

export default StudyDeck;
