import { AppSidebar } from '@/components/app-siderbar';
import BreadcrumbHeader from '@/components/breadcrumb-header';
import { ModeToggle } from '@/components/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider  } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/nextjs';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function layout ({ children }: Props)  {
  return (
    <div className='flex h-screen'>
      <SidebarProvider>
        <AppSidebar />
          <div className='flex flex-col flex-1 min-h-screen w-screen'>
            {/* <SidebarTrigger /> */}
            <header className='flex justify-between items-center px-6 py-2 h-[50px]'>
              <BreadcrumbHeader/>
              <div className="gap-2 flex items-center">
                <ModeToggle/>
                <UserButton /> 
              </div>
            </header>
            <Separator />
            <div className='overflow-auto'>
              <div className='flex-1 container py-2 text-accent-foreground '>
                {children}
              </div>
            </div>
          </div>
      </SidebarProvider>
    </div>
  );
};

export default layout;
