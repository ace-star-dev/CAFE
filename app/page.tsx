import React from "react";
import Image from "next/image";
import { getLatestVideos, BACKUP_VIDEOS } from "@/lib/youtube";
import { Coffee, Play, Youtube, Instagram, Linkedin } from "lucide-react";

export default async function Home() {
  const allVideos = await getLatestVideos();
  const videos = allVideos.length > 0 ? allVideos : BACKUP_VIDEOS;
  const featured = videos[0];
  const history = videos.slice(1, 4);

  return (
    <>
      <header id="header">
        <div className="container">
          <nav>
            <a href="#" className="nav-logo">
              <Coffee className="w-5 h-5" />
              <span>{"CAFÉ COM PRÉTTE"}</span>
            </a>
            <ul className="nav-links">
              <li><a href="#podcast">{"Podcast"}</a></li>
              <li><a href="#sobre">{"Sobre"}</a></li>
              <li><a href="#contato">{"Contato"}</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem' }}>
              <div className="hero-content">
                <h1 className="hero-title">
                  <span>{"Liderança"}</span>
                  <span className="italic">{"em alto nível."}</span>
                </h1>
                <p className="hero-desc">
                  {"Um podcast para quem não aceita o mediano. Conversas profundas sobre o papel inegociável da comunicação na liderança."}
                </p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href="#podcast" className="nav-logo" style={{ background: '#b06828', color: '#fff', padding: '1rem 2rem', borderRadius: '4px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    {"Ouvir Agora"}
                  </a>
                </div>
              </div>
              <div className="hero-image">
                <Image 
                  src="/elaine.png" 
                  alt="Elaine Prétte" 
                  width={600} 
                  height={800} 
                  priority
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="podcast" style={{ background: 'var(--bg-section)' }}>
          <div className="container">
            <span className="section-label">{"Último Episódio"}</span>
            <h2 className="section-title">{"Dê o Play na sua Evolução"}</h2>
            
            <div id="featured-video" style={{ marginBottom: '4rem' }}>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', background: '#000', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <iframe 
                  src={`https://www.youtube.com/embed/${featured.videoId}?rel=0&modestbranding=1`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  title={featured.title}
                  allowFullScreen
                />
              </div>
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2rem', marginBottom: '1rem' }}>{featured.title}</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '800px' }}>{featured.description}</p>
              </div>
            </div>

            <span className="section-label">{"Episódios Anteriores"}</span>
            <div className="eps-grid">
              {history.map((v) => (
                <a key={v.videoId} href={v.link} target="_blank" className="ep-card">
                  <div className="ep-thumb">
                    <Image src={v.thumb} alt={v.title} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.2)', opacity: 0, transition: 'opacity 0.3s' }} className="play-overlay">
                      <Play fill="#fff" />
                    </div>
                  </div>
                  <div className="ep-body">
                    <h3 className="ep-title">{v.title}</h3>
                    <div className="ep-date">
                      {new Date(v.published).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer style={{ padding: '4rem 0', background: 'var(--espresso)', color: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="nav-logo" style={{ color: 'var(--gold)', marginBottom: '1rem' }}>
                <Coffee /> <span>{"CAFÉ COM PRÉTTE"}</span>
              </div>
              <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>{"© 2026 AXIS - Soluciones Digitales"}</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Youtube />
              <Instagram />
              <Linkedin />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}