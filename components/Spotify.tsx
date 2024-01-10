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
  let secondsPlayed = 0,
    minutesPlayed = 0,
    secondsTotal = 0,
    minutesTotal = 0;
  let playerStatus = '';
  let albumImageUrl = '';
  let songUrl = '';
  let artistUrl = '';

  useEffect(() => {
    const fetchCurrentlyPlaying = async () => {
      const data = await getCurrentlyPlaying();
      setCurrentlyPlaying(data);
    };

    setInterval(() => {
      fetchCurrentlyPlaying();
    }, 1000);
  }, []);

  if (currentlyPlaying !== null) {
    currentlyPlaying?.isPlaying
      ? (playerStatus = 'PLAY')
      : (playerStatus = 'PAUSE');

    secondsPlayed = Math.floor(currentlyPlaying?.timePlayed / 1000);
    minutesPlayed = Math.floor(secondsPlayed / 60);
    secondsPlayed = secondsPlayed % 60;

    secondsTotal = Math.floor(currentlyPlaying?.timeTotal / 1000);
    minutesTotal = Math.floor(secondsTotal / 60);
    secondsTotal = secondsTotal % 60;

    albumImageUrl = currentlyPlaying?.albumImageUrl;
    title = currentlyPlaying?.title;
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

  const pad = (n: number) => {
    return n < 10 ? '0' + n : n;
  };

  return (
    <div className="flex gap-4 p-6 rounded-md">
      <div className="relative flex items-center justify-center aspect-square h-16 w-16">
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
      </div>
      <div className="flex flex-col">
        <Link
          href={songUrl}
          className="font-bold text-sm"
        >
          {title}
        </Link>
        <Link
          href={artistUrl}
          className="text-muted-foreground mb-3 text-xs"
        >
          {artist}
        </Link>
        <p className="text-xs text-muted-foreground">
          {pad(minutesPlayed)}:{pad(secondsPlayed)} / {pad(minutesTotal)}:
          {pad(secondsTotal)}
        </p>
      </div>
    </div>
  );
}
