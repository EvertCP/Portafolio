import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: "Mapa Digital",
      description: "Aplicación de mapa interactivo con marcadores e información detallada.",
      image: "mapbox-web.png",
      technologies: ["React", "Node.js", "MongoDB", "Mapbox"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "fullstack"
    },
    {
      id: 2,
      title: "Menu Digital",
      description: "Aplicación de gestión de tareas con drag & drop, notificaciones y colaboración en tiempo real.",
      image: "santa-web.png",
      technologies: ["React", "TypeScript", "Firebase", "Tailwind"],
      liveUrl: "santahamburguesa.com",
      githubUrl: "https://github.com",
      category: "frontend"
    },
    {
      id: 3,
      title: "Sitio Web Corporativo",
      description: "Sitio web corporativo con animaciones, modo oscuro y diseño responsive.",
      image: "mm-web.png",
      technologies: ["Astro", "Tailwind", "Vite", "Framer Motion"],
      liveUrl: "https://moon-minds-landing.vercel.app/",
      githubUrl: "https://github.com",
      category: "frontend"
    },
    {
      id: 4,
      title: "Portafolio personal",
      description: "Portafolio personal con animaciones, modo oscuro y diseño responsive.",
      image: "portafolio-web.png",
      technologies: ["React", "Framer Motion", "Tailwind", "Vite"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "frontend"
    },
    {
      id: 5,
      title: "Sitio Web corporativo",
      description: "Sitio web corporativo con animaciones, modo oscuro y diseño responsive.",
      image: "campos-web.png",
      technologies: ["React", "MongoDB", "Node.js", "Tailwind", "Vite"],
      liveUrl: "campos-asociados.vercel.app",
      githubUrl: "https://github.com",
      category: "fullstack"
    },
    {
      id: 6,
      title: "E-Commerce",
      description: "E-Commerce con autenticación, documentación y pruebas automatizadas.",
      image: "https://via.placeholder.com/400x300",
      technologies: ["Node.js", "Express", "MongoDB", "JWT", "Docker"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
      category: "fullstack"
    },
    {
      id: 7,
      title: "Web Corporativa",
      description: "Sitio web corporativo con animaciones, modo oscuro y diseño responsive.",
      image: "valvulas-web.png",
      technologies: ["React", "Node.js", "MongoDB", "JWT", "Docker"],
      liveUrl: "https://valvulas.vercel.app/",
      githubUrl: "https://github.com",
      category: "fullstack"
    }
  ];

  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="scroll-mt-20 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Proyectos Destacados
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Algunos de mis trabajos más recientes y proyectos personales
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {categories.map((category) => (
              <motion.button
                key={category.value}
                onClick={() => setFilter(category.value)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  filter === category.value
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4"
                >
                  <div className="text-white">
                    <h3 className="font-bold text-lg">{project.title}</h3>
                  </div>
                </motion.div>
              </div>

              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between">
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <FaExternalLinkAlt size={14} />
                    Demo
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FaGithub size={14} />
                    Código
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
