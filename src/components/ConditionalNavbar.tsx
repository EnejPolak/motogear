'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on configurator pages
  const hideNavbar = pathname === '/suit' || pathname === '/gloves' || pathname === '/shoes';
  
  if (hideNavbar) {
    return null;
  }
  
  return <Navbar />;
}
