import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Close the mobile menu if the viewport grows past 720px while it's open
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 940) {
                setMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent background scroll while the full-screen mobile menu is open
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const navLinks = [
        { href: '/resources', label: 'Resources' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/about', label: 'About' },
    ];

    return (
        <>
            <header className="p-4 top-0 fixed z-50 w-full">
                <nav id="navbar" className="max-w-340 flex items-center mx-auto w-full p-1 pl-8 pr-8 bg-(--brand-primary-neutral)/50 backdrop-blur-3xl brightness-110">
                    <a href="/" className="logo-container flex flex-row gap-3 items-center p-3.5">
                        <img src="/assets/logo.png" alt="Vikings Robotics Logo" className="xl:w-15 w-12" />
                        <h3 className="text-(--brand-primary-black) xl:leading-14 leading-8">Vikings Robotics</h3>
                    </a>

                    {/* Desktop nav — hidden below 940px */}
                    <ul className="hidden min-[940px]:flex gap-10 items-center ml-auto p-3.5">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}><a className="nav-link" href={href}>{label}</a></li>
                        ))}
                        <motion.a whileHover={{ scale: 1.1, transition: 0.5 }} whileTap={{ scale: 0.95 }} transition={{ duration: 0.2 }} href="https://forms.gle/RuNvWXXtucnL5UcZ9" target="_blank" rel="noopener noreferrer" id="join-btn" className="bg-(--brand-primary-red) text-(--brand-primary-neutral) pt-2 pb-2 pl-6 pr-6 rounded-xl">
                            Join Us!
                        </motion.a>
                    </ul>

                    {/* Hamburger — shown below 940px only */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="min-[940px]:hidden ml-auto p-3.5 cursor-pointer flex flex-col gap-1.5 w-13" aria-label="Toggle menu" aria-expanded={menuOpen}>
                        <motion.span animate={{rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0}} className="block h-0.5 w-full bg-(--brand-primary-black)" />
                        <motion.span animate={{opacity: menuOpen ? 0 : 1}} className="block h-0.5 w-full bg-(--brand-primary-black)" />
                        <motion.span animate={{rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0}} className="block h-0.5 w-full bg-(--brand-primary-black)" />
                    </button>
                </nav>
            </header>

            {/* Full-screen sticky mobile dropdown */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.2}} className="min-[940px]:hidden fixed inset-0 z-40 bg-(--brand-primary-neutral) flex flex-col justify-center pt-30">
                        <ul className="flex flex-col flex-1 w-full">
                            {navLinks.map(({ href, label }) => (
                                <li key={href} className="w-full flex flex-1">
                                    <motion.a href={href} onClick={() => setMenuOpen(false)} initial={{backgroundColor: "rgba(0, 0, 0, 0)"}} whileHover={{backgroundColor: "rgba(24, 24, 17, 0.08)"}} transition={{duration: 0.2}} className="flex w-full text-center py-12 text-(--brand-primary-black) bg-(--brand-primary-neutral) h-full items-center justify-center">{label}</motion.a>
                                </li>
                            ))}
                            <li className="w-full flex flex-1">
                                <motion.a href="https://forms.gle/RuNvWXXtucnL5UcZ9" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} whileHover={{backgroundColor: "rgba(24, 24, 17, 1)"}} className="w-full text-center bg-(--brand-primary-red) text-(--brand-primary-neutral)! py-3 h-full items-center flex justify-center">Join Us!</motion.a>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;