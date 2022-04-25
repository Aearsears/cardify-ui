import React, { SetStateAction } from 'react';
import PropTypes from 'prop-types';
import styles from './EditCard.module.css';
import { Paper, Typography } from '@mui/material';
import EditCardRow from './EditCardRow';
EditCard.propTypes = {};

interface Props {
    question?: string;
    answer?: string;
    context?: string;
    setSaving?: React.Dispatch<SetStateAction<boolean>>;
}

function EditCard(props: Props) {
    return (
        <Paper className={styles.wrapper}>
            <div className="flex">
                <Typography component="div" className="py-2">
                    Q:
                </Typography>
                <EditCardRow
                    content={props.question}
                    className="grow"
                    setSaving={props.setSaving}
                ></EditCardRow>
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    A:
                </Typography>
                <EditCardRow
                    content={props.answer}
                    className="grow"
                    setSaving={props.setSaving}
                ></EditCardRow>
            </div>
            <div className="flex">
                <Typography component="div" className="py-2">
                    Context:
                </Typography>
                <EditCardRow
                    content={props.context}
                    className="grow"
                    setSaving={props.setSaving}
                ></EditCardRow>
            </div>
        </Paper>
    );
}

export default EditCard;
