import ThemeSwitcher from './ThemeSwitcher';

export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">Shopping Lists</a>
      </div>
      <div className="flex-none">
        <ThemeSwitcher />
      </div>
    </header>
  );
}
