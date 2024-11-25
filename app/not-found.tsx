'use client'
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Ghost, Home } from "lucide-react"
import Link from 'next/link'

export default function FunnyNotFound() {
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(prev => !prev)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex flex-col items-center justify-center p-4 text-center">
      <Ghost 
        className={`w-32 h-32 text-primary mb-8 transition-transform duration-300 ease-in-out ${bounce ? 'translate-y-2' : '-translate-y-2'}`} 
        aria-hidden="true"
      />
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! Looks like this page took a permanent vacation.</p>
      <p className="text-lg mb-8">Maybe it's sipping cocktails on a beach somewhere, living its best life.</p>
      <Button asChild className="flex items-center space-x-2">
        <Link href="/">
          <Home className="w-4 h-4 mr-2" />
          <span>Return Home</span>
        </Link>
      </Button>
      <p className="mt-8 text-sm text-muted-foreground">
        Don't worry, our team of expert page-finders is on the case!
        <br />
        (They might be a bit distracted by cat videos, but they'll get to it eventually.)
      </p>
    </div>
  )
}