import React from 'react';
import PropTypes from 'prop-types';
import { Button, TextField, Typography } from '@mui/material';

HPCodeBlock.propTypes = {};

function HPCodeBlock(props) {
    return (
        <div>
            <Typography>Try it out!</Typography>
            <TextField
                id="filled-multiline-static"
                label="Enter in a sentence."
                multiline
                fullWidth
                rows={4}
                defaultValue="Luffy is a member of the Straw Hat Pirates."
                variant="filled"
            />
            <Button color="secondary" variant="contained">
                Create card(s)
            </Button>
        </div>
    );
}

export default HPCodeBlock;
