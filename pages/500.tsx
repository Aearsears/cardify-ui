import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

Custom500.propTypes = {};

function Custom500(props) {
    return (
        <div>
            <Typography className="text-center">
                Server side error. Please try again in a few minutes.
            </Typography>
        </div>
    );
}

export default Custom500;
