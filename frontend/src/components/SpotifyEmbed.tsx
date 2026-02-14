interface SpotifyEmbedProps {
  link: string;
  width?: string;
  height?: string;
  theme?: '0' | '1';
}

export default function SpotifyEmbed({ link, width = "100%", height, theme }: SpotifyEmbedProps) {
  // Convert Spotify URL to embed URL
  const getEmbedUrl = (url: string) => {
    // Handle different Spotify URL formats
    // https://open.spotify.com/track/5ihDGnhQgMA0F0tk9fNLlA?si=...
    // https://open.spotify.com/episode/... (for podcasts)
    const match = url.match(/spotify\.com\/(track|episode|playlist|album|show)\/([^?]+)/);
    
    if (match) {
      const [, type, id] = match;
      return `https://open.spotify.com/embed/${type}/${id}`;
    }
    
    return url;
  };

  // Determine default height based on content type
  const getDefaultHeight = (url: string) => {
    if (url.includes('/episode/') || url.includes('/show/')) {
      return '175px'; // Taller for podcast episodes
    }
    if (url.includes('/track/')) {
      return '152px'; // Compact for tracks
    }
    return '352px'; // Default for playlists/albums
  };

  const embedUrl = getEmbedUrl(link);
  const finalHeight = height || getDefaultHeight(link);

  // Add theme parameter if specified
  if (theme !== undefined) {
    return (
      <div style={{ width: '100%' }}>
        <iframe
          src={`${embedUrl}?theme=${theme}`}
          width={width}
          height={finalHeight}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: '12px' }}
        />
      </div>
    );
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
