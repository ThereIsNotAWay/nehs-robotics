import { motion, transform, useMotionValueEvent, useScroll } from 'motion/react';
import { useState, useRef } from 'react';

const Header = () => {
    return (
        <>
            <header className="p-4 top-0 fixed z-50 w-full">
                <nav id="navbar" className="flex items-center w-full p-1 pl-8 pr-8 bg-(--brand-primary-neutral)/50 backdrop-blur-3xl brightness-110">
                    <a href="/" className="logo-container flex flex-row gap-3 items-center p-3.5">
                        <img src="/assets/logo.png" alt="Vikings Robotics Logo" className="w-15"/>
                        <h3 className="text-(--brand-primary-black)">Vikings Robotics</h3>
                    </a>
                    <ul className="flex gap-10 items-center ml-auto p-3.5">
                        <li><a className="nav-link" href="/resources">Resources</a></li>
                        <li><a className="nav-link" href="/gallery">Gallery</a></li>
                        <li><a className="nav-link" href="/about">About</a></li>
                        <motion.a whileHover={{ scale: 1.1, transition: 0.5 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }} href="https://forms.gle/RuNvWXXtucnL5UcZ9" target="_blank" rel="noopener noreferrer" id="join-btn" className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pt-2 pb-2 pl-6 pr-6 rounded-xl">Join Us!</motion.a>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Header;