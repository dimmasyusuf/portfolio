import Spotify from './Spotify';
import SocialMedia from './SocialMedia';
import Copyright from './Copyright';

export default function Footer() {
  return (
    <section className="flex flex-col gap-4 bg-background border-y sm:border rounded-none sm:rounded-md p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Spotify />
        <SocialMedia />
      </div>
      <Copyright />
    </section>
  );
}
