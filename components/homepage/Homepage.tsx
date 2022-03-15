import { Typography } from '@mui/material';
import React from 'react';
import HPAnimation from './HPAnimation';

function Homepage(props) {
    return (
        <div className="mt-4">
            <Typography variant="h2" className="text-center">
                Turn your notes into study cards in a flash
            </Typography>
            <HPAnimation></HPAnimation>
        </div>
    );
}

export default Homepage;
