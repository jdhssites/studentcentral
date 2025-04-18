import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "./components/layouts/MainLayout";
import React from "react";

export const metadata: Metadata = {
  title: "Student Central - Academic Tools Library",
  description: "A comprehensive library of tools for students to use for assignments and exams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
} 