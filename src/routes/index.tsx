import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "@/hooks/use-theme";
import { BackgroundProvider } from "@/hooks/use-background";
import { AppearanceProvider } from "@/hooks/use-appearance";
import { AuthProvider, useAuth } from "@/hooks/use-auth";

import { AmbientBackground } from "@/components/AmbientBackground";
import { TopBar } from "@/components/TopBar";
import { CalendarWidget } from "@/components/CalendarWidget";
import { DeadlinesWidget } from "@/components/DeadlinesWidget";
import { FocusToday } from "@/components/FocusToday";
import { QuoteWidget } from "@/components/QuoteWidget";
import { FocusTimer } from "@/components/FocusTimer";
import { WeatherWidget } from "@/components/WeatherWidget";
import { NotesWidget } from "@/components/NotesWidget";
import { TodoWidget } from "@/components/TodoWidget";
import { AmbienceControl } from "@/components/AmbienceControl";
import { SettingsPanel } from "@/components/SettingsPanel";
import { AuthDialog } from "@/components/AuthDialog";
import { ProfilePanel } from "@/components/ProfilePanel";

export const Route = createFileRoute("/")({
  component: Index,
});

function Dashboard() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useAuth();

  const handleProfileClick = () => {
    if (user) {
      setProfileOpen(true);
    } else {
      setAuthOpen(true);
    }
  };

  return (
    <div className="relative w-full max-w-[100vw] min-h-[100dvh] overflow-x-hidden px-2 sm:px-3 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] pt-[max(0.75rem,env(safe-area-inset-top,0px))] lg:h-screen lg:overflow-hidden lg:px-4 lg:pb-3 lg:pt-3">

      <AmbientBackground />

      <TopBar
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenProfile={handleProfileClick}
      />

      <main className="mx-auto mt-5 flex w-full min-w-0 max-w-[1600px] flex-col gap-4 overscroll-y-contain max-lg:scroll-touch sm:gap-5 lg:mt-3 lg:grid lg:h-[calc(100vh-4.5rem)] lg:grid-cols-12 lg:gap-3">

        {/* LEFT COLUMN */}
        <section className="contents lg:col-span-3 lg:flex lg:min-h-0 lg:flex-col lg:gap-3">

          {/* 5. Weekly Schedule */}
          <div className="widget-shell order-5 lg:order-none lg:max-h-[50%]">
            <CalendarWidget />
          </div>

          {/* 7. Exams / Deadlines */}
          <div className="widget-shell order-7 flex lg:order-none lg:min-h-0 lg:flex-1">
            <DeadlinesWidget />
          </div>

        </section>

        {/* CENTER COLUMN */}
        <section className="contents lg:col-span-6 lg:flex lg:min-h-0 lg:flex-col lg:gap-3">

          {/* 2. Today's Focus */}
          <div className="widget-shell order-1 lg:order-none lg:flex-none">
            <FocusToday />
          </div>

          {/* 3. Motivational Quote */}
          <div className="widget-shell order-2 lg:order-none lg:flex-none">
            <QuoteWidget />
          </div>

          {/* 4. Focus Timer */}
          <div className="widget-shell order-3 lg:order-none lg:min-h-0 lg:flex-1">
            <FocusTimer />
          </div>

        </section>

        {/* RIGHT COLUMN */}
        <section className="contents lg:col-span-3 lg:flex lg:min-h-0 lg:flex-col lg:gap-3">

          {/* Desktop weather only */}
          <div className="hidden lg:block">
            <WeatherWidget />
           </div>

          {/* 8. Notes */}
          <div className="widget-shell order-8 lg:order-none lg:flex-none">
            <NotesWidget />
          </div>

          {/* 6. To-do / Reminders */}
          <div className="widget-shell order-6 lg:order-none lg:min-h-0 lg:flex-[1.4]">
            <TodoWidget />
          


        </div>

        </section>

      </main>

      <AmbienceControl />

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      <AuthDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />

      <ProfilePanel
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        onOpenSettings={() => setSettingsOpen(true)}
      />

      <Toaster
        position="top-center"
        theme="system"
      />
    </div>
  );
}

function Index() {
  return (
    <ThemeProvider>
      <AppearanceProvider>
        <AuthProvider>
          <BackgroundProvider>
            <Dashboard />
          </BackgroundProvider>
        </AuthProvider>
      </AppearanceProvider>
    </ThemeProvider>
  );
}