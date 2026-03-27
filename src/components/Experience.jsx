import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import './Experience.css';

const experiences = [
    {
        role: 'Software Development Engineer',
        company: 'Amazon',
        period: 'Dec 2025 - Present',
        description: 'Orchestrated the cross-regional migration of Autopay’s AWS microservices from Dublin to India. Optimized distributed system performance with region-specific configurations, reducing end-to-end latency by 70% for Indian users. Ensured high availability and fault tolerance during large-scale data migrations.',
        techStack: ['Java', 'AWS', 'Microservices', 'Distributed Systems']
    },
    {
        role: 'Software Engineering Intern',
        company: 'Google',
        period: 'Jan 2025 - Jul 2025',
        description: 'Developed a workflow interface within Symphony, integrating Gemini AI to automate workflow generation and explanations, reducing new hire onboarding time by 60%. Designed and deployed a full-stack service from scratch in TypeScript, Python, and Java to integrate AI models, establishing a scalable foundation for future initiatives.',
        techStack: ['TypeScript', 'Python', 'Java', 'Gemini AI']
    },
    {
        role: 'ML Summer School Scholar',
        company: 'Amazon',
        period: 'Jun 2024 - Jul 2024',
        description: 'Gained in-depth knowledge of advanced machine learning algorithms, model optimization, and industry applications. Developed hands-on experience by applying ML techniques to solve complex real-world problems.',
        techStack: ['Machine Learning', 'Python', 'Data Science']
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section relative">
            <div className="glow glow-3"></div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center md:text-left"
                >
                    <h2 className="section-title">Work <span className="gradient-text">Experience</span></h2>
                    <p className="section-subtitle mx-auto md:mx-0">
                        My professional journey and the companies I've had the pleasure to work with.
                    </p>
                </motion.div>

                <div className="timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="timeline-item"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="timeline-dot">
                                <Briefcase size={16} />
                            </div>

                            <div className="timeline-content glass-panel">
                                <div className="timeline-header">
                                    <div>
                                        <h3 className="timeline-role">{exp.role}</h3>
                                        <h4 className="timeline-company">{exp.company}</h4>
                                    </div>
                                    <div className="timeline-period">
                                        <Calendar size={14} />
                                        <span>{exp.period}</span>
                                    </div>
                                </div>

                                <p className="timeline-description">{exp.description}</p>

                                <div className="timeline-tech">
                                    {exp.techStack.map(tech => (
                                        <span key={tech} className="tech-badge">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
