import React from 'react';
import Head from 'next/head';

interface Props {
    title?: string;
}

function MyHeader(props: Props) {
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
    );
}

export default MyHeader;
