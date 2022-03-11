import React, { ReactNode } from 'react';
import Link from 'next/link';
import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import { Main } from 'next/document';
import Navbar from './Navbar';

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <div className="layoutWrapper">
        <MyHeader></MyHeader>
        <header>
            <Navbar></Navbar>
        </header>
        <main>{children}</main>
        <MyFooter></MyFooter>
    </div>
);

export default Layout;
