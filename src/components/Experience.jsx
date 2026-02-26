import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import './Experience.css';

const experiences = [
    {
        role: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        period: '2021 - Present',
        description: 'Led the development of a high-traffic e-commerce platform. Architected the transition from a monolithic architecture to microservices using Node.js and Docker. Mentored junior developers and established CI/CD best practices.',
        techStack: ['Node.js', 'React', 'Docker', 'AWS']
    },
    {
        role: 'Full Stack Developer',
        company: 'Creative Agency',
        period: '2019 - 2021',
        description: 'Developed and maintained custom web applications for various clients. Improved website performance by 40% through code splitting and lazy loading. Collaborated closely with designers to implement pixel-perfect UIs.',
        techStack: ['Vue.js', 'Express', 'MongoDB', 'Sass']
    },
    {
        role: 'Frontend Developer Intern',
        company: 'Startup Hub',
        period: '2018 - 2019',
        description: 'Assisted in building responsive landing pages and interactive dashboards. Participated in daily stand-ups and code reviews. Gained hands-on experience with modern JavaScript frameworks.',
        techStack: ['React', 'HTML/CSS', 'JavaScript']
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
