import React from 'react';
import FormModal from './form/FormModal';
import { useModal } from '@/app/ModalContext';

export function RequirementsSection() {
  const { openModal } = useModal();

  const requirements = [
    {
      title: 'Tipologia di Impresa',
      description: 'Essere una PMI o una grande impresa del settore turistico-ricettivo',
      icon: '🏢'
    },
    {
      title: 'Sede Operativa',
      description: 'Avere sede operativa in Sicilia o impegnarsi ad aprirne una',
      icon: '📍'
    },
    {
      title: 'Regime Fiscale',
      description: 'Essere in regime di contabilità ordinaria',
      icon: '📊'
    },
    {
      title: 'Situazione Finanziaria',
      description: 'Non trovarsi in situazione di difficoltà finanziaria',
      icon: '💰'
    }
  ];

  const investmentTypes = [
    'Riqualificazione e miglioramento delle strutture',
    'Innovazione e digitalizzazione dei servizi',
    'Efficientamento energetico',
    'Eliminazione barriere architettoniche',
    'Acquisto arredi e attrezzature'
  ];

  return (
    <>
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Requisiti di Ammissibilità
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-foreground lg:mx-auto">
              Verifica se la tua impresa possiede i requisiti necessari per accedere al finanziamento
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {requirements.map((req, index) => (
                <div
                  key={index}
                  className="relative bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="text-4xl">{req.icon}</div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg leading-6 font-medium text-foreground">
                        {req.title}
                      </h3>
                      <p className="mt-2 text-base text-foreground">
                        {req.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 lg:text-center">
            <h3 className="text-2xl font-bold text-foreground mb-8">
              Tipologie di Investimenti Ammissibili
            </h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <ul className="space-y-4">
                {investmentTypes.map((type, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-foreground">{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={openModal}
                className="btn-primary inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md"
              >
                Verifica la tua Ammissibilità
              </button>
            </div>
          </div>
        </div>
      </div>
      <FormModal />
    </>
  );
}
