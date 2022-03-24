import { Button, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useContext } from 'react';
import ColourModeContext from '../../styles/ColourModeContext';
import HPAnimation from './HPAnimation';

import study_dark from '../../public/homepage/study_dark.png';
import study_light from '../../public/homepage/study_light.png';
import results_dark from '../../public/homepage/results_dark.png';
import results_light from '../../public/homepage/results_light.png';
import exam_dark from '../../public/homepage/exam_dark.png';
import exam_light from '../../public/homepage/exam_light.png';
import calendar_dark from '../../public/homepage/calendar_dark.png';
import calendar_light from '../../public/homepage/calendar_light.png';
import calendar_2_dark from '../../public/homepage/calendar_2_dark.png';
import calendar_2_light from '../../public/homepage/calendar_2_light.png';

function Homepage(props) {
    const { darkMode } = useContext(ColourModeContext);
    return (
        <div className="block">
            <div className="p-4">
                <Typography variant="h2" className="text-center ">
                    Turn your notes into study cards in a flash
                </Typography>
                <HPAnimation></HPAnimation>
                <Button color="primary" variant="contained">
                    test
                </Button>
                <Button color="secondary" variant="contained">
                    test
                </Button>
            </div>
            <Divider light variant="middle" />
            <div className="section h-96 mt-4">
                <Typography variant="h2" className="text-center">
                    Turn your notes into study cards in a flash
                </Typography>
                <div className="w-96 h-96 ">
                    <Image
                        src={darkMode ? exam_dark : exam_light}
                        height="1200"
                        width="1600"
                        placeholder="blur"
                    ></Image>
                </div>
                <div>some text</div>
            </div>
            <Divider light variant="middle" />
            <div className="section h-96  mt-4">
                <Typography variant="h2" className="text-center ">
                    Turn your notes into study cards in a flash
                </Typography>
                <div>left: text</div>
                <div className="w-96 h-96 ">
                    <Image
                        src={darkMode ? results_dark : results_light}
                        height="1200"
                        width="1600"
                        placeholder="blur"
                    ></Image>
                </div>
            </div>
            <Divider light variant="middle" />
            <div className="section h-96  mt-4">
                <Typography variant="h2" className="text-center ">
                    Turn your notes into study cards in a flash
                </Typography>
                <div className="flex">
                    <div className="w-96 h-96 ">
                        <Image
                            src={darkMode ? study_dark : study_light}
                            height="1200"
                            width="1600"
                            placeholder="blur"
                        ></Image>
                    </div>
                    <div className="w-96 h-96 ">
                        <Image
                            src={darkMode ? calendar_dark : calendar_light}
                            height="1200"
                            width="1600"
                            placeholder="blur"
                        ></Image>
                    </div>
                    <div>icon and text</div>
                    <div className="w-96 h-96 ">
                        <Image
                            src={darkMode ? calendar_2_dark : calendar_2_light}
                            height="1200"
                            width="1600"
                            placeholder="blur"
                        ></Image>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
