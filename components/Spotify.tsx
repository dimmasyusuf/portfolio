'use client';

import { getCurrentlyPlaying } from '@/lib/actions/spotify.action';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';
import { RiPauseCircleLine } from 'react-icons/ri';
import { useTheme } from 'next-themes';

const DEFAULT_URL = 'https://open.spotify.com/user/sv0jkjpgnjwlpcfgk47dcscvz';

export default function Spotify() {
  const [playerStatus, setPlayerStatus] = useState('OFFLINE');
  const [title, setTitle] = useState('dimmasyusuf');
  const [artist, setArtist] = useState('is currently Offline');
  const [albumImageUrl, setAlbumImageUrl] = useState('');
  const [songUrl, setSongUrl] = useState(DEFAULT_URL);
  const [artistUrl, setArtistUrl] = useState(DEFAULT_URL);
  const { theme } = useTheme();

  const {
    data: currentlyPlaying,
    isLoading: spotifyLoading,
    refetch,
  } = useQuery({
    queryKey: ['spotify'],
    queryFn: () => getCurrentlyPlaying(),
  });

  useEffect(() => {
    const spotifyInterval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(spotifyInterval);
  }, [refetch]);

  useEffect(() => {
    if (currentlyPlaying) {
      const {
        title,
        isPlaying,
        albumImageUrl,
        artistName,
        songUrl,
        artistUrl,
      } = currentlyPlaying;

      setTitle(title);
      setAlbumImageUrl(albumImageUrl);
      setArtist(artistName);
      setSongUrl(songUrl || DEFAULT_URL);
      setArtistUrl(artistUrl || DEFAULT_URL);

      setPlayerStatus(isPlaying ? 'PLAY' : 'PAUSE');
    } else {
      setTitle('dimmasyusuf');
      setArtist('is currently Offline');
      setPlayerStatus('OFFLINE');
    }
  }, [currentlyPlaying]);

  if (spotifyLoading) {
    return (
      <div className="flex gap-4 px-6 py-4 items-center border bg-background rounded-md">
        <Skeleton className="w-10 h-10 aspect-square rounded-md" />
        <div className="flex flex-col overflow-hidden">
          <Skeleton className="w-40 h-4 mb-1" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4 px-6 py-4 items-center border bg-background rounded-md">
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

      {playerStatus !== 'OFFLINE' && (
        <div className="flex items-center justify-center ml-auto w-10 h-10 aspect-square">
          {playerStatus === 'PAUSE' && (
            <RiPauseCircleLine className="w-6 h-6" />
          )}
          {playerStatus === 'PLAY' && (
            <Image
              src={`${
                theme === 'dark'
                  ? '/images/icon_darkbar.gif'
                  : '/images/icon_lightbar.gif'
              }`}
              alt="Spotify Sound Bar"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          )}
        </div>
      )}
    </div>
  );
}
