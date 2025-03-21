'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ModalContextType {
    isModalOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Rendi disponibile openModal globalmente in modo più semplice
    useEffect(() => {
        // Definisci la funzione globale
        const script = document.createElement('script');
        script.textContent = `
            function openFormModalGlobal() {
                const event = new Event('openFormModal');
                window.dispatchEvent(event);
            }
        `;
        document.head.appendChild(script);

        // Aggiungi il listener per l'evento
        const handleOpenModal = () => openModal();
        window.addEventListener('openFormModal', handleOpenModal);

        return () => {
            document.head.removeChild(script);
            window.removeEventListener('openFormModal', handleOpenModal);
        };
    }, []);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}

// Aggiungi la dichiarazione del tipo per window
declare global {
    interface Window {
        openFormModal: () => void;
    }
} 