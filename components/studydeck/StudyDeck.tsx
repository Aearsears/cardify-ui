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
    // need to finish animation if started on hover and user moves mouse away
    return (
        <Paper elevation={3} className={`${styles.animation} ${styles.one}`}>
            <Paper
                elevation={6}
                className={`${styles.animation} ${styles.two}`}
            >
                <Paper
                    elevation={12}
                    className={`${styles.animation} ${styles.three}`}
                >
                    <Paper
                        elevation={24}
                        className={`${styles.animation} ${styles.four}`}
                    >
                        <Link href="/studydecks/1">{props.children}</Link>
                    </Paper>
                </Paper>
            </Paper>
        </Paper>
    );
}

export default StudyDeck;
