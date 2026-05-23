'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: 'Career Path', href: '/career-path' },
    { name: 'Competitive', href: '/competitive' },
    { name: 'General Knowledge', href: '/general-knowledge' },
    { name: 'Practice', href: '/practice' },
    { name: 'Games', href: '/games' },
  ];

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link href="/" className="logo text-gradient">MyMate</Link>
        
        <ul className="nav-links">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
        
        <div className="nav-actions">
          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Sign In</button>
        </div>
      </div>
    </nav>
  );
}
