import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Layout, Terminal } from 'lucide-react';
import './About.css';

const skills = [
    {
        name: 'Frontend Development',
        icon: <Layout className="skill-icon" />,
        description: 'React, Vue, Tailwind CSS, Framer Motion',
        items: ['React.js', 'Next.js', 'HTML5/CSS3', 'JavaScript (ES6+)']
    },
    {
        name: 'Backend Development',
        icon: <Terminal className="skill-icon" />,
        description: 'Node.js, Express, Python, Java',
        items: ['Node.js', 'Express', 'Java', 'Python']
    },
    {
        name: 'Database Architecture',
        icon: <Database className="skill-icon" />,
        description: 'PostgreSQL, MongoDB, Redis',
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase']
    },
    {
        name: 'Other Tools',
        icon: <Code2 className="skill-icon" />,
        description: 'Git, Docker, AWS, CI/CD',
        items: ['Git/GitHub', 'Docker', 'AWS', 'Jest']
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
                        A passionate software engineer with a knack for building beautiful,
                        high-performance digital experiences. I specialize in full-stack
                        development with a strong focus on UI/UX.
                    </p>
                </motion.div>

                <div className="skills-grid">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="skill-card glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
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
