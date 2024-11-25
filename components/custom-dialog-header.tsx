import React from 'react';
import { LucideIcon } from 'lucide-react';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Props = {
  icon?: LucideIcon;
  title?: string;
  subtitle?: string;
  iconClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

const CustomDialodHeader = ({
  icon,
  title,
  subtitle,
  iconClassName,
  titleClassName,
  subtitleClassName,
}: Props) => {
  const Icon = icon;
  return (
    <DialogHeader className='py-6'>
      <DialogTitle asChild>
        <div className='flex flex-col items-center gap-2 mb-2'>
          {Icon && <Icon size={30} className={cn('stroke-primary', iconClassName)} />}
          {title && <h2 className={cn('text-xl text-primary font-bold', titleClassName)}>{title}</h2>}
          {subtitle && <p className={cn('text-muted-foreground text-sm text-center', subtitleClassName)}>{subtitle}</p>}
        </div>
      </DialogTitle>
      <Separator />
    </DialogHeader>
  );
};

export default CustomDialodHeader;
