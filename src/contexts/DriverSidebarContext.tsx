import React, { createContext, useContext, useState } from 'react'

interface DriverSidebarCtx {
  isOpen: boolean
  open: () => void
  close: () => void
}

const DriverSidebarContext = createContext<DriverSidebarCtx>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function DriverSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DriverSidebarContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </DriverSidebarContext.Provider>
  )
}

export const useDriverSidebar = () => useContext(DriverSidebarContext)
