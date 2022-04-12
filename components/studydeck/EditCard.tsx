import React from 'react';
import PropTypes from 'prop-types';
import styles from './EditCard.module.css';
import { Paper, Typography } from '@mui/material';
import EditCardRow from './EditCardRow';
EditCard.propTypes = {};

interface Props {
    question?: string;
    answer?: string;
    context?: string;
}

function EditCard(props: Props) {
    return (
        <Paper className={styles.wrapper}>
            <div className="flex">
                <Typography component="div" className="py-2">
                    Q:
                </Typography>
                <EditCardRow content={props.question}></EditCardRow>
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    A:
                </Typography>
                <EditCardRow content={props.answer}></EditCardRow>
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    Context:
                </Typography>
                <EditCardRow content={props.context}></EditCardRow>
            </div>
        </Paper>
    );
}

export default EditCard;
