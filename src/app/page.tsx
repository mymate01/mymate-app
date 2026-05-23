import Link from 'next/link';

export default function Home() {
  const features = [
    { title: 'Career Path', description: 'Discover AI-tailored career journeys and step-by-step guidance.', href: '/career-path', delay: 'delay-100' },
    { title: 'Competitive', description: 'Prepare for government and private sector competitive exams.', href: '/competitive', delay: 'delay-200' },
    { title: 'General Knowledge', description: 'Stay updated with curated current affairs and knowledge bases.', href: '/general-knowledge', delay: 'delay-300' },
    { title: 'Practice', description: 'Test your skills with interactive quizzes and practice pads.', href: '/practice', delay: 'delay-100' },
    { title: 'Games', description: 'Sharpen your mind with our collection of brain teasing games.', href: '/games', delay: 'delay-200' },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="container" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px' }}>
        <div className="glass-card animate-fade-in-up" style={{ textAlign: 'center', maxWidth: '800px', width: '100%' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '24px', lineHeight: '1.2', fontWeight: '800', letterSpacing: '-1px' }}>
            Empower Your Future with <span className="text-gradient">MyMate</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '40px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 40px auto' }}>
            Your personal, AI-driven career guidance platform. Whether you are exploring paths, preparing for exams, or sharpening your mind, we have everything you need.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link 
              href="/career-path" 
              className="btn-primary" 
              style={{ padding: '16px 32px', fontSize: '1.1rem', textDecoration: 'none', display: 'inline-block' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="container" style={{ padding: '40px 24px 120px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', fontWeight: '700' }}>Explore Modules</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem' }}>Everything a student needs to succeed, in one place.</p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '32px' 
        }}>
          {features.map((feature) => (
            <Link href={feature.href} key={feature.title} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className={`glass-card animate-fade-in-up ${feature.delay}`} style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '40px 32px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--color-coral)', fontWeight: '700' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', flex: 1, fontSize: '1.05rem' }}>{feature.description}</p>
                <div style={{ marginTop: '24px', fontWeight: '600', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Explore <span style={{ color: 'var(--color-golden)', fontSize: '1.2rem' }}>&rarr;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
