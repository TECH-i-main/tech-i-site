import React, { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-md border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex-shrink-0">
          <a href="#home" className="flex items-center space-x-3">
            <img
              src="/assets/images/logo_main.svg"
              alt="TECH-i"
              className="h-10 w-auto"
            />
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            className="text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
          >
            About
          </a>
          <a
            href="#services"
            className="text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
          >
            Services
          </a>
          <a
            href="#company"
            className="text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
          >
            Company
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
          >
            Contact
          </a>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-black">
          <div className="px-4 py-4 space-y-3">
            <a
              href="#home"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
            >
              About
            </a>
            <a
              href="#services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
            >
              Services
            </a>
            <a
              href="#company"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
            >
              Company
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-gray-300 hover:text-coral-500 transition-colors text-sm font-medium"
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
