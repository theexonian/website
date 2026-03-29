'use client';

import { InstagramEmbed } from 'react-social-media-embed/dist/components/embeds/InstagramEmbed';
import { useEffect, useState } from 'react';

interface InstagramEmbedWrapperProps {
  url: string;
  captioned?: boolean;
}

export default function InstagramEmbedWrapper({ url, captioned = false }: InstagramEmbedWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div style={{ width: '100%', minHeight: '400px' }}>
      {isClient && <InstagramEmbed url={url} width="100%" captioned={captioned} />}
    </div>
  );
}
