import React, { ChangeEventHandler, useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Typography
} from '@mui/material';

AddAICardDialog.propTypes = {};
interface Props {
    open: boolean;
    setOpen: (state: boolean) => void;
    dialogText: String;
    setDialogText: (text: string) => void;
    handleGo: () => void;
}
function AddAICardDialog(props: Props) {
    const handleClose = () => {
        props.setOpen(false);
        props.setDialogText('');
    };

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setDialogText(e.target.value);
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
                        multiline
                        margin="dense"
                        id="name"
                        label="Text"
                        type="text"
                        fullWidth
                        variant="standard"
                        color="error"
                        value={props.dialogText}
                        onChange={handleTextFieldChange}
                    />
                    <DialogContentText color="info">
                        Current number of characters:{' '}
                        <span
                            className={
                                props.dialogText.length > 500
                                    ? 'text-red-500'
                                    : ''
                            }
                        >
                            {props.dialogText.length}
                        </span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="info">
                        Cancel
                    </Button>
                    <Button
                        onClick={props.handleGo}
                        color="info"
                        disabled={props.dialogText.length > 500}
                    >
                        Go!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddAICardDialog;
