import styles from './page.module.css';

export default function Home() {
  return (
    <main className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card animate-fade-in-up" style={{ textAlign: 'center', maxWidth: '600px', width: '100%' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>
          Welcome to <span className="text-gradient">MyMate</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '32px', lineHeight: '1.6' }}>
          Your AI-powered career guidance platform. We're here to help you navigate your future with clarity and confidence.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button className="btn-primary">Get Started</button>
          <button className="btn-primary" style={{ background: 'transparent', color: 'var(--color-coral)', border: '2px solid var(--color-coral)', boxShadow: 'none' }}>
            Learn More
          </button>
        </div>
      </div>
    </main>
  );
}
