import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const About: React.FC = () => {
  const experiences = [
    {
      icon: <FaGraduationCap />,
      title: "Educación",
      description: "Licenciatura en Ingeniería de Software con especialización en Desarrollo Web"
    },
    {
      icon: <FaBriefcase />,
      title: "Experiencia",
      description: "3+ años desarrollando aplicaciones web modernas para startups y empresas"
    },
    {
      icon: <FaUser />,
      title: "Pasión",
      description: "Apasionado por crear soluciones innovadoras y aprender nuevas tecnologías"
    }
  ];

  return (
    <section id="about" className="scroll-mt-20 py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sobre Mí
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Conoce más sobre mi trayectoria y lo que me apasiona en el mundo del desarrollo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="w-64 h-64 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 w-64 h-64 mx-auto border-4 border-blue-200 dark:border-blue-800 rounded-full"
              ></motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Soy un desarrollador fullstack apasionado por crear experiencias digitales excepcionales. 
              Mi enfoque se centra en escribir código limpio, eficiente y mantenible, siempre buscando 
              las mejores prácticas y las últimas tecnologías del mercado.
            </p>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="flex items-start space-x-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full text-blue-600 dark:text-blue-400"
                  >
                    {exp.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {exp.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
