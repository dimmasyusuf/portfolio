import { Songs } from '@/types';
import querystring from 'querystring';

// ENV VARIABLES
const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN;

// ENDPOINTS
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const CURRENTLY_PLAYING_ENDPOINT =
  'https://api.spotify.com/v1/me/player/currently-playing';

export const getAccessToken = async (
  client_id: string,
  client_secret: string,
  refresh_token: string
) => {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

export const getCurrentlyPlaying = async () => {
  try {
    const { access_token } = await getAccessToken(
      client_id as string,
      client_secret as string,
      refresh_token as string
    );

    const response = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status > 400) {
      throw new Error('Unable to fetch currently playing');
    } else if (response.status === 204) {
      throw new Error('Currently not playing');
    }

    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artistName = song.item.artists
      .map((artist: any) => artist.name)
      .join(', ');
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    const timePlayed = song.progress_ms;
    const timeTotal = song.item.duration_ms;
    const artistUrl = song.item.artists[0].external_urls.spotify;

    return {
      title,
      albumImageUrl,
      artistName,
      artistUrl,
      songUrl,
      timePlayed,
      timeTotal,
    } as Songs;
  } catch (error) {
    console.error(error);
    throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
  }
};
