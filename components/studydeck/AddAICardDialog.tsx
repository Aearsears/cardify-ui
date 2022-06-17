import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions
} from '@mui/material';

AddAICardDialog.propTypes = {};
interface Props {
    open: boolean;
    setOpen: (state: boolean) => void;
}
function AddAICardDialog(props: Props) {
    const handleClose = () => {
        props.setOpen(false);
    };
    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>A.I produced cards</DialogTitle>
                <DialogContent>
                    <DialogContentText color="info">
                        Enter in your text below.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Text"
                        fullWidth
                        variant="standard"
                        color="error"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="info">
                        Go!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddAICardDialog;
