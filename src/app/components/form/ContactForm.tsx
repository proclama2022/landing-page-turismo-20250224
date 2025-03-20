'use client';

import React, { useState } from 'react';
import AnimatedButton from '../ui/AnimatedButton';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    messaggio: '',
    gdprConsent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://hook.eu1.make.com/rpn58tmkybaba756zqlaieropz56db1c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Errore nell\'invio del form');
      }

      setSubmitStatus('success');
      setFormData({
        nome: '',
        email: '',
        telefono: '',
        messaggio: '',
        gdprConsent: false,
      });
    } catch (error) {
      console.error('Errore:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target instanceof HTMLInputElement && target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
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

        <div className="form-field">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="gdprConsent"
                name="gdprConsent"
                type="checkbox"
                checked={formData.gdprConsent}
                onChange={handleChange}
                className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-white/20 rounded bg-white/10"
                required
              />
            </div>
            <div className="ml-3">
              <label htmlFor="gdprConsent" className="text-sm text-white">
                Ho letto e accetto la <a href="https://management-advisor.eu/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline">Privacy Policy</a> <span className="text-red-500">*</span>
              </label>
              <p className="mt-1 text-xs text-gray-300">
                I tuoi dati saranno trattati secondo la normativa vigente sulla privacy
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          {submitStatus === 'success' && (
            <p className="text-green-400 text-sm">Messaggio inviato con successo!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-400 text-sm">Si è verificato un errore. Per favore riprova.</p>
          )}
          <AnimatedButton
            type="submit"
            className="bg-yellow-400 text-black font-semibold hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Invio in corso...' : 'Invia messaggio'}
          </AnimatedButton>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 