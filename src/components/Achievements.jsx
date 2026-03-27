import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ExternalLink } from 'lucide-react';
import './Achievements.css';

const achievements = [
    {
        platform: 'LeetCode',
        rating: '1900 (Knight)',
        highlights: ['Top 4% Globally'],
        url: 'https://leetcode.com/u/adarsh100rao/'
    },
    {
        platform: 'CodeChef',
        rating: '1850+ (4-Star)',
        highlights: ['Top 5% among Indian coders'],
        url: 'https://www.codechef.com/users/adarsh_rao2004'
    },
    {
        platform: 'Codeforces',
        rating: '1388',
        highlights: ['Best Ranks: 854, 881, 991'],
        url: 'https://codeforces.com/profile/Adarsh_Rao'
    },
    {
        platform: 'AtCoder',
        rating: '600+',
        highlights: ['Top 15% Globally'],
        url: 'https://atcoder.jp/users/adarsh_rao'
    }
];

const Achievements = () => {
    return (
        <section id="achievements" className="section relative">
            <div className="glow glow-2" style={{ top: '10%', right: '-10%' }}></div>
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="section-title">Coding <span className="gradient-text">Profiles</span></h2>
                    <p className="section-subtitle">
                        My competitive programming achievements and ranks across global platforms.
                    </p>
                </motion.div>

                <div className="achievements-grid">
                    {achievements.map((item, index) => (
                        <motion.a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={item.platform}
                            className="achievement-card glass-panel"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="achievement-header">
                                <h3 className="achievement-platform">{item.platform}</h3>
                                <ExternalLink size={18} className="achievement-icon" />
                            </div>
                            
                            <div className="achievement-rating">
                                <Trophy size={16} className="text-accent" />
                                <span>Rating: {item.rating}</span>
                            </div>
                            
                            <ul className="achievement-highlights">
                                {item.highlights.map((highlight, i) => (
                                    <li key={i}>{highlight}</li>
                                ))}
                            </ul>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
