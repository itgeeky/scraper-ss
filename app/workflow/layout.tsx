import Logo from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'
import { Separator } from '@/components/ui/separator'

type Props = {
  children: React.ReactNode
}

function layout ({ children }: Props) {
  return (
    <div className='flex flex-col w-full h-screen'>
      
      {children}
      <Separator />
      <footer className='flex justify-between items-center h-16 p-2'>
        <Logo iconSize={16} fontSize='text-xl'/>
        <ModeToggle />
      </footer>
    </div>
  )
}

export default layout
