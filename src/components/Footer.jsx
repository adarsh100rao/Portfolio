import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="footer section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h2 className="footer-logo gradient-text">Portfolio.</h2>
                        <p className="footer-description">
                            Building exceptional digital experiences with modern web technologies.
                            Let's create something amazing together.
                        </p>
                    </div>

                    <div className="footer-links-group">
                        <div className="footer-column">
                            <h3 className="footer-heading">Navigation</h3>
                            <ul className="footer-links">
                                <li><a href="#home">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#experience">Experience</a></li>
                                <li><a href="#resume">Resume</a></li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">Connect</h3>
                            <ul className="footer-links">
                                <li>
                                    <a href="#" className="flex items-center gap-2">
                                        <Github size={16} /> GitHub
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-2">
                                        <Linkedin size={16} /> LinkedIn
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:contact@example.com" className="flex items-center gap-2">
                                        <Mail size={16} /> Email
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        &copy; {new Date().getFullYear()} Software Developer. All rights reserved.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="scroll-top"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={20} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
