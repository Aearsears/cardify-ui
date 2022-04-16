import { Box, Button, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useContext } from 'react';
import ColourModeContext from '../../styles/ColourModeContext';
import HPAnimation from './HPAnimation';

import styles from './Homepage.module.css';

import results_dark from '../../public/homepage/results_dark.png';
import results_light from '../../public/homepage/results_light.png';
import exam_dark from '../../public/homepage/exam_dark.png';
import exam_light from '../../public/homepage/exam_light.png';

import BoltSharpIcon from '@mui/icons-material/BoltSharp';
import BorderColorSharpIcon from '@mui/icons-material/BorderColorSharp';
import SettingsSharpIcon from '@mui/icons-material/SettingsSharp';
import SendIcon from '@mui/icons-material/Send';
import Emoji from '../Emoji';
import HPCodeBlock from './HPCodeBlock';

//https://codepen.io/SoorajSnBlz/pen/LYZGjBj
class Lightning {
    start: {};
    end: {};
    thickness: number;
    opacity: number;
    constructor(x1, y1, x2, y2, thickness, opacity) {
        this.start = { x1, y1 };
        this.end = { x2, y2 };
        this.thickness = thickness;
        this.opacity = opacity;
    }
    draw() {
        return line(this.start, this.end, this.thickness, this.opacity);
    }

    static getRandomFloat = function (min, max) {
        const random = Math.random() * (max - min + 1) + min;
        return random;
    };

    static getRandomInteger = function (min, max) {
        return Math.floor(Lightning.getRandomFloat(min, max));
    };
}

function lightningAnim() {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const lightningStrikeOffset = 5;
    const lightningStrikeLength = 100;
    const lightningBoltLength = 5;
    const lightningThickness = 4;
    const canvasHeight = 200;
    const canvasWidth = 200;

    const clearCanvas = function (x, y, height, width) {
        rectX = x || 0;
        rectY = y || 0;
        rectHeight = height || canvasHeight;
        rectWidth = width || canvasWidth;
        context.clearRect(rectX, rectY, rectWidth, rectHeight);
        context.beginPath();
    };

    const line = function (start, end, thickness, opacity) {
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

    const interval = 3000;
    // const lightningStrikeOffset = 5;
    // const lightningStrikeLength = 100;
    // const lightningBoltLength = Math.random() * 10;
    // const lightningThickness = 4;
    let lightning = [];

    const createLightning = function () {
        lightning = [];
        let lightningX1 = getRandomInteger(2, canvasWidth - 2);
        let lightningX2 = getRandomInteger(
            lightningX1 - lightningStrikeOffset,
            lightningX1 + lightningStrikeOffset
        );
        lightning[0] = new Lightning(
            lightningX1,
            0,
            lightningX2,
            lightningBoltLength,
            lightningThickness,
            1
        );
        for (let l = 1; l < lightningStrikeLength; l++) {
            let lastBolt = lightning[l - 1];
            let lx1 = lastBolt.end.x;
            let lx2 = getRandomInteger(
                lx1 - lightningStrikeOffset,
                lx1 + lightningStrikeOffset
            );
            lightning.push(
                new Lightning(
                    lx1,
                    lastBolt.end.y,
                    lx2,
                    lastBolt.end.y + lightningBoltLength,
                    lastBolt.thickness,
                    lastBolt.opacity
                )
            );
        }
    };

    const setup = function () {
        createLightning();
        for (let i = 0; i < lightning.length; i++) {
            lightning[i].draw();
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
            lightning[i].draw();
        }

        requestAnimationFrame(animate);
    };

    setup();
    requestAnimationFrame(animate);
    setInterval(function () {
        createLightning();
    }, interval);
}

function Homepage(props) {
    const { darkMode } = useContext(ColourModeContext);
    return (
        <div className="block">
            <div className={`${styles.bg} p-4`}>
                <Typography variant="h2" className="text-center ">
                    Turn your notes into study cards in a flash
                </Typography>
                <div className="grid grid-flow-row grid-cols-2">
                    <HPAnimation></HPAnimation>
                    <HPCodeBlock></HPCodeBlock>
                </div>
                <canvas id="canvas"></canvas>
            </div>
            <Divider light variant="middle" />
            <div className={`${styles.section} h-full mt-4 flex items-center`}>
                <div className="w-6/12 h-6/12 flex items-center justify-center">
                    <Image
                        src={darkMode ? exam_dark : exam_light}
                        placeholder="blur"
                    ></Image>
                </div>
                <div className="text">
                    <Typography variant="h3" className="text-center">
                        Study more efficiently by leveraging state of the art
                        A.I.
                    </Typography>
                    <Typography variant="h6" className="text-center">
                        Save time, money and beat the competition.
                    </Typography>
                </div>
            </div>
            <Divider light variant="middle" />
            <div className={`${styles.section} h-full mt-4 flex items-center`}>
                <div className="text">
                    <Typography variant="h3" className="text-center">
                        Proven results. Great satification.
                    </Typography>
                    <Typography variant="h6" className="text-center">
                        Get the results you want. <br></br>Flashcard will help
                        you retain up to 75% more information.
                    </Typography>
                </div>
                <div className="w-6/12 h-6/12 flex items-center justify-center">
                    <Image
                        src={darkMode ? results_dark : results_light}
                        height="1200"
                        width="1600"
                        placeholder="blur"
                    ></Image>
                </div>
            </div>
            <Divider light variant="middle" />
            <div className="section h-full mt-4">
                <div className="text">
                    <Typography variant="h3" className="text-center">
                        Cardify's ecosystem synergizes well with students and
                        professors alike.
                    </Typography>
                </div>
                <div className="flex items-center">
                    <div className="w-6/12 h-6/12 flex items-center justify-center flex-wrap flex-row">
                        <BoltSharpIcon
                            sx={{ fontSize: 350 }}
                            color="secondary"
                        ></BoltSharpIcon>
                        <Typography className="text-center" component="div">
                            Lightning fast creation of flash card so you are up
                            and running in seconds.
                        </Typography>
                    </div>
                    <div className="w-6/12 h-6/12 flex items-center justify-center flex-wrap flex-row">
                        <BorderColorSharpIcon
                            sx={{ fontSize: 350 }}
                            color="secondary"
                        ></BorderColorSharpIcon>
                        <Typography className="text-center" component="div">
                            Focus on taking high quality notes.
                        </Typography>
                    </div>
                    <div className="w-6/12 h-6/12 flex items-center justify-center flex-wrap flex-row">
                        <SettingsSharpIcon
                            sx={{ fontSize: 350 }}
                            color="secondary"
                        ></SettingsSharpIcon>
                        <Typography className="text-center" component="div">
                            Easy setup and supports multiple study decks.
                        </Typography>
                    </div>
                </div>
            </div>
            <Divider light variant="middle" />
            <div className={`${styles.section} h-full mt-4`}>
                <div className="text">
                    <Typography variant="h3" className="text-center">
                        Ready for{' '}
                        <Box component="span" fontStyle="italic">
                            speed?
                        </Box>{' '}
                        <Emoji label="car" symbol="🏎️"></Emoji>
                    </Typography>{' '}
                    <div className="flex items-center justify-center m-2">
                        <Button
                            variant="contained"
                            className={`${styles.anim} text-center`}
                            endIcon={<SendIcon></SendIcon>}
                        >
                            Sign up
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
