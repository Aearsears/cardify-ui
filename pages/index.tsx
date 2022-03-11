import Head from 'next/head';
import Link from 'next/link';
import Homepage from '../components/homepage/Homepage';
import Layout from '../components/layout/Layout';

interface Props {
    title: string;
}

const IndexPage = ({ title = 'Cardify' }) => (
    <div>
        <Head>
            <title>{title}</title>
        </Head>
        <Homepage></Homepage>
    </div>
);

export default IndexPage;
