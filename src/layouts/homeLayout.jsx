import React from 'react';
import Navigation from '../components/Navigation';
import { Outlet } from 'react-router-dom';


export default function HomeLayout() {
  return (
    <div>
      <Navigation />
      
       <Outlet />
      
    </div>
  );
}