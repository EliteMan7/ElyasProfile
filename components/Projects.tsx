import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface ProjectsProps {
  setCursorVariant: (variant: string) => void;
}

interface Tag {
  key: string;
  translationKey: string;
}

interface Project {
  id: string;
  translationTitleKey: string;
  translationDescriptionKey: string;
  tags: Tag[];
  image: string;
  color: string;
  icon: string;
}

const Projects: React.FC<ProjectsProps> = ({ setCursorVariant }) => {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRTL, setIsRTL] = useState(false);
  
  useEffect(() => {
    setIsRTL(language === 'ar');
  }, [language]);

  const projects: Project[] = [
    {
      id: 'qubed',
      translationTitleKey: 'projects.qubed.title',
      translationDescriptionKey: 'projects.qubed.description',
      tags: [
        { key: 'product_strategy', translationKey: 'tags.product_strategy' },
        { key: 'user_research', translationKey: 'tags.user_research' },
        { key: 'ml_platform', translationKey: 'tags.ml_platform' },
        { key: 'ai', translationKey: 'tags.ai' }
      ],
      image: '/project-images/Qubed.png',
      color: 'bg-primary',
      icon: '📊',
    },
    {
      id: 'propertyx',
      translationTitleKey: 'projects.propertyx.title',
      translationDescriptionKey: 'projects.propertyx.description',
      tags: [
        { key: 'product_prototyping', translationKey: 'tags.product_prototyping' },
        { key: 'ux_design', translationKey: 'tags.ux_design' },
        { key: 'real_estate', translationKey: 'tags.real_estate' }
      ],
      image: '/project-images/propertxicon.png',
      color: 'bg-secondary',
      icon: '🏠',
    },
    {
      id: 'typing',
      translationTitleKey: 'projects.typing.title',
      translationDescriptionKey: 'projects.typing.description',
      tags: [
        { key: 'product_development', translationKey: 'tags.product_development' },
        { key: 'ux_design', translationKey: 'tags.ux_design' },
        { key: 'algorithm', translationKey: 'tags.algorithm' }
      ],
      image: '/project-images/elyas-ahmed-cat-typing.jpg',
      color: 'bg-accent',
      icon: '⌨️',
    },
    {
      id: 'ml_research',
      translationTitleKey: 'projects.ml_research.title',
      translationDescriptionKey: 'projects.ml_research.description',
      tags: [
        { key: 'project_planning', translationKey: 'tags.project_planning' },
        { key: 'ml', translationKey: 'tags.ml' },
        { key: 'research', translationKey: 'tags.research' },
        { key: 'team_leadership', translationKey: 'tags.team_leadership' }
      ],
      image: '/project-images/researchposter.png',
      color: 'bg-accent',
      icon: '🧠',
    },
    {
      id: 'byow',
      translationTitleKey: 'projects.byow.title',
      translationDescriptionKey: 'projects.byow.description',
      tags: [
        { key: 'game_design', translationKey: 'tags.game_design' },
        { key: 'oop', translationKey: 'tags.oop' },
        { key: 'ui_development', translationKey: 'tags.ui_development' }
      ],
      image: '/project-images/byowimage.png',
      color: 'bg-primary',
      icon: '🎮',
    },
    {
      id: 'scheme',
      translationTitleKey: 'projects.scheme.title',
      translationDescriptionKey: 'projects.scheme.description',
      tags: [
        { key: 'project_management', translationKey: 'tags.project_management' },
        { key: 'technical_leadership', translationKey: 'tags.technical_leadership' },
        { key: 'planning', translationKey: 'tags.planning' }
      ],
      image: '/project-images/schemetree.png',
      color: 'bg-secondary',
      icon: '🧮',
    },
    {
      id: 'cats',
      translationTitleKey: 'projects.cats.title',
      translationDescriptionKey: 'projects.cats.description',
      tags: [
        { key: 'ml_ai', translationKey: 'tags.ml_ai' },
        { key: 'computer_vision', translationKey: 'tags.computer_vision' },
        { key: 'product_leadership', translationKey: 'tags.product_leadership' }
      ],
      image: '/project-images/elyas-ahmed-cat-typing.jpg',
      color: 'bg-primary',
      icon: '🐱',
    },
    {
      id: 'ants',
      translationTitleKey: 'projects.ants.title',
      translationDescriptionKey: 'projects.ants.description',
      tags: [
        { key: 'product_lifecycle', translationKey: 'tags.product_lifecycle' },
        { key: 'agile', translationKey: 'tags.agile' },
        { key: 'requirements', translationKey: 'tags.requirements' }
      ],
      image: '/project-images/elyas-ants.png',
      color: 'bg-accent',
      icon: '🐜',
    },
  ];

  const nextProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevProject = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToProject = (index: number) => {
    setCurrentIndex(index);
  };

  const currentProject = projects[currentIndex];

  // Function to handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      const iconElement = document.createElement('div');
      iconElement.className = 'text-6xl';
      iconElement.textContent = currentProject.icon;
      parent.appendChild(iconElement);
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-3">{t('projects.title')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {/* Project Slider */}
          <motion.div 
            className="card overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            key={currentIndex}
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-full overflow-hidden bg-gray-100">
                <div className={`absolute inset-0 ${currentProject.color} opacity-20`}></div>
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <img 
                    src={currentProject.image} 
                    alt={t(currentProject.translationTitleKey)}
                    className="object-contain w-full h-full rounded-lg max-h-[300px] max-w-[400px]"
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  {t(currentProject.translationTitleKey)}
                </h3>
                <p className="mb-6">{t(currentProject.translationDescriptionKey)}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {currentProject.tags.map((tag) => (
                    <span
                      key={tag.key}
                      className="px-3 py-1 bg-gray-100 text-sm rounded-full"
                    >
                      {t(tag.translationKey)}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <button 
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 hover:bg-primary hover:text-white transition-colors shadow-md"
                    onClick={isRTL ? nextProject : prevProject}
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <span className="text-2xl project-nav-arrow">←</span>
                  </button>
                  <button 
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-200 hover:bg-primary hover:text-white transition-colors shadow-md"
                    onClick={isRTL ? prevProject : nextProject}
                    onMouseEnter={() => setCursorVariant('button')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <span className="text-2xl project-nav-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Indicators */}
          <div className={`flex justify-center mt-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {projects.map((_, index) => (
              <button 
                key={index} 
                className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'} mx-1`}
                onClick={() => goToProject(index)}
                onMouseEnter={() => setCursorVariant('button')}
                onMouseLeave={() => setCursorVariant('default')}
                aria-label={t('projects.goToProject', { project: index + 1 })}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a
            href="#contact"
            className={`btn-primary inline-flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}
            onMouseEnter={() => setCursorVariant('button')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span>{t('projects.cta')}</span>
            <svg
              className={`w-4 h-4 ${isRTL ? 'transform rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects; 