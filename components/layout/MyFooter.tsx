import { Divider, Typography } from '@mui/material';
import React from 'react';
import styles from './MyFooter.module.css';

function MyFooter(props) {
    return (
        <footer>
            <Divider></Divider>
            <Typography component="div" className="m-auto">
                <ul className={styles.listInline}>
                    <li className={styles.listInlineItem}>
                        <a href="#">Home</a>
                    </li>
                    <li className={styles.listInlineItem}>
                        <a href="#">Services</a>
                    </li>
                    <li className={styles.listInlineItem}>
                        <a href="#">About</a>
                    </li>
                    <li className={styles.listInlineItem}>
                        <a href="#">Terms</a>
                    </li>
                    <li className={styles.listInlineItem}>
                        <a href="#">Privacy Policy</a>
                    </li>
                </ul>
                <p className="text-center">Cardify © 2022</p>
            </Typography>
        </footer>
    );
}

export default MyFooter;
