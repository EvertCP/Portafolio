import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const Hero: React.FC = () => {
  const highlights = [
    {
      icon: <FaGraduationCap />,
      title: 'Educación',
      description: 'Licenciatura en Ingeniería de Software con especialización en Desarrollo Web',
    },
    {
      icon: <FaBriefcase />,
      title: 'Experiencia',
      description: '3+ años desarrollando aplicaciones web modernas para startups y empresas',
    },
    {
      icon: <FaUser />,
      title: 'Pasión',
      description: 'Apasionado por crear soluciones innovadoras y aprender nuevas tecnologías',
    },
  ];

  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-900/50 border border-gray-200/70 dark:border-gray-700/60 backdrop-blur"
            >
              <FaCode className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Desarrollador Fullstack</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-6 text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Evert Cardenas
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-5 text-lg md:text-xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-2xl"
            >
              Soy un desarrollador fullstack apasionado por crear experiencias digitales excepcionales.
              Mi enfoque se centra en escribir código limpio, eficiente y mantenible, siempre buscando
              las mejores prácticas y las últimas tecnologías del mercado.
            </motion.p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + index * 0.12, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="p-5 rounded-2xl bg-white/70 dark:bg-gray-900/50 border border-gray-200/70 dark:border-gray-700/60 backdrop-blur shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 p-3 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 blur-2xl opacity-30"></div>
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-2xl">
                <FaCode className="text-white text-5xl" />
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-4 border-blue-200/80 dark:border-blue-800/70"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
