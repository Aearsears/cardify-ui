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
        <header className="mb-12 pb-12">
            <Navbar></Navbar>
        </header>
        <main className="p-4">{children}</main>
        <MyFooter></MyFooter>
    </div>
);

export default Layout;
