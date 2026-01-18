import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, FaNodeJs, FaPython, FaDatabase, FaGitAlt, FaDocker,
  FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaSass
} from 'react-icons/fa';

const Skills: React.FC = () => {
  const skills = [
    { name: 'React', icon: <FaReact />, years: 3, color: 'from-blue-400 to-blue-600' },
    { name: 'Node.js', icon: <FaNodeJs />, years: 3, color: 'from-green-400 to-green-600' },
    { name: 'Python', icon: <FaPython />, years: 2, color: 'from-yellow-400 to-yellow-600' },
    { name: 'TypeScript', icon: <FaJs />, years: 2, color: 'from-blue-400 to-blue-600' },
    { name: 'MongoDB', icon: <FaDatabase />, years: 2, color: 'from-green-400 to-green-600' },
    { name: 'PostgreSQL', icon: <FaDatabase />, years: 1, color: 'from-blue-400 to-blue-600' },
    { name: 'Git', icon: <FaGitAlt />, years: 3, color: 'from-orange-400 to-orange-600' },
    { name: 'Docker', icon: <FaDocker />, years: 1, color: 'from-blue-400 to-blue-600' },
    { name: 'HTML5', icon: <FaHtml5 />, years: 4, color: 'from-orange-400 to-orange-600' },
    { name: 'CSS3', icon: <FaCss3Alt />, years: 4, color: 'from-blue-400 to-blue-600' },
    { name: 'Bootstrap', icon: <FaBootstrap />, years: 3, color: 'from-purple-400 to-purple-600' },
    { name: 'Sass', icon: <FaSass />, years: 2, color: 'from-pink-400 to-pink-600' },
  ];

  const maxYears = Math.max(...skills.map((s) => s.years));

  return (
    <section id="skills" className="scroll-mt-20 py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Habilidades Técnicas
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Tecnologías y herramientas que domino para crear soluciones robustas y escalables
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${skill.color} rounded-full flex items-center justify-center text-white text-2xl`}
              >
                {skill.icon}
              </motion.div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-center mb-3">
                {skill.name}
              </h3>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(skill.years / maxYears) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.3, duration: 0.8 }}
                  className={`bg-gradient-to-r ${skill.color} h-2 rounded-full`}
                ></motion.div>
              </div>
              <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                {skill.years} {skill.years === 1 ? 'año' : 'años'}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Otras Habilidades
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['RESTful APIs', 'GraphQL', 'Agile/Scrum', 'CI/CD', 'AWS', 'Testing', 'UI/UX Design', 'Responsive Design'].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
