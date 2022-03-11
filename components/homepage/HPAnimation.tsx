import { Typography } from '@mui/material';
import React from 'react';
import TypeIt from 'typeit-react';

function HPAnimation(props) {
    return (
        <div className="hpanimation flex bg-slate-100">
            <div>
                <Typography variant="h6">Step 1</Typography>
                <Typography variant="body1">
                    <TypeIt
                        options={{
                            strings: ['Take notes.'],
                            speed: 100,
                            waitUntilVisible: true,
                            cursor: false,
                            loopDelay: 1000,
                            loop: true,
                            nextStringDelay: 1000,
                            startDelete: true
                        }}
                    />
                </Typography>
            </div>
            <div>
                <Typography variant="h6">Step 2</Typography>
                <Typography variant="body1">
                    <TypeIt
                        options={{
                            strings: ['Copy, paste and enter.'],
                            speed: 100,
                            waitUntilVisible: true,
                            cursor: false,
                            loopDelay: 1000,
                            loop: true,
                            nextStringDelay: 1000,
                            startDelete: true
                        }}
                    />
                </Typography>
            </div>
            <div>
                <Typography variant="h6">Step 3</Typography>
                <Typography variant="body1">
                    <TypeIt
                        options={{
                            strings: ['Start studying!'],
                            speed: 100,
                            waitUntilVisible: true,
                            cursor: false,
                            loopDelay: 1000,
                            loop: true,
                            nextStringDelay: 1000,
                            startDelete: true
                        }}
                    />
                </Typography>
            </div>
        </div>
    );
}

export default HPAnimation;
