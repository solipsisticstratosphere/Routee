import React, { createContext, useContext, useState } from 'react'

interface CustomerSidebarCtx {
  isOpen: boolean
  open: () => void
  close: () => void
}

const CustomerSidebarContext = createContext<CustomerSidebarCtx>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function CustomerSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <CustomerSidebarContext.Provider
      value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}
    >
      {children}
    </CustomerSidebarContext.Provider>
  )
}

export const useCustomerSidebar = () => useContext(CustomerSidebarContext)
