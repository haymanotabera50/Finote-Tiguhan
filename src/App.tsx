import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CustomizationProvider } from './context/CustomizationContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GlobalAnnouncementBanner } from './components/common/GlobalAnnouncementBanner';
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
import { AuthModal } from './components/auth/AuthModal';
import { PortalDashboard } from './components/portal/PortalDashboard';
import { CustomizationDrawer } from './components/customization/CustomizationDrawer';

export function AppContent() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<string | undefined>(undefined);

  const { switchRole, login } = useAuth();

  // Support query params and direct paths like /admin, /portal, ?login=leadership
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const loginParam = url.searchParams.get('login');
      const adminParam = url.searchParams.get('admin');
      const portalParam = url.searchParams.get('portal');
      const authParam = url.searchParams.get('auth');
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (loginParam) {
        if (loginParam === 'leadership') {
          switchRole('leadership');
        } else if (loginParam === 'student') {
          switchRole('student');
        } else if (['education', 'children', 'choir', 'counseling', 'deacons', 'development', 'youth'].includes(loginParam)) {
          switchRole('dept_admin', loginParam);
        } else {
          login(loginParam);
        }
        setPortalOpen(true);
      } else if (adminParam === 'true' || portalParam === 'true' || path.includes('admin') || path.includes('portal') || hash === '#portal' || hash === '#admin') {
        setPortalOpen(true);
      } else if (authParam === 'true' || path.includes('login') || hash === '#login') {
        setAuthOpen(true);
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
  }, []);

  const handleOpenRegister = (deptId?: string) => {
    setSelectedDeptId(deptId);
    setRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
    setSelectedDeptId(undefined);
  };

  const handleOpenPortalWithDept = (deptId: string) => {
    setSelectedDeptId(deptId);
    setPortalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#081716] text-[#e2f1ee] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Global Parish Announcement Banner (Controlled by Leadership) */}
      <GlobalAnnouncementBanner onOpenRegister={() => handleOpenRegister()} />

      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenPortal={() => setPortalOpen(true)}
        onOpenCustomization={() => setCustomizationOpen(true)}
      />

      {/* Main Liturgical Content Sections */}
      <main className="flex-1">
        <Hero onOpenRegister={() => handleOpenRegister()} />
        <About />
        <Departments 
          onJoinDepartment={(deptId) => handleOpenRegister(deptId)}
          onOpenPortalWithDept={handleOpenPortalWithDept}
        />
        <Courses onEnroll={(courseId) => handleOpenRegister()} />
        <FeastCalendar />
        <MezmurPlayer />
        <MediaGallery />
        <DonationSection />
        <Contact />
      </main>

      {/* Parish Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <RegistrationModal
        isOpen={registerOpen}
        onClose={handleCloseRegister}
        preselectedDeptId={selectedDeptId}
      />

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        onOpenPortal={() => setPortalOpen(true)}
      />

      <PortalDashboard
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
      />

      <CustomizationDrawer
        isOpen={customizationOpen}
        onClose={() => setCustomizationOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CustomizationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </CustomizationProvider>
    </LanguageProvider>
  );
}
