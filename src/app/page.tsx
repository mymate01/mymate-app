import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const features = [
    { emoji: '🧭', title: 'Career Path', description: 'Discover AI-tailored career journeys with step-by-step guidance mapped to your unique strengths.', href: '/career-path' },
    { emoji: '🏆', title: 'Competitive Exams', description: 'Prepare for UPSC, SSC, Banking & more with curated study plans and mock tests.', href: '/competitive' },
    { emoji: '🌍', title: 'General Knowledge', description: 'Stay sharp with daily current affairs, world events, and knowledge quizzes.', href: '/general-knowledge' },
    { emoji: '📝', title: 'Practice Pad', description: 'Test your skills with interactive quizzes, timed challenges, and performance tracking.', href: '/practice' },
    { emoji: '🎮', title: 'Brain Games', description: 'Sharpen your mind with engaging puzzles, memory games, and logic challenges.', href: '/games' },
  ];

  const whyItems = [
    { icon: '🎯', title: 'Personalized Guidance', desc: 'AI analyzes your interests, skills, and academic background to chart a career path uniquely suited to you — no cookie-cutter advice.' },
    { icon: '📊', title: 'Data-Driven Insights', desc: 'Make confident decisions backed by real industry data, salary trends, and demand forecasts across 500+ career fields.' },
    { icon: '🚀', title: 'All-in-One Platform', desc: 'Career mapping, exam prep, GK, practice tests, and brain games — everything a student needs, consolidated in one place.' },
    { icon: '🕐', title: 'Learn at Your Pace', desc: 'No deadlines, no pressure. Pick up where you left off anytime. Our adaptive system adjusts to your speed and schedule.' },
    { icon: '🔒', title: 'Free & Accessible', desc: 'Built for every student regardless of background. Core features are completely free — education should never have a price tag.' },
    { icon: '🧠', title: 'Build Real Skills', desc: 'Go beyond rote learning. Develop critical thinking, problem-solving, and analytical skills through gamified challenges.' },
  ];

  const steps = [
    { num: '1', title: 'Create Your Profile', desc: 'Tell us your class, interests, and academic stream.' },
    { num: '2', title: 'Get Recommendations', desc: 'AI maps your ideal career paths and study plans.' },
    { num: '3', title: 'Learn & Practice', desc: 'Access curated content, quizzes, and brain games.' },
    { num: '4', title: 'Track Progress', desc: 'Monitor growth with analytics and performance reports.' },
  ];

  const testimonials = [
    { text: 'MyMate helped me discover career options I never knew existed. The career map feature is incredibly intuitive!', name: 'Priya S.', role: 'Class 12 Student', initials: 'PS' },
    { text: 'The competitive exam prep module is a game-changer. I improved my GK score by 40% in just two months.', name: 'Rahul M.', role: 'UPSC Aspirant', initials: 'RM' },
    { text: 'As a teacher, I recommend MyMate to all my students. It fills the career guidance gap that most schools have.', name: 'Mrs. Kapoor', role: 'High School Teacher', initials: 'MK' },
  ];

  return (
    <main>
      {/* ======================== HERO ======================== */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.heroOrb1} />
          <div className={styles.heroOrb2} />
          <div className={styles.heroOrb3} />
        </div>
        <div className={`${styles.heroContent} animate-fade-in-up`}>
          <div className={styles.heroTag}>
            <span>✨</span> AI-Powered Career Guidance for Every Student
          </div>
          <h1 className={styles.heroTitle}>
            Your Future Starts <br/>with <span className="text-gradient">MyMate</span>
          </h1>
          <p className={styles.heroSubtitle}>
            The all-in-one platform that empowers students to discover their ideal career path, 
            ace competitive exams, and build real-world skills — all powered by intelligent AI guidance.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/career-path" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem', textDecoration: 'none' }}>
              Explore Career Paths
            </Link>
            <a href="#why-mymate" className={styles.btnSecondary}>
              Learn More ↓
            </a>
          </div>
        </div>
      </section>

      {/* ======================== STATS BAR ======================== */}
      <section className={styles.statsBar}>
        <div className={styles.statsGrid}>
          <div className={`${styles.statItem} animate-fade-in-up delay-100`}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>Career Paths Mapped</div>
          </div>
          <div className={`${styles.statItem} animate-fade-in-up delay-200`}>
            <div className={styles.statNumber}>10K+</div>
            <div className={styles.statLabel}>Practice Questions</div>
          </div>
          <div className={`${styles.statItem} animate-fade-in-up delay-300`}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>Competitive Exams</div>
          </div>
          <div className={`${styles.statItem} animate-fade-in-up delay-400`}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>Free for Students</div>
          </div>
        </div>
      </section>

      {/* ======================== WHY MYMATE ======================== */}
      <section className={styles.whySection} id="why-mymate">
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>Why MyMate</div>
            <h2 className={styles.sectionTitle}>
              Why Students <span className="text-gradient">Love</span> MyMate
            </h2>
            <p className={styles.sectionSubtitle}>
              Traditional career guidance is broken. We are fixing it with technology, data, and heart.
            </p>
          </div>
          <div className={styles.whyGrid}>
            {whyItems.map((item, i) => (
              <div key={item.title} className={`${styles.whyCard} animate-fade-in-up delay-${(i % 3 + 1) * 100}`}>
                <div className={styles.whyIcon}>{item.icon}</div>
                <h3 className={styles.whyCardTitle}>{item.title}</h3>
                <p className={styles.whyCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== FEATURES ======================== */}
      <section className={styles.featuresSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>Explore Modules</div>
            <h2 className={styles.sectionTitle}>
              Everything You Need to <span className="text-gradient">Succeed</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Five powerful modules designed to guide, challenge, and grow you — all in one place.
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, i) => (
              <Link href={feature.href} key={feature.title} className={`${styles.featureCard} animate-fade-in-up delay-${(i % 3 + 1) * 100}`}>
                <div className={styles.featureEmoji}>{feature.emoji}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.description}</p>
                <div className={styles.featureArrow}>
                  Explore <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== HOW IT WORKS ======================== */}
      <section className={styles.howSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>How It Works</div>
            <h2 className={styles.sectionTitle}>
              Get Started in <span className="text-gradient">4 Simple Steps</span>
            </h2>
          </div>
          <div className={styles.stepsGrid}>
            {steps.map((step, i) => (
              <div key={step.num} className={`${styles.stepCard} animate-fade-in-up delay-${(i + 1) * 100}`}>
                <div className={styles.stepNumber}>{step.num}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section className={styles.testimonialsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTag}>Testimonials</div>
            <h2 className={styles.sectionTitle}>
              What Our <span className="text-gradient">Users Say</span>
            </h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {testimonials.map((t, i) => (
              <div key={t.name} className={`${styles.testimonialCard} animate-fade-in-up delay-${(i + 1) * 100}`}>
                <div className={styles.testimonialStars}>★★★★★</div>
                <p className={styles.testimonialText}>&ldquo;{t.text}&rdquo;</p>
                <div className={styles.testimonialAuthor}>
                  <div className={styles.testimonialAvatar}>{t.initials}</div>
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== BOTTOM CTA ======================== */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Ready to Discover Your Future?</h2>
            <p className={styles.ctaDesc}>
              Join thousands of students already using MyMate to navigate their career journey with confidence.
            </p>
            <Link href="/career-path" className={styles.ctaButton}>
              Start Your Journey — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      {/* ======================== FOOTER ======================== */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>© 2026 MyMate. Built with ❤️ for students everywhere.</p>
      </footer>
    </main>
  );
}
