import React from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../../components/flashcard/Flashcard';

StudyDeck.propTypes = {};

function StudyDeck(props) {
    return (
        <div className="flex w-full">
            <Flashcard
                question="what is the captial of the USA?"
                answer="Washington"
                context="Geography"
            ></Flashcard>
            <Flashcard></Flashcard>
            <Flashcard></Flashcard>
        </div>
    );
}

export default StudyDeck;
