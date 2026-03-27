import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Mail } from 'lucide-react';
import './Navbar.css';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Profiles', href: '#achievements' },
    { name: 'Resume', href: 'https://drive.google.com/file/d/1XRy-ce6g4FfaZvD3S1oMVe8Ij9nn7eDV/view?usp=sharing', external: true },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
            <div className="navbar-container">
                <a href="#home" className="logo">
                    <span className="gradient-text">Portfolio.</span>
                </a>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <a 
                                    href={link.href} 
                                    className="nav-link"
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="social-links">
                        <a href="https://www.linkedin.com/in/adarsh100rao/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn"><Linkedin size={20} /></a>
                        <a href="mailto:adarsh100rao@gmail.com" className="social-icon" aria-label="Email"><Mail size={20} /></a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="mobile-menu glass-panel"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ul className="mobile-nav-links">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="mobile-nav-link"
                                        onClick={() => setIsOpen(false)}
                                        target={link.external ? "_blank" : undefined}
                                        rel={link.external ? "noopener noreferrer" : undefined}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mobile-social-links">
                            <a href="https://www.linkedin.com/in/adarsh100rao/" target="_blank" rel="noopener noreferrer" className="social-icon"><Linkedin size={20} /></a>
                            <a href="mailto:adarsh100rao@gmail.com" className="social-icon"><Mail size={20} /></a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
