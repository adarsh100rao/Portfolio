import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, UploadCloud } from 'lucide-react';
import './ResumeSection.css';

const ResumeSection = () => {
    return (
        <section id="resume" className="section relative">
            <div className="glow glow-4"></div>

            <div className="container relative z-10 w-full max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="resume-container glass-panel"
                >
                    <div className="resume-header">
                        <div className="resume-icon-wrapper">
                            <FileText size={32} className="resume-icon" />
                        </div>
                        <div className="resume-title-group">
                            <h2 className="resume-title">My Resume</h2>
                            <p className="resume-subtitle">Download my latest resume or view details</p>
                        </div>
                    </div>

                    <div className="resume-content">
                        <div className="resume-preview">
                            <div className="preview-skeleton pulse"></div>
                            <div className="preview-skeleton pulse w-3/4"></div>
                            <div className="preview-skeleton pulse w-5/6"></div>
                            <div className="preview-skeleton pulse w-full mt-4 h-24"></div>
                        </div>

                        <div className="resume-actions">
                            <a
                                href="https://drive.google.com/file/d/1XRy-ce6g4FfaZvD3S1oMVe8Ij9nn7eDV/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary w-full"
                            >
                                <Download size={20} />
                                View Resume
                            </a>


                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ResumeSection;
