import React from "react";

// Single-file React component for the "Start Screen" (App.jsx)
// Tailwind CSS classes are used. This component is meant to be used in a Vite project
// with Tailwind installed. It focuses on accessibility, mobile-friendly sizing,
// and a pastel gradient background to match the provided image.

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-indigo-100 to-blue-50 p-6">
      <main className="w-full max-w-sm bg-transparent text-center">
        {/* Title */}
        <header className="mb-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-600 drop-shadow-md leading-tight">
            QUIZ<br/>MASTER
          </h1>
        </header>

        {/* Center emblem (brain + books) */}
        <section aria-hidden className="flex flex-col items-center gap-3 mb-6">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-yellow-200 to-yellow-300 shadow-md flex items-center justify-center border-2 border-yellow-400">
            {/* simple brain icon (SVG) */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 2C10 2 8 3 8 5c0 1 0 2 1 3 0 1-1 2-1 3 0 2 2 4 4 4s4-2 4-4c0-1-1-2-1-3 1-1 1-2 1-3 0-2-2-3-4-3z" stroke="#7c3aed" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="w-36 h-24 bg-white/60 rounded-lg shadow-inner p-2">
            <div className="w-full h-full flex flex-col justify-center items-center">
              <div className="text-sm font-medium">Books</div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-4">
          <button
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-400 to-pink-400 text-white font-semibold text-lg shadow-lg transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-300"
            aria-label="Iniciar juego"
          >
            <span className="flex items-center justify-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 3v18l15-9L5 3z" fill="white" />
              </svg>
              PLAY NOW
            </span>
          </button>

          <button
            className="w-full py-4 rounded-2xl bg-sky-200 text-sky-900 font-semibold text-lg shadow-sm transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-300"
            aria-label="Seleccionar categoría"
          >
            <span className="flex items-center justify-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 5h18M3 12h18M3 19h18" stroke="#0369A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              CATEGORIES
            </span>
          </button>

          <button
            className="w-full py-4 rounded-2xl bg-violet-300 text-violet-900 font-semibold text-lg shadow-sm transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-violet-300"
            aria-label="Ver mejores puntajes"
          >
            <span className="flex items-center justify-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2l2.1 6.5L21 9l-5 3.6L17.2 21 12 17.8 6.8 21 8 12.6 3 9l6.9-0.5L12 2z" fill="#6D28D9" />
              </svg>
              HIGH SCORES
            </span>
          </button>
        </section>

        {/* Footer small copyright */}
        <footer className="mt-8 text-xs text-gray-500">
          © 2024 ENCHANTED QUIZ
        </footer>
      </main>

      {/* Screen-reader only instructions for keyboard users */}
      <span className="sr-only">Pantalla de inicio del juego Quiz Master. Presiona Enter para iniciar.</span>
    </div>
  );
}
