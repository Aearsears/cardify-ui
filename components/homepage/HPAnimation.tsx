import { Typography } from '@mui/material';
import React, { useState } from 'react';
import TypeIt, { TypeItProps } from 'typeit-react';
import Flashcard from '../flashcard/Flashcard';
import Spinner from '../Spinner';

function HPAnimation(props) {
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);
    const [isFlipped, setFlipped] = useState(false);
    const handleClick = () => {
        setFlipped(!isFlipped);
    };
    return (
        <div className="hpanimation inline-block">
            <div className="text-center">
                <div>
                    <Typography variant="h6">
                        {showStep3 ? 'Step 3' : showStep2 ? 'Step 2' : 'Step 1'}
                    </Typography>
                    {showStep3 ? (
                        <TypeIt
                            options={{
                                strings: ['Start studying!'],
                                speed: 100,
                                waitUntilVisible: true,
                                cursor: false
                            }}
                        />
                    ) : null}
                    {showStep2 ? (
                        <TypeIt
                            getBeforeInit={(instance) => {
                                instance
                                    .type('The AI creates the flashcards.')
                                    .pause(5000)
                                    .exec(() => {
                                        setShowStep2(false);
                                        setShowStep3(true);
                                    });
                                return instance;
                            }}
                            options={{
                                waitUntilVisible: true,
                                cursor: false
                            }}
                        />
                    ) : null}
                    {!showStep2 && !showStep3 ? (
                        <TypeIt
                            getBeforeInit={(instance) => {
                                instance
                                    .type('Take notes.')
                                    .pause(5000)
                                    .exec(() => {
                                        setShowStep2(true);
                                    });
                                return instance;
                            }}
                            options={{
                                speed: 100,
                                waitUntilVisible: true,
                                cursor: false
                            }}
                        />
                    ) : null}
                </div>
            </div>
            <div className="w-full text-center">
                {showStep3 ? (
                    <div className="inline-block">
                        <Flashcard
                            answer="The Straw Hat Pirates"
                            question="Which pirate crew is Luffy part of?"
                            clickHandler={() => handleClick()}
                            flipped={isFlipped}
                            height={200}
                            width={250}
                        ></Flashcard>
                    </div>
                ) : null}
                {showStep2 ? <Spinner size={50}></Spinner> : null}
                {!showStep2 && !showStep3 ? (
                    <code className="bg-gray-300">
                        <TypeIt
                            getBeforeInit={(instance) => {
                                instance
                                    .type(
                                        'Luffy is a member of the Straw Hat Pirates.'
                                    )
                                    .pause(5000)
                                    .exec(() => {
                                        setShowStep2(true);
                                    });
                                return instance;
                            }}
                            options={{
                                speed: 100,
                                waitUntilVisible: true,
                                cursor: false
                            }}
                        />
                    </code>
                ) : null}
            </div>
        </div>
    );
}

export default HPAnimation;
