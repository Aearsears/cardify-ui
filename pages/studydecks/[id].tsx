import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Flashcard from '../../components/flashcard/Flashcard';
import { Card } from '../../interfaces';
import { IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
StudyDeck.propTypes = {};

function StudyDeck(props) {
    // get deck info from backend api
    return (
        <div>
            <Typography>Title</Typography>
            <div>edit cards</div>
            <div>start studying right hand side pane</div>
        </div>
    );
}
export default StudyDeck;
