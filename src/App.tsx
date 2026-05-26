import { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ProjectRequestForm from './components/ProjectRequestForm';
import Tracking from './components/Tracking';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [currentSection, setCurrentSection] = useState('inicio');

  const inicioRef = useRef<HTMLDivElement>(null);
  const serviciosRef = useRef<HTMLDivElement>(null);
  const solicitudRef = useRef<HTMLDivElement>(null);
  const seguimientoRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback((section: string) => {
    setCurrentSection(section);
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      inicio: inicioRef,
      servicios: serviciosRef,
      solicitud: solicitudRef,
      seguimiento: seguimientoRef,
      contacto: contactoRef,
    };
    const ref = refs[section];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} currentSection={currentSection} />

      <div ref={inicioRef}>
        <Hero onNavigate={handleNavigate} />
      </div>

      <div ref={serviciosRef}>
        <Services />
      </div>

      <div ref={solicitudRef}>
        <ProjectRequestForm />
      </div>

      <div ref={seguimientoRef}>
        <Tracking />
      </div>

      <div ref={contactoRef}>
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
