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
import Lightning from './Lightning';

function Homepage(props) {
    const { darkMode } = useContext(ColourModeContext);
    return (
        <div className="block">
            <div className={`${styles.bg} p-4 relative h-96`}>
                <div className="mb-4">
                    <Typography variant="h2" className="text-center">
                        Turn your notes into study cards in a flash
                        <Emoji label="lightning" symbol="⚡"></Emoji>
                    </Typography>
                </div>
                <div className="grid grid-flow-row grid-cols-2">
                    <HPAnimation></HPAnimation>
                    <HPCodeBlock></HPCodeBlock>
                </div>
                <Lightning className="w-full h-full absolute top-0 right-0"></Lightning>
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
