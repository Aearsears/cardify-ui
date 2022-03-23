import { Button, Divider, Typography } from '@mui/material';
import React from 'react';
import HPAnimation from './HPAnimation';

function Homepage(props) {
    return (
        <div className="">
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
                <div>left: icon</div>
                <div>some text</div>
            </div>
            <Divider light variant="middle" />
            <div className="section h-96  mt-4">
                <Typography variant="h2" className="text-center ">
                    Turn your notes into study cards in a flash
                </Typography>
                <div>left: text</div>
                <div>right: icon</div>
            </div>
            <Divider light variant="middle" />
            <div className="section h-96  mt-4">
                <Typography variant="h2" className="text-center ">
                    Turn your notes into study cards in a flash
                </Typography>
                <div>icon and text</div>
                <div>icon and text</div>
                <div>icon and text</div>
            </div>
        </div>
    );
}

export default Homepage;
