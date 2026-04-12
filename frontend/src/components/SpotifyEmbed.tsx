interface SpotifyEmbedProps {
  link: string;
  width?: string;
  height?: string;
  theme?: '0' | '1';
}

interface SpotifyInitialState {
  entities?: {
    items?: Record<
      string,
      {
        pages?: {
          items?: Array<{
            entity?: {
              data?: {
                id?: string;
              };
            };
          }>;
        };
      }
    >;
  };
}

const SPOTIFY_SHOW_ID = "12aZWrrsg7ElO1UP8JoAcs";
const SPOTIFY_SHOW_URL = `https://open.spotify.com/show/${SPOTIFY_SHOW_ID}`;
const SPOTIFY_SHOW_EMBED_URL = `https://open.spotify.com/embed/show/${SPOTIFY_SHOW_ID}`;

const decodeBase64ToUtf8 = (value: string) => {
  if (typeof atob === "function") {
    const bytes = Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  const bufferCtor = (globalThis as any).Buffer as
    | {
        from: (input: string, encoding: string) => {
          toString: (encoding: string) => string;
        };
      }
    | undefined;

  if (!bufferCtor) {
    throw new Error("No base64 decoder available");
  }

  return bufferCtor.from(value, "base64").toString("utf8");
};

const getLatestEpisodeEmbedUrl = async () => {
  try {
    const response = await fetch(SPOTIFY_SHOW_URL, {
      next: { revalidate: 900 },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Spotify show (${response.status})`);
    }

    const html = await response.text();
    const initialStateMatch = html.match(/<script id="initialState" type="text\/plain">([\s\S]*?)<\/script>/);

    if (initialStateMatch?.[1]) {
      const decodedState = decodeBase64ToUtf8(initialStateMatch[1].trim());
      const initialState = JSON.parse(decodedState) as SpotifyInitialState;
      const showData = initialState.entities?.items?.[`spotify:show:${SPOTIFY_SHOW_ID}`];
      const latestEpisodeId = showData?.pages?.items?.[0]?.entity?.data?.id;

      if (latestEpisodeId) {
        console.log(`Resolved latest episode ID: ${latestEpisodeId}`);
        return `https://open.spotify.com/embed/episode/${latestEpisodeId}`;
      }
    }

    const fallbackMatch = html.match(/\/episode\/([A-Za-z0-9]+)/);
    if (fallbackMatch?.[1]) {
      return `https://open.spotify.com/embed/episode/${fallbackMatch[1]}`;
    }
  } catch {
    // Fall through to a stable show embed if Spotify payload parsing fails.
  }

  return SPOTIFY_SHOW_EMBED_URL;
};

export default async function SpotifyEmbed({ link, width = "100%", height, theme }: SpotifyEmbedProps) {
  // Convert Spotify URL to embed URL
  const getEmbedUrl = async (url: string) => {
    // Handle different Spotify URL formats
    // https://open.spotify.com/track/5ihDGnhQgMA0F0tk9fNLlA?si=...
    // https://open.spotify.com/episode/... (for podcasts)

    if (url === "latest") {
      // Resolve and embed the most recent episode from the configured show.
      return getLatestEpisodeEmbedUrl();
    }

    const match = url.match(/spotify\.com\/(track|episode|playlist|album|show)\/([^?]+)/);
    
    if (match) {
      const [, type, id] = match;
      return `https://open.spotify.com/embed/${type}/${id}`;
    }
    
    return url;
  };

  // Determine default height based on content type
  const getDefaultHeight = (url: string) => {
    if (url === "latest") {
      return '175px';
    }
    if (url.includes('/episode/') || url.includes('/show/')) {
      return '175px'; // Taller for podcast episodes
    }
    if (url.includes('/track/')) {
      return '152px'; // Compact for tracks
    }
    return '352px'; // Default for playlists/albums
  };

  let embedUrl = await getEmbedUrl(link);
  const finalHeight = height || getDefaultHeight(link);

  // Add theme
  if (theme !== undefined) {
    embedUrl += `${embedUrl.includes('?') ? '&' : '?'}theme=${theme}`;
  }
  return (
    <div style={{ width: '100%' }}>
      <iframe
        src={embedUrl}
        width={width}
        height={finalHeight}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '12px' }}
      />
    </div>
  );
}
