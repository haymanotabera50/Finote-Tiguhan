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
import { DepartmentAdminPage } from './components/portal/DepartmentAdminPage';
import { CustomizationDrawer } from './components/customization/CustomizationDrawer';

export function AppContent() {
  const [currentView, setCurrentView] = useState<'home' | 'departments_admin'>('home');
  const [registerOpen, setRegisterOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [selectedDeptId, setSelectedDeptId] = useState<string | undefined>(undefined);

  const { switchRole, login } = useAuth();

  // Support query params and direct paths/hash like #departments, #admin, /admin, /portal, ?login=leadership
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const loginParam = url.searchParams.get('login');
      const adminParam = url.searchParams.get('admin');
      const portalParam = url.searchParams.get('portal');
      const pageParam = url.searchParams.get('page');
      const deptParam = url.searchParams.get('dept');
      const authParam = url.searchParams.get('auth');
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();

      if (deptParam) {
        setSelectedDeptId(deptParam);
      }

      if (loginParam) {
        if (loginParam === 'leadership') {
          switchRole('leadership');
        } else if (loginParam === 'student') {
          switchRole('student');
        } else if (['education', 'children', 'choir', 'counseling', 'deacons', 'development', 'youth', 'art', 'holy_books', 'spiritual_court', 'preaching', 'auditing', 'public_relations', 'media'].includes(loginParam)) {
          switchRole('dept_admin', loginParam);
          setSelectedDeptId(loginParam);
        } else {
          login(loginParam);
        }
        setCurrentView('departments_admin');
      } else if (
        pageParam === 'departments' || 
        pageParam === 'admin' || 
        adminParam === 'true' || 
        portalParam === 'true' || 
        path.includes('admin') || 
        path.includes('portal') || 
        hash === '#departments' || 
        hash === '#portal' || 
        hash === '#admin'
      ) {
        setCurrentView('departments_admin');
      } else if (authParam === 'true' || path.includes('login') || hash === '#login') {
        setAuthOpen(true);
      }
    } catch (e) {
      // Ignore URL parsing errors
    }

    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#departments' || hash === '#admin' || hash === '#portal') {
        setCurrentView('departments_admin');
      } else if (hash === '' || hash === '#home') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
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
    setCurrentView('departments_admin');
    window.location.hash = '#departments';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDepartmentsAdmin = () => {
    setCurrentView('departments_admin');
    window.location.hash = '#departments';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    try {
      if (window.location.hash === '#departments' || window.location.hash === '#admin' || window.location.hash === '#portal') {
        window.history.pushState(null, '', window.location.pathname);
      }
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ========================================================================= */
  /* SECOND PAGE: 14 DEPARTMENTS FULL MANAGEMENT VIEW (No external IPs/ports)   */
  /* ========================================================================= */
  if (currentView === 'departments_admin') {
    return (
      <div className="min-h-screen bg-[#081716] text-[#e2f1ee] flex flex-col selection:bg-amber-400 selection:text-black">
        {/* Global Parish Announcement Banner */}
        <GlobalAnnouncementBanner onOpenRegister={() => {
          handleBackToHome();
          handleOpenRegister();
        }} />

        {/* Dedicated Second Page Component */}
        <DepartmentAdminPage
          onBackToHome={handleBackToHome}
          initialDeptId={selectedDeptId}
          onOpenCustomization={() => setCustomizationOpen(true)}
          onOpenAuth={() => setAuthOpen(true)}
        />

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
          onOpenPortal={handleOpenDepartmentsAdmin}
        />

        <CustomizationDrawer
          isOpen={customizationOpen}
          onClose={() => setCustomizationOpen(false)}
        />
      </div>
    );
  }

  /* ========================================================================= */
  /* FIRST PAGE: MAIN HOMEPAGE                                                 */
  /* ========================================================================= */
  return (
    <div className="min-h-screen bg-[#081716] text-[#e2f1ee] flex flex-col selection:bg-amber-400 selection:text-black">
      {/* Global Parish Announcement Banner (Controlled by Leadership) */}
      <GlobalAnnouncementBanner onOpenRegister={() => handleOpenRegister()} />

      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenRegister={() => handleOpenRegister()}
        onOpenAuth={() => setAuthOpen(true)}
        onOpenPortal={handleOpenDepartmentsAdmin}
        onOpenCustomization={() => setCustomizationOpen(true)}
      />

      {/* Main Liturgical Content Sections */}
      <main className="flex-1">
        <Hero onOpenRegister={() => handleOpenRegister()} />
        <About />
        <Departments 
          onJoinDepartment={(deptId) => handleOpenRegister(deptId)}
          onOpenPortalWithDept={handleOpenPortalWithDept}
          onOpenAuth={() => setAuthOpen(true)}
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
        onOpenPortal={handleOpenDepartmentsAdmin}
      />

      <PortalDashboard
        isOpen={portalOpen}
        onClose={() => setPortalOpen(false)}
        initialDeptId={selectedDeptId}
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
