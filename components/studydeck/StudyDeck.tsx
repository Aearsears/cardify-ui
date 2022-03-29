import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import Link from 'next/link';
import styles from './StudyDeck.module.css';
import { User } from '../../interfaces/index';

StudyDeck.propTypes = {};
interface Props {
    children?: React.ReactNode;
}
function StudyDeck(props: Props) {
    const [animated, setAnimated] = useState(false);

    const data: User[] = null;
    useEffect(() => {
        fetch('api/users')
            .then((res) => res.json())
            .then((data) => {
                data = data;
            });
    }, []);
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
