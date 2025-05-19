import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface AboutProps {
  setCursorVariant: (variant: string) => void;
}

const About: React.FC<AboutProps> = ({ setCursorVariant }) => {
  const { t, language } = useLanguage();
  
  const skillCategories = [
    { 
      name: t('about.category.product'),
      skills: [
        { name: t('skills.product.strategy'), icon: '🎯' },
        { name: t('skills.product.research'), icon: '🔍' },
        { name: t('skills.product.roadmapping'), icon: '🗺️' },
        { name: t('skills.product.agile'), icon: '⚡' },
      ]
    },
    {
      name: t('about.category.technical'),
      skills: [
        { name: t('skills.technical.python'), icon: '🐍' },
        { name: t('skills.technical.ai'), icon: '🧠' },
        { name: t('skills.technical.data'), icon: '📊' },
        { name: t('skills.technical.ux'), icon: '🎨' },
      ]
    },
    {
      name: t('about.category.leadership'),
      skills: [
        { name: t('skills.leadership.team'), icon: '👥' },
        { name: t('skills.leadership.stakeholder'), icon: '🗣️' },
        { name: t('skills.leadership.planning'), icon: '📋' },
        { name: t('skills.leadership.strategic'), icon: '♟️' },
      ]
    }
  ];

  const interests = [
    { name: t('about.interests.running'), icon: '🏃🏽' },
    { name: t('about.interests.hiking'), icon: '🌲' },
    { name: t('about.interests.food'), icon: '🍜' },
    { name: t('about.interests.trends'), icon: '🗞' },
    { name: t('about.interests.games'), icon: '🎮' },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-3">{t('about.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-3xl transform translate-x-3 translate-y-3"></div>
              <div className="relative border-4 border-text rounded-3xl overflow-hidden">
                <div className="aspect-w-4 aspect-h-5 bg-gray-200">
                  <div className="flex items-center justify-center h-full">
                    <img 
                      src="/profile-image.jpg" 
                      alt="Elyas Ahmed" 
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-6">{t('hero.title')} <span className={`text-primary ${language === 'ar' ? 'arabic-name' : ''}`}>{t('hero.name')}</span>, {t('hero.subtitle')}</h3>
            <p className="text-lg mb-6">
              {t('about.bio.education')}
            </p>
            <p className="text-lg mb-8">
              {t('about.bio.career')}
            </p>

            <div className="flex flex-wrap gap-4">
              {skillCategories[0].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="card flex items-center space-x-2 px-3 py-2"
                  whileHover={{ y: -5 }}
                  onMouseEnter={() => setCursorVariant('button')}
                  onMouseLeave={() => setCursorVariant('default')}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-medium text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>

            <h4 className="text-xl font-semibold mt-8 mb-4">{t('about.interests')}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.name}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <span className="text-xl">{interest.icon}</span>
                  <span className="text-sm">{interest.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-12 text-center">{t('about.skills')}</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.name}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * categoryIndex }}
              >
                <h4 className="text-xl font-semibold mb-4 text-primary">{category.name}</h4>
                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skill.name}
                      className={`flex items-center ${language === 'ar' ? 'space-x-reverse' : 'space-x-3'}`}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * categoryIndex + 0.1 * skillIndex }}
                    >
                      <span className="text-2xl">{skill.icon}</span>
                      <span>{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 