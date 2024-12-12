'use client'

import { useTheme } from '@/context/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
        <li><button onClick={() => toggleTheme('light')}>Light</button></li>
        <li><button onClick={() => toggleTheme('dark')}>Dark</button></li>
        <li><button onClick={() => toggleTheme('cupcake')}>Cupcake</button></li>
        <li><button onClick={() => toggleTheme('synthwave')}>Synthwave</button></li>
        <li><button onClick={() => toggleTheme('retro')}>Retro</button></li>
        <li><button onClick={() => toggleTheme('cyberpunk')}>Cyberpunk</button></li>
        <li><button onClick={() => toggleTheme('dracula')}>Dracula</button></li>
        <li><button onClick={() => toggleTheme('night')}>Night</button></li>
      </ul>
    </div>
  );
}
