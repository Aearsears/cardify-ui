import { useTheme } from '@mui/material';
import React from 'react';
import styles from './Spinner.module.css';
interface Props {
    color?: string;
    size: number;
    className?: string;
    style?: {};
}
export default function Spinner({ color, size = 40, className, style }: Props) {
    const theme = useTheme();
    const circles = [...Array(4)].map((_, index) => {
        return (
            <div
                key={index}
                style={{
                    borderColor: `${
                        color ? color : theme.palette.primary.main
                    } transparent transparent transparent`,
                    width: size * 0.8,
                    height: size * 0.8,
                    margin: size * 0.1,
                    borderWidth: size * 0.1
                }}
            ></div>
        );
    });

    return (
        <div
            className={`${styles.ldsring}`}
            style={{ width: size, height: size, ...style }}
        >
            {circles}
        </div>
    );
}
