'use client';

import { useEffect, useState } from 'react';
import { getCurrentlyPlaying } from '@/lib/actions/spotify.action';
import Image from 'next/image';
import Link from 'next/link';
import { Songs } from '@/types';

export default function Spotify() {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Songs | null>(null);

  let title = '';
  let artist = '';
  let playerStatus = '';
  let albumImageUrl = '';
  let songUrl = 'https://open.spotify.com/user/dimmasyusuf';
  let artistUrl = 'https://open.spotify.com/user/dimmasyusuf';

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      const data = await getCurrentlyPlaying();

      if (data !== undefined) setCurrentlyPlaying(data);
    };

    setInterval(() => {
      fetchCurrentlyPlaying();
    }, 1000);
  }, []);

  if (currentlyPlaying !== null && currentlyPlaying.title) {
    currentlyPlaying?.isPlaying
      ? (playerStatus = 'PLAY')
      : (playerStatus = 'PAUSE');

    title = currentlyPlaying?.title;
    albumImageUrl = currentlyPlaying?.albumImageUrl;
    artist = currentlyPlaying?.artistName;
    songUrl = currentlyPlaying?.songUrl;
    artistUrl = currentlyPlaying?.artistUrl;
  } else if (currentlyPlaying === null) {
    playerStatus = 'OFFLINE';
    title = 'dimmasyusuf';
    artist = 'is currently Offline';
  } else {
    title = 'Spotify';
    artist = 'is currently Offline';
  }

  return (
    <div className="flex gap-4 px-6 py-4 rounded-md items-center border sm:border-none hover:shadow-sm">
      <Link
        href={songUrl}
        className="relative flex items-center justify-center aspect-square h-10 w-10"
      >
        {playerStatus === 'PLAY' || playerStatus === 'PAUSE' ? (
          <Image
            src={albumImageUrl}
            alt={title}
            fill
            className="rounded-md"
          />
        ) : (
          <Image
            src="/spotify_icon.svg"
            alt={title}
            fill
            className="rounded-md"
          />
        )}
      </Link>
      <div className="flex flex-col overflow-hidden">
        <Link
          href={songUrl}
          className="font-bold text-sm mb-1 truncate"
        >
          {title}
        </Link>
        <Link
          href={artistUrl}
          className="text-muted-foreground text-xs truncate"
        >
          {artist}
        </Link>
      </div>
    </div>
  );
}
