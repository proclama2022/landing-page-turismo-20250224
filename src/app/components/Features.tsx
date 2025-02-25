import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaLeaf, FaLaptop, FaUsers } from 'react-icons/fa';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col"
    >
      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Codici ATECO Ammissibili
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Il Bando Turismo Sicilia 2025 è rivolto alle imprese con i seguenti codici ATECO:
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaBuilding size={24} />}
            title="Strutture Ricettive"
            description="Codici 55.10.00, 55.20.10, 55.20.20, 55.20.51, 55.30.00 - Hotel, villaggi turistici, ostelli, affittacamere, B&B, agriturismi e campeggi."
            delay={0.1}
          />
          <FeatureCard
            icon={<FaLeaf size={24} />}
            title="Ristorazione"
            description="Codici 56.10.11, 56.10.12, 56.10.20, 56.10.30, 56.10.41, 56.10.42, 56.10.50, 56.21.00, 56.29.10, 56.29.20, 56.30.00 - Ristoranti, bar, catering e servizi di ristorazione."
            delay={0.2}
          />
          <FeatureCard
            icon={<FaLaptop size={24} />}
            title="Agenzie e Tour Operator"
            description="Codici 79.11.00, 79.12.00, 79.90.19, 79.90.20 - Agenzie di viaggio, tour operator e servizi di prenotazione turistica."
            delay={0.3}
          />
          <FeatureCard
            icon={<FaUsers size={24} />}
            title="Attività Ricreative"
            description="Codici 91.02.00, 91.03.00, 93.11.30, 93.11.90, 93.21.00, 93.29.20 - Musei, siti storici, parchi divertimento, stabilimenti balneari e attività ricreative."
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default Features; 