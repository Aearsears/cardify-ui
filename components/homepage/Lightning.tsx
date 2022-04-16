import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Lightning.module.css';

Lightning.propTypes = {};

const getRandomInteger = function (min, max) {
    return Math.floor(getRandomFloat(min, max));
};

const getRandomFloat = function (min, max) {
    const random = Math.random() * (max - min + 1) + min;
    return random;
};

const getPixelRatio = (context) => {
    let backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;

    return (window.devicePixelRatio || 1) / backingStore;
};

interface Lightning {
    start: { x: number; y: number };
    end: { x: number; y: number };
    thickness: number;
    opacity: number;
    draw: (
        start: { x: number; y: number },
        end: { x: number; y: number },
        thickness: number,
        opacity: number
    ) => void;
}
interface Props {
    className?: string;
}
function Lightning(props: Props) {
    let ref = useRef<HTMLCanvasElement>();

    useEffect(() => {
        let canvas = ref.current;
        let context = canvas.getContext('2d');
        let lightning: Lightning[] = [];
        let requestId: number;

        const lightningStrikeOffset = 5;
        const lightningStrikeLength = 100;
        const lightningBoltLength = 5;
        const lightningThickness = 4;
        const interval = 1000;

        const ratio = getPixelRatio(context);
        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);
        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
        canvas.width = Number(width) * ratio;
        canvas.height = Number(height) * ratio;

        const clearCanvas = function (
            x?: number,
            y?: number,
            height?: number,
            width?: number
        ) {
            let rectX = x || 0;
            let rectY = y || 0;
            let rectHeight = height || canvas.height;
            let rectWidth = width || canvas.width;
            context.clearRect(rectX, rectY, rectWidth, rectHeight);
            context.beginPath();
        };

        const line = function (
            start: { x: number; y: number },
            end: { x: number; y: number },
            thickness: number,
            opacity: number
        ) {
            context.beginPath();
            context.moveTo(start.x, start.y);
            context.lineTo(end.x, end.y);
            context.lineWidth = thickness;
            context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            context.shadowBlur = 30;
            context.shadowColor = '#bd9df2';
            context.stroke();
            context.closePath();
        };
        const createLightning = function () {
            lightning = [];
            let lightningX1 = getRandomInteger(2, canvas.width - 2);
            let lightningX2 = getRandomInteger(
                lightningX1 - lightningStrikeOffset,
                lightningX1 + lightningStrikeOffset
            );
            lightning[0] = {
                start: { x: lightningX1, y: 0 },
                end: { x: lightningX2, y: lightningBoltLength },
                thickness: lightningThickness,
                opacity: 1,
                draw: line
            };
            for (let l = 1; l < lightningStrikeLength; l++) {
                let lastBolt = lightning[l - 1];
                let lx1 = lastBolt.end.x;
                let lx2 = getRandomInteger(
                    lx1 - lightningStrikeOffset,
                    lx1 + lightningStrikeOffset
                );
                lightning.push({
                    start: {
                        x: lx1,

                        y: lastBolt.end.y
                    },
                    end: { x: lx2, y: lastBolt.end.y + lightningBoltLength },
                    thickness: lastBolt.thickness,
                    opacity: lastBolt.opacity,
                    draw: line
                });
            }
        };
        const setup = function () {
            createLightning();
            for (let i = 0; i < lightning.length; i++) {
                let l = lightning[i];
                l.draw(l.start, l.end, l.thickness, l.opacity);
            }
        };

        const animate = function () {
            clearCanvas();

            for (let i = 0; i < lightning.length; i++) {
                lightning[i].opacity -= 0.01;
                lightning[i].thickness -= 0.05;
                if (lightning[i].thickness <= 2) {
                    lightning[i].end.y -= 0.05;
                }
                let l = lightning[i];
                l.draw(l.start, l.end, l.thickness, l.opacity);
            }

            requestId = requestAnimationFrame(animate);
        };

        setup();
        requestAnimationFrame(animate);
        setInterval(function () {
            createLightning();
        }, interval);

        return () => {
            cancelAnimationFrame(requestId);
        };
    });
    return (
        <canvas
            ref={ref}
            className={`${props.className} ${styles.lightning}`}
        ></canvas>
    );
}

export default Lightning;
