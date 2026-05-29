'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: 'Career Path', href: '/career-path' },
    { name: 'Competitive', href: '/competitive' },
    { name: 'General Knowledge', href: '/general-knowledge' },
    { name: 'Practice', href: '/practice' },
    { name: 'Games', href: '/games' },
  ];

  useEffect(() => {
    if (!supabase || !supabase.auth) {
      setLoading(false);
      return;
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    if (supabase && supabase.auth) {
      await supabase.auth.signOut();
      router.push('/');
      router.refresh();
    }
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link href="/" className="logo text-gradient">MyMate</Link>
        
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>

        <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className={`nav-actions ${mobileOpen ? 'mobile-open' : ''}`}>
          {!loading && (
            user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '4px 12px 4px 6px', 
                    background: 'rgba(255, 126, 103, 0.08)', 
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 126, 103, 0.15)'
                  }}
                >
                  <div 
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      background: 'var(--gradient-primary)', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '0.85rem'
                    }}
                  >
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                  <span 
                    style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500, 
                      color: 'var(--text-color)',
                      maxWidth: '120px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                    title={user.email}
                  >
                    {user.email?.split('@')[0]}
                  </span>
                </div>
                <button 
                  onClick={handleSignOut} 
                  className="btn-primary" 
                  style={{ 
                    padding: '8px 16px', 
                    fontSize: '0.9rem', 
                    background: 'none',
                    border: '1px solid var(--color-coral)',
                    color: 'var(--color-coral)',
                    cursor: 'pointer',
                    boxShadow: 'none'
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'inline-block', textAlign: 'center' }}>
                Sign In
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
