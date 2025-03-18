'use client';

import React, { useState } from 'react';
import AnimatedButton from '../ui/AnimatedButton';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    messaggio: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Qui implementeremo la logica di invio del form
    console.log('Form inviato:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-xl border border-white/20">
      <h3 className="text-2xl font-bold mb-6 text-yellow-400">Contattaci</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-white mb-2">
              Nome completo *
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              required
              value={formData.nome}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/50"
              placeholder="Il tuo nome"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/50"
              placeholder="La tua email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-white mb-2">
            Telefono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/50"
            placeholder="Il tuo numero di telefono"
          />
        </div>

        <div>
          <label htmlFor="messaggio" className="block text-sm font-medium text-white mb-2">
            Messaggio *
          </label>
          <textarea
            id="messaggio"
            name="messaggio"
            required
            value={formData.messaggio}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-white/50"
            placeholder="Scrivi il tuo messaggio..."
          />
        </div>

        <div className="flex justify-end">
          <AnimatedButton
            type="submit"
            className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500"
          >
            Invia messaggio
          </AnimatedButton>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 