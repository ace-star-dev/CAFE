export interface YouTubeVideo {
  videoId: string;
  title: string;
  published: string;
  description: string;
  thumb: string;
  link: string;
}

export async function getLatestVideos(): Promise<YouTubeVideo[]> {
  const CHANNEL_ID = 'UCSrAIfIvGQ7z1aAxm0lxjng';
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  try {
    const res = await fetch(RSS_URL, { 
      next: { revalidate: 3600 } // Revalida a cada 1 hora
    });
    
    if (!res.ok) throw new Error('Falha ao buscar feed do YouTube');
    
    const xmlText = await res.text();
    
    // Simples parser de XML via regex para ambientes de servidor (onde DOMParser não existe)
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const entries: YouTubeVideo[] = [];
    let match;

    while ((match = entryRegex.exec(xmlText)) !== null) {
      const entry = match[1];
      const videoId = /<yt:videoId>(.*?)<\/yt:videoId>/.exec(entry)?.[1] || '';
      const title = /<title>(.*?)<\/title>/.exec(entry)?.[1] || '';
      const published = /<published>(.*?)<\/published>/.exec(entry)?.[1] || '';
      const description = /<media:description>(.*?)<\/media:description>/.exec(entry)?.[1] || '';
      
      entries.push({
        videoId,
        title: title.replace(/&amp;/g, '&'),
        published,
        description: description.slice(0, 200) + '...',
        thumb: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        link: `https://www.youtube.com/watch?v=${videoId}`
      });
    }

    return entries;
  } catch (error) {
    console.error('YouTube Fetch Error:', error);
    return [];
  }
}

export const BACKUP_VIDEOS: YouTubeVideo[] = [
  {
    videoId: '2MG3lzbp8Xk',
    title: '#27 Café com Prette - Episódio especial com Geslanda Meira',
    published: '2026-02-13T00:00:00Z',
    description: 'O papel inegociável da comunicação na liderança, com a empresária e empreendedora Geslanda Meira. Uma conversa para quem não aceita soluções medianas.',
    thumb: 'https://i.ytimg.com/vi/2MG3lzbp8Xk/maxresdefault.jpg',
    link: 'https://www.youtube.com/watch?v=2MG3lzbp8Xk'
  }
];