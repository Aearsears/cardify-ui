import { Typography } from '@mui/material';
import React, { useState } from 'react';
import TypeIt, { TypeItProps } from 'typeit-react';

function HPAnimation(props) {
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);

    return (
        <div className="hpanimation flex">
            <div>
                <Typography variant="h6">Step 1</Typography>
                <Typography variant="body1">
                    <TypeIt
                        getBeforeInit={(instance) => {
                            instance.type('Take notes.').exec(() => {
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
                </Typography>
            </div>
            <div>
                <Typography variant="h6">Step 2</Typography>
                <Typography
                    variant="body1"
                    className={`${showStep2 ? 'visible' : 'invisible'}`}
                >
                    {showStep2 ? (
                        <TypeIt
                            getBeforeInit={(instance) => {
                                instance
                                    .type('Copy, paste and enter.')
                                    .exec(() => {
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
                </Typography>
            </div>
            <div>
                <Typography variant="h6">Step 3</Typography>
                <Typography
                    variant="body1"
                    className={`${showStep3 ? 'visible' : 'invisible'}`}
                >
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
                </Typography>
            </div>
        </div>
    );
}

export default HPAnimation;
