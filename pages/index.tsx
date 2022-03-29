import Head from 'next/head';
import React from 'react';
import Homepage from '../components/homepage/Homepage';

interface Props {
    title: string;
}

const IndexPage = ({ title = 'Cardify' }) => (
    <React.Fragment>
        <Head>
            <title>{title}</title>
        </Head>
        <Homepage></Homepage>
    </React.Fragment>
);

export default IndexPage;
