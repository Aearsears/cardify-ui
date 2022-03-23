import React, { useState } from 'react';
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
    const [animated, setAnimated] = useState(false);

    return (
        <Paper
            elevation={3}
            className={`${animated ? styles.animation : ''} ${styles.one}`}
            onMouseEnter={() => setAnimated(() => true)}
            onAnimationEnd={() => setAnimated(() => false)}
        >
            <Paper
                elevation={6}
                className={`${animated ? styles.animation : ''} ${styles.two}`}
            >
                <Paper
                    elevation={12}
                    className={`${animated ? styles.animation : ''} ${
                        styles.three
                    }`}
                >
                    <Paper
                        elevation={24}
                        className={`${animated ? styles.animation : ''} ${
                            styles.four
                        }`}
                    >
                        <Link href="/studydecks/1">{props.children}</Link>
                    </Paper>
                </Paper>
            </Paper>
        </Paper>
    );
}

export default StudyDeck;
