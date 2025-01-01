import * as React from 'react';
import Navigation from '@/components/ui/Navigation';
import MobileNav from '@/components/ui/MobileNav';
import AppHeader from '@/components/ui/AppHeader/AppHeader';
import { rootNavValues } from '@/constants/routes';

type Props = {
  children: React.ReactNode
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <section className="h-lvh relative flex flex-col justify-between">
      <AppHeader />
      <div className="md:flex hidden">
        <Navigation 
        navigations={rootNavValues}
        containerStyles={{
          className: `bg-gray-600 w-full p-5 gap-5 flex shadow`
        }}
        navItemStyles={{
          className: `py-2 px-5 bg-gray-900 rounded-xl text-cyan-300`
        }}
        activeNavStyles={{
          className: `py-2 px-5 bg-gray-900 rounded-xl text-customCyanDark border-b border-customCyan`
        }}
        />
      </div>
      <main className="flex-1">
        {children}
      </main>
      <div className="md:hidden flex">
      <Navigation navigations={rootNavValues} />
      </div>
      <footer className="md:flex hidden bg-gray-600 text-white p-4 text-center bottom-0 w-full">
        <p>&copy; 2024 Next Investment</p>
      </footer>
    </section>
  )
}

export default RootLayout