import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Departments } from './components/sections/Departments';
import { Courses } from './components/sections/Courses';
import { FeastCalendar } from './components/sections/FeastCalendar';
import { MezmurPlayer } from './components/sections/MezmurPlayer';
import { MediaGallery } from './components/sections/MediaGallery';
import { DonationSection } from './components/sections/DonationSection';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/layout/Footer';
import { RegistrationModal } from './components/sections/RegistrationModal';

export function AppContent() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<string | undefined>(undefined);

  const handleOpenRegister = (deptId?: string) => {
    setSelectedDeptId(deptId);
    setRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
    setSelectedDeptId(undefined);
  };

  return (
    <div className="min-h-screen bg-[#081716] text-[#e2f1ee] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenRegister={() => handleOpenRegister()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onOpenRegister={() => handleOpenRegister()} />
        <About />
        <Departments onJoinDepartment={(deptId) => handleOpenRegister(deptId)} />
        <Courses onEnroll={(courseId) => handleOpenRegister()} />
        <FeastCalendar />
        <MezmurPlayer />
        <MediaGallery />
        <DonationSection />
        <Contact />
      </main>

      {/* Parish Footer */}
      <Footer />

      {/* Interactive Global Registration Modal */}
      <RegistrationModal
        isOpen={registerOpen}
        onClose={handleCloseRegister}
        preselectedDeptId={selectedDeptId}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
