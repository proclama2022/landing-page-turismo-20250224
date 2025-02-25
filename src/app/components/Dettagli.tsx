'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaEuroSign, FaPercentage } from 'react-icons/fa';

const Dettagli = () => {
  return (
    <section id="dettagli" className="py-16 bg-gradient-to-b from-blue-900 to-blue-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Dettagli del Bando
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 max-w-2xl mx-auto"
          >
            Tutte le informazioni essenziali sul Bando Turismo Sicilia 2025
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-blue-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/30 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-blue-900 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">Tempistiche</h3>
            </div>
            <p className="text-gray-300 mb-2">Apertura prevista:</p>
            <p className="text-white text-lg font-bold">2025</p>
            <p className="text-gray-300 mt-4 text-sm">
              La data esatta di apertura del bando sarà comunicata dalla Regione Siciliana
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-blue-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/30 shadow-xl"
          >
            <div className="flex items-center mb-4">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <FaEuroSign className="text-blue-900 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">Fondi disponibili</h3>
            </div>
            <p className="text-gray-300 mb-2">Dotazione finanziaria:</p>
            <p className="text-white text-lg font-bold">75 milioni di euro</p>
            <p className="text-gray-300 mt-4 text-sm">
              Finanziamenti da 50.000€ a 3.500.000€ per progetto
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-blue-800/50 backdrop-blur-sm p-6 rounded-xl border border-blue-700/30 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0">
              <div className="bg-yellow-400 text-blue-900 font-bold text-xl w-20 h-20 flex items-center justify-center rounded-bl-full">
                80%
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="bg-yellow-400 p-3 rounded-full mr-4">
                <FaPercentage className="text-blue-900 text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-white">Percentuale finanziabile</h3>
            </div>
            <p className="text-gray-300 mb-2">Contributo:</p>
            <p className="text-white text-lg font-bold">Fino all'80% a fondo perduto</p>
            <p className="text-gray-300 mt-4 text-sm">
              In regime De minimis per le imprese turistiche siciliane
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Dettagli; 