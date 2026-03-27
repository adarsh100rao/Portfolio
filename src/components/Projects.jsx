import React from 'react';
import { motion } from 'framer-motion';
import { Github, FolderGit2 } from 'lucide-react';
import './Projects.css';

const projects = [
    {
        title: 'IntelliChat Sidebar',
        period: 'Jan 2024 - Mar 2024',
        description: 'Engineered a responsive web interface with a sliding, resizable sidebar using vanilla JavaScript, HTML5, and Tailwind CSS. Integrated REST APIs ensuring an optimal user experience across all devices.',
        techStack: ['JavaScript', 'HTML5', 'Tailwind CSS', 'REST APIs'],
        githubUrl: 'https://github.com/adarsh100rao/IntelliChat'
    },
    {
        title: 'Flat Accommodation System',
        period: 'Aug 2023 - Sep 2023',
        description: 'Designed a comprehensive Flat Accommodation System in C++ with MySQL integration. Optimized tenant detail management and maintenance request processing through Object-Oriented Programming, significantly improving rental administration efficiency by 35%.',
        techStack: ['C++', 'MySQL', 'OOP', 'Database'],
        githubUrl: 'https://github.com/adarsh100rao/Flat_Accomodation'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="section relative">
            <div className="glow glow-1" style={{ top: '20%', left: '-10%' }}></div>
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title">Personal <span className="gradient-text">Projects</span></h2>
                    <p className="section-subtitle">
                        A collection of applications I've built to solve real-world problems and explore new technologies.
                    </p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="project-card glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="project-header">
                                <div className="project-icon-wrapper">
                                    <FolderGit2 className="project-icon" />
                                </div>
                                <div className="project-links">
                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Github Repo">
                                        <Github size={20} />
                                    </a>
                                </div>
                            </div>
                            
                            <h3 className="project-title">{project.title}</h3>
                            <div className="project-period">{project.period}</div>
                            
                            <p className="project-description">{project.description}</p>
                            
                            <div className="project-tech">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="tech-badge">{tech}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
