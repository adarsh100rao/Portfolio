import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal, Users } from 'lucide-react';
import './About.css';

const skills = [
    {
        name: 'Languages',
        icon: <Code2 className="skill-icon" />,
        description: 'Core programming and scripting languages.',
        items: ['C/C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL']
    },
    {
        name: 'Technologies & Frameworks',
        icon: <Layout className="skill-icon" />,
        description: 'Frontend, backend, and cloud architectures.',
        items: ['ReactJS', 'NodeJS', 'Angular', 'AWS', 'Linux', 'Shell Scripting']
    },
    {
        name: 'Core CS Fundamentals',
        icon: <Terminal className="skill-icon" />,
        description: 'Strong foundation in theoretical computer science concepts.',
        items: ['Data Structures', 'Algorithms', 'OOP', 'DBMS', 'OS', 'Networks', 'Machine Learning']
    },
    {
        name: 'Soft Skills',
        icon: <Users className="skill-icon" />,
        description: 'Interpersonal and professional competencies.',
        items: ['Communication', 'Leadership', 'Team Management']
    }
];

const About = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
                    <p className="section-subtitle">
                        I am a Software Development Engineer currently building large-scale production systems at Amazon. 
                        I recently graduated from NIT Hamirpur with a B.Tech in Mathematics and Computing (Class of 2025). 
                        I have a strong passion for solving complex architectural challenges and leveraging AI to streamline workflows.
                    </p>
                </motion.div>

                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="skill-card glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="skill-header">
                                {skill.icon}
                                <h3 className="skill-title">{skill.name}</h3>
                            </div>
                            <p className="skill-description">{skill.description}</p>
                            <ul className="skill-tags">
                                {skill.items.map(item => (
                                    <li key={item} className="skill-tag">{item}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
