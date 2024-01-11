import Spotify from './Spotify';
import SocialMedia from './SocialMedia';
import Copyright from './Copyright';

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Spotify />
        <SocialMedia />
      </div>
      <Copyright />
    </footer>
  );
}
