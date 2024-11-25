'use client';
import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  LucideIcon,
  ShieldCheckIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Logo from '@/components/logo';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from './ui/button';

interface route {
  href: string;
  label: string;
  icon: LucideIcon;
}

const items: route[] = [
  {
    href: '/',
    label: 'Home',
    icon: HomeIcon,
  },
  {
    href: 'workflows',
    label: 'Workflows',
    icon: Layers2Icon,
  },
  {
    href: 'credentials',
    label: 'Credential',
    icon: ShieldCheckIcon,
  },
  {
    href: 'billing',
    label: 'Billing',
    icon: CoinsIcon,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const activeRoute =
    items.find(
      (item) => item.href.length > 0 && pathname.includes(item.href)
    ) || items[0];
  //TODO: Fix the activeRoute and validate the color of the active route isActive={activeRoute.href == item.href}
  return (
    <Sidebar className='min-w-[256px] max-w-[256px] hidden md:block w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='mb-2'>
            <Logo />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    className={buttonVariants({
                      variant: activeRoute.href == item.href ? 'sidebarItemActive' : 'sidebarItem',
                    })}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
