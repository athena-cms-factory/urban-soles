import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const THEME_KEY = 'urban-soles-theme';

function Header({ siteSettings = {} }) {
  const { cartCount, setIsCartOpen } = useCart();
  const settings = Array.isArray(siteSettings) ? (siteSettings[0] || {}) : (siteSettings || {});
  const siteName = settings.site_name || 'urban-soles';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    window.addEventListener('themechange', onTheme);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('themechange', onTheme);
    };
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem(THEME_KEY, next ? 'dark' : 'light'); } catch (e) { /* private mode */ }
    setIsDark(next);
    window.dispatchEvent(new CustomEvent('themechange', { detail: next ? 'dark' : 'light' }));
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (typeof url === 'object') url = url.text || url.url || '';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;

    const base = import.meta.env.BASE_URL || '/';
    const rootAsset = url === 'athena-icon.svg' || url === 'site-logo.svg';
    const path = url.startsWith('images/') || rootAsset ? url : `images/${url}`;
    return (base + '/' + path).replace(new RegExp('/+', 'g'), '/');
  };

  const scrollTo = (id) => () => {
    setMenuOpen(false);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const displayLogo = settings.site_logo_image || 'athena-icon.svg';
  const navLinks = [
    { id: 'top', label: 'Home', color: '#16a34a' },
    { id: 'producten', label: 'Collectie', color: '#2563eb' },
    { id: 'contact', label: 'Contact', color: '#dc2626' },
  ];

  const cartBtn = isDark
    ? 'border-white/20 text-white hover:bg-blue-600 hover:border-blue-600'
    : 'border-blue-500 bg-white text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-[0_6px_18px_-10px_rgba(37,99,235,.8)]';

  const actionBtn = isDark
    ? 'border-white/20 text-white hover:bg-blue-600 hover:border-blue-600'
    : 'border-slate-300 text-primary hover:bg-[#e2541b] hover:text-white hover:border-[#e2541b]';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[1000] px-4 sm:px-6 transition-all duration-500"
      style={{
        height: scrolled ? '68px' : '84px',
        backgroundColor: isDark
          ? (scrolled ? 'rgba(7, 11, 26, 0.99)' : 'rgba(11, 18, 32, 0.97)')
          : (scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.94)'),
        backdropFilter: 'blur(18px)',
        borderBottom: isDark
          ? (scrolled ? '1px solid rgba(59, 130, 246, 0.45)' : '1px solid rgba(59, 130, 246, 0.22)')
          : (scrolled ? '1px solid rgba(15, 23, 42, 0.14)' : '1px solid rgba(15, 23, 42, 0.08)'),
        boxShadow: scrolled
          ? (isDark ? '0 12px 40px -20px rgba(0,0,0,.85)' : '0 12px 40px -24px rgba(15,23,42,.35)')
          : 'none',
      }}
    >
      {!isDark && (
        <span aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 w-full h-[2px]"
          style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,179,71,0) 0%, #ffb347 18%, #ff4500 50%, #ffb347 82%, rgba(255,179,71,0) 100%)' }} />
      )}
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center gap-4">
        {/* Logo & Identity */}
        <Link to="/" onClick={scrollTo('top')} className="flex items-center gap-3 group shrink-0">
          <span className="w-10 md:w-11 h-10 md:h-11 rounded-xl overflow-hidden bg-white/10 border border-white/15 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
            <img
              src={getImageUrl(displayLogo)}
              alt=""
              className="w-full h-full object-contain"
              data-dock-type="media"
              data-dock-bind="site_settings.0.site_logo_image"
            />
          </span>
          <span className="flex flex-col">
            <span
              className={`text-lg md:text-xl leading-none font-bold tracking-tight ${isDark ? 'text-white' : 'text-blue-700'}`}
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              <span data-dock-type="text" data-dock-bind="site_settings.0.site_name">{siteName}</span>
            </span>
            <span
              className={`hidden sm:block text-[8px] uppercase tracking-[0.28em] leading-none mt-1.5 ${isDark ? 'text-blue-300' : 'text-[#e2541b]'}`}
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}
            >
              Amsterdam · Premium Sneakers
            </span>
          </span>
        </Link>

        {/* Navigatie (desktop) */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={scrollTo(link.id)}
              className={`relative py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors group ${isDark ? 'text-slate-300 hover:text-white' : 'text-[var(--nav-color)] hover:opacity-70'}`}
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', '--nav-color': link.color }}
            >
              {link.label}
              <span className={`absolute left-0 bottom-0 w-0 h-px group-hover:w-full transition-all duration-300 ${isDark ? 'bg-blue-500' : 'bg-[var(--nav-color)]'}`}></span>
            </button>
          ))}
        </div>

        {/* Acties */}
        <div className="flex items-center gap-2 md:gap-3">
          <button
            onClick={toggleTheme}
            className={`w-10 md:w-11 h-10 md:h-11 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-90 ${actionBtn}`}
            aria-label={isDark ? 'Wissel naar lichte modus' : 'Wissel naar donkere modus'}
            title={isDark ? 'Lichte modus' : 'Donkere modus'}
          >
            <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-sm`}></i>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className={`group relative w-10 md:w-11 h-10 md:h-11 rounded-full border flex items-center justify-center transition-all duration-300 active:scale-90 ${cartBtn}`}
            aria-label="Winkelwagen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 stroke-[1.2] transition-transform duration-500 group-hover:-rotate-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className={`absolute -top-1 -right-1 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 group-hover:scale-110 transition-all duration-300 ${isDark ? 'bg-blue-500' : 'bg-blue-600'} ${isDark ? 'border-[#070b1a]' : 'border-white'}`}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobiel menu */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            className={`md:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${actionBtn}`}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-sm`}></i>
          </button>
        </div>
      </div>

      {/* Mobiel dropdown */}
      {menuOpen && (
        <div className={`md:hidden absolute top-full right-4 left-4 sm:right-6 sm:left-6 mt-2 rounded-2xl overflow-hidden border backdrop-blur-xl shadow-2xl ${isDark ? 'border-white/10 bg-[#070b1a]/95' : 'border-slate-200 bg-white/95'}`}>
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={scrollTo(link.id)}
              className={`block w-full text-left px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] transition-colors border-b last:border-0 ${isDark ? 'text-slate-300 hover:text-white hover:bg-white/5 border-white/5' : 'text-[var(--nav-color)] hover:opacity-70 hover:bg-slate-50 border-slate-100'}`}
              style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace', '--nav-color': link.color }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Header;
