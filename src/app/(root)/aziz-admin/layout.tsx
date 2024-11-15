import React, { ReactNode } from "react";
import Navbar from "./_components/Navbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
