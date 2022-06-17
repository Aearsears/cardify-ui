import React, { ChangeEventHandler, useState } from 'react';
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
    const [userInput, setUserInput] = useState('');

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} fullWidth>
                <DialogTitle>A.I produced cards</DialogTitle>
                <DialogContent>
                    <DialogContentText color="info">
                        Enter in your text below. <br></br>
                        Do not add more than 500 characters.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Text"
                        type="text"
                        fullWidth
                        variant="standard"
                        color="error"
                        value={userInput}
                        onChange={handleTextFieldChange}
                    />
                    <DialogContentText color="info">
                        Current number of characters: {userInput.length}
                    </DialogContentText>
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
