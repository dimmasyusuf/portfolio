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
  let songUrl = 'https://open.spotify.com/user/sv0jkjpgnjwlpcfgk47dcscvz';
  let artistUrl = 'https://open.spotify.com/user/sv0jkjpgnjwlpcfgk47dcscvz';

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      const data = await getCurrentlyPlaying();

      if (data !== undefined) setCurrentlyPlaying(data);
    };

    const intervalId = setInterval(() => {
      fetchCurrentlyPlaying();
    }, 1000);

    return () => clearInterval(intervalId);
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
    <div className="flex gap-4 px-6 py-4 rounded-md items-center border border-input sm:border-none bg-card sm:bg-transparent dark:bg-accent dark:sm:bg-transparent">
      <Link
        href={songUrl}
        className="relative flex items-center justify-center aspect-square h-10 w-10"
        target="_blank"
        rel="noopener noreferrer"
      >
        {playerStatus === 'PLAY' || playerStatus === 'PAUSE' ? (
          <Image
            src={albumImageUrl}
            alt={title}
            width={40}
            height={40}
            className="rounded-md"
          />
        ) : (
          <Image
            src="/images/icon_spotify.svg"
            alt={title}
            width={40}
            height={40}
            className="rounded-md"
          />
        )}
      </Link>
      <div className="flex flex-col overflow-hidden">
        <Link
          href={songUrl}
          className="font-bold text-sm mb-1 truncate"
          target="_blank"
          rel="noopener noreferrer"
        >
          {title}
        </Link>
        <Link
          href={artistUrl}
          className="text-muted-foreground text-xs truncate"
          target="_blank"
          rel="noopener noreferrer"
        >
          {artist}
        </Link>
      </div>
    </div>
  );
}
