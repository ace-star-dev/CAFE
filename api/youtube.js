// Arquivo: api/youtube.js
export default async function handler(req, res) {
  const CHANNEL_ID = 'UCSrAIfIvGQ7z1aAxm0lxjng';
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  try {
    const response = await fetch(RSS_URL);
    if (!response.ok) throw new Error('Falha na comunicação com o YouTube');
    
    const xml = await response.text();
    
    // Cabeçalhos de alta performance: Cache de 1 hora na rede mundial (Edge)
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).send(xml);
    
  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar o feed' });
  }
}