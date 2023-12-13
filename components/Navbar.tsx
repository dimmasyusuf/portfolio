import { Button } from './ui/button';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <h1 className="font-bold text-lg">dimmasyusuf</h1>
      <div className="flex gap-8 items-center">
        <ul className="flex gap-6">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
        </ul>
        <Button>Hire Me</Button>
      </div>
    </nav>
  );
}
