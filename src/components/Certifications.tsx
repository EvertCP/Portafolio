import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

interface Certification {
  badgeId: string;
  title: string;
  issuer: string;
}

const certifications: Certification[] = [
  {
    badgeId: '3d47782a-5894-4e35-965e-c92ea16f493e',
    title: 'Certificación',
    issuer: 'Credly',
  },
];

const CredlyBadge: React.FC<{ badgeId: string; size?: number }> = ({ badgeId, size = 150 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = '';

    const badgeDiv = document.createElement('div');
    badgeDiv.setAttribute('data-iframe-width', String(size));
    badgeDiv.setAttribute('data-iframe-height', String(size + 120));
    badgeDiv.setAttribute('data-share-badge-id', badgeId);
    badgeDiv.setAttribute('data-share-badge-host', 'https://www.credly.com');
    containerRef.current.appendChild(badgeDiv);

    const script = document.createElement('script');
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    script.async = true;
    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [badgeId, size]);

  return <div ref={containerRef} />;
};

const Certifications: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<Certification | null>(null);

  return (
    <section
      id="certifications"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-900/50 border border-gray-200/70 dark:border-gray-700/60 backdrop-blur mb-4">
            <FaAward className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Logros Profesionales</span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Certificaciones
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Certificaciones obtenidas que validan mis conocimientos y habilidades técnicas.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.badgeId}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedBadge(cert)}
              className="cursor-pointer p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 border border-gray-200/70 dark:border-gray-700/60 backdrop-blur shadow-sm hover:shadow-xl transition-shadow flex flex-col items-center"
            >
              <CredlyBadge badgeId={cert.badgeId} size={200} />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedBadge(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedBadge(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FaTimes size={18} />
              </button>

              <CredlyBadge badgeId={selectedBadge.badgeId} size={340} />

              <a
                href={`https://www.credly.com/badges/${selectedBadge.badgeId}/public_url`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm"
              >
                <FaExternalLinkAlt />
                Ver en Credly
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;
