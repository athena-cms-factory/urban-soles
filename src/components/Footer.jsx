import React from 'react';

const SIZES = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

export default function Footer({ data }) {
  const settingsSource = data?.site_settings || {};
  const settings = Array.isArray(settingsSource) ? (settingsSource[0] || {}) : settingsSource;
  const contactInfo = data?.contact?.[0] || {};

  const naam = settings.site_name || 'Urban Soles';
  const email = contactInfo.email || settings.email || 'hello@urbansoles.com';
  const locatie = contactInfo.location || 'Sneakerstraat 42, 1011 AB Amsterdam';
  const btw = contactInfo.btw_nummer || contactInfo.btw || 'BE 0123.456.789';
  const linkedin = contactInfo.linkedin_url || contactInfo.linkedin || 'https://linkedin.com/company/urbansoles';

  const getImageUrl = (url) => {
    if (!url) return '';
    if (typeof url === 'object') url = url.text || url.url || '';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
    const base = import.meta.env.BASE_URL || '/';
    const rootAsset = url === 'athena-icon.svg' || url === 'site-logo.svg';
    const path = url.startsWith('images/') || rootAsset ? url : `images/${url}`;
    return (base + '/' + path).replace(new RegExp('/+', 'g'), '/');
  };

  const mono = { fontFamily: 'ui-monospace, SFMono-Regular, monospace' };
  const serif = { fontFamily: '"Playfair Display", Georgia, serif' };
  const scrollTo = (id) => () => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'top', label: 'Home' },
    { id: 'producten', label: 'Collectie' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer id="contact" data-dock-section="footer" className="site-footer relative overflow-hidden text-slate-600 dark:text-slate-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">

        {/* ===== DE TICKET ===== */}
        <div className="relative rounded-[2rem] border border-slate-200 bg-white/70 shadow-[0_30px_80px_-50px_rgba(15,23,42,.35)] overflow-hidden dark:border-white/10 dark:bg-white/[0.025] dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,.9)]">
          {/* Perforatie met twee uitstansingen */}
          <div className="relative h-px border-t-2 border-dashed border-slate-300 mx-2 md:mx-6 dark:border-white/20">
            <span className="absolute -left-3 md:-left-4 -top-[9px] w-4 h-4 rounded-full bg-[#eef2f7] shadow-inner dark:bg-white/90"></span>
            <span className="absolute -right-3 md:-right-4 -top-[9px] w-4 h-4 rounded-full bg-[#eef2f7] shadow-inner dark:bg-white/90"></span>
          </div>

          <div className="grid lg:grid-cols-[1.6fr_.9fr]">
            {/* --- Linkerhelft: het woordmerk --- */}
            <div className="p-8 md:p-12 lg:p-16 relative">
              <div className="flex items-center gap-4 mb-10">
                <img
                  src={getImageUrl('site-logo.svg')}
                  alt=""
                  className="w-11 h-11 rounded-xl"
                  data-dock-type="media"
                  data-dock-bind="site_settings.0.site_logo_image"
                />
                <span className="text-[10px] uppercase tracking-[0.32em] text-blue-600 dark:text-blue-300" style={mono}>
                  Urban Soles / Drop Archive
                </span>
              </div>

              <h2 className="text-slate-900 dark:text-white font-bold leading-[.85] tracking-tight text-[17vw] sm:text-7xl lg:text-[6.5rem]" style={serif}>
                URBAN<br />
                <span className="text-blue-600 dark:text-blue-300">SOLES.</span>
              </h2>

              <p className="mt-9 max-w-lg text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                <span data-dock-type="text" data-dock-bind="site_settings.0.tagline">
                  {settings.tagline || 'Premium sneakers voor de urban lifestyle. Loop met stijl en comfort.'}
                </span>
              </p>

              <button
                onClick={scrollTo('producten')}
                className="group mt-9 inline-flex items-center gap-4 px-7 py-3.5 rounded-full border border-blue-500/50 text-blue-700 font-bold text-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 dark:border-blue-400/50 dark:text-blue-200 dark:hover:bg-blue-500 dark:hover:text-white"
                style={mono}
              >
                Bekijk de collectie
                <i className="fa-solid fa-arrow-up-right-from-square text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"></i>
              </button>

              {/* Maatbalk — als op een schoenendooslabel */}
              <div className="mt-12 pt-6 border-t border-slate-200 dark:border-white/10">
                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500 mb-4" style={mono}>Size run / EU</p>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {SIZES.map(s => (
                    <span
                      key={s}
                      className={`text-xs tabular-nums ${s === 42 ? 'text-blue-600 font-bold dark:text-blue-300' : 'text-slate-400 dark:text-slate-600'}`}
                      style={mono}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* --- Rechterhelft: het verzendlabel --- */}
            <div className="border-t lg:border-t-0 lg:border-l border-slate-200 bg-slate-50/60 p-8 md:p-12 relative overflow-hidden dark:border-white/10 dark:bg-black/25">
              <span className="absolute top-4 right-6 rotate-6 border-2 border-blue-500/40 text-blue-600/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] dark:border-blue-400/40 dark:text-blue-300/70" style={mono}>
                Limited release
              </span>

              <div className="space-y-8 pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500 mb-2" style={mono}>Drop no.</p>
                    <p className="text-3xl text-slate-900 font-bold tabular-nums dark:text-white" style={mono}>020</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-500 mb-2" style={mono}>Issue</p>
                    <p className="text-sm text-slate-600 dark:text-slate-300" style={mono}>AMS / {new Date().getFullYear()}</p>
                  </div>
                </div>

                <div className="h-px bg-slate-200 dark:bg-white/10"></div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-blue-600 mb-4 dark:text-blue-300" style={mono}>Ship to / Contact</p>
                  <ul className="space-y-4 text-sm">
                    <li>
                      <a href={`mailto:${email}`} className="text-slate-800 hover:text-blue-600 transition-colors break-all dark:text-slate-200 dark:hover:text-blue-300" data-dock-type="text" data-dock-bind="contact.0.email">
                        {email}
                      </a>
                    </li>
                    <li className="text-slate-600 dark:text-slate-300" data-dock-type="text" data-dock-bind="contact.0.location">{locatie}</li>
                    <li>
                      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-blue-600 transition-colors inline-flex items-center gap-2 dark:text-slate-300 dark:hover:text-blue-300" data-dock-type="link" data-dock-bind="contact.0.linkedin_url">
                        <i className="fa-brands fa-linkedin-in text-blue-600 dark:text-blue-300"></i> LinkedIn
                      </a>
                    </li>
                    <li className="text-slate-400 text-xs" data-dock-type="text" data-dock-bind="contact.0.btw_nummer">
                      BTW {btw}
                    </li>
                  </ul>
                </div>

                {/* Barcode — puur decoratief */}
                <div className="pt-2">
                  <div className="footer-barcode h-10 w-full opacity-70" aria-hidden="true"></div>
                  <p className="mt-2 text-[9px] tracking-[0.45em] text-slate-500 dark:text-slate-500" style={mono}>US 020 AMS 42</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ONDER DE TICKET ===== */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-2">
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={scrollTo(link.id)}
                className="text-[10px] uppercase tracking-[0.25em] text-slate-500 hover:text-blue-600 transition-colors dark:text-slate-500 dark:hover:text-blue-300"
                style={mono}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 text-center dark:text-slate-600" style={mono}>
              © {new Date().getFullYear()} {naam} · <span data-dock-type="text" data-dock-bind="site_settings.0.footer_text">{settings.footer_text || 'Athena CMS Factory'}</span>
            </p>
            <button
              onClick={scrollTo('top')}
              aria-label="Terug naar boven"
              className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300 dark:border-white/15 dark:text-slate-400 dark:hover:bg-blue-500 dark:hover:border-blue-500 dark:hover:text-white"
            >
              <i className="fa-solid fa-arrow-up text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
