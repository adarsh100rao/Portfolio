import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Code2, Database, Layout, Terminal } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero-section">
            {/* Background elements */}
            <motion.div 
                className="glow glow-1"
                animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="glow glow-2"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <div className="container hero-container">
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="badge">Welcome to my portfolio !</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hero-title"
                    >
                        Hi, I'm <br />
                        <span className="gradient-text">Adarsh Rao</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="hero-subtitle"
                    >
                        Software Development Engineer @ Amazon | B.Tech Mathematics & Computing, NIT Hamirpur '25
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="hero-actions"
                    >
                        <a href="https://drive.google.com/file/d/1XRy-ce6g4FfaZvD3S1oMVe8Ij9nn7eDV/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            <Download size={20} />
                            View Resume
                        </a>
                        <a href="#about" className="btn btn-secondary">
                            Know more about me
                            <ArrowRight size={20} />
                        </a>
                    </motion.div>
                </div>

                {/* Right Side Visual */}
                <motion.div 
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className="visual-circle">
                        <div className="floating-icon icon-1">
                            <Code2 size={28} />
                        </div>
                        <div className="floating-icon icon-2">
                            <Database size={28} />
                        </div>
                        <div className="floating-icon icon-3">
                            <Layout size={28} />
                        </div>
                        <div className="floating-icon icon-4">
                            <Terminal size={28} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
