import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import Link from 'next/link';
import styles from './StudyDeck.module.css';

StudyDeck.propTypes = {};
interface Props {
    children?: React.ReactNode;
}
function StudyDeck(props: Props) {
    return (
        <Paper elevation={3} className={styles.animation}>
            <Paper elevation={6} className="p-2">
                <Paper elevation={12} className="p-2 h-full">
                    <Paper elevation={24} className="p-2 h-full">
                        <Link href="/studydecks/1">{props.children}</Link>
                    </Paper>
                </Paper>
            </Paper>
        </Paper>
    );
}

export default StudyDeck;
