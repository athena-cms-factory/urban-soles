import React from 'react';

export default function Footer({ data }) {
  const settingsSource = data?.site_settings || {};
  const settings = Array.isArray(settingsSource) ? (settingsSource[0] || {}) : settingsSource;
  const contactInfo = data?.contact?.[0] || {};
  
  const naam = settings.site_name || 'urban-soles';
  const email = contactInfo.email || settings.email || '';
  const locatie = contactInfo.location || '';
  const btw = contactInfo.btw_nummer || contactInfo.btw || '';
  const linkedin = contactInfo.linkedin_url || contactInfo.linkedin || '';

  const getImageUrl = (url) => {
    if (!url) return '';
    if (typeof url === 'object') url = url.text || url.url || '';
    if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
    const base = import.meta.env.BASE_URL || '/';
    const path = url.startsWith('images/') ? url : `images/${url}`;
    return (base + '/' + path).replace(new RegExp('/+', 'g'), '/');
  };

  return (
    <footer className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 border-t border-slate-800 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
          
          {/* Brand Identity */}
          <div className="space-y-6 relative z-10">
            <h3 className="text-4xl font-serif font-bold text-white tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400" data-dock-type="text" data-dock-bind="site_settings.0.site_name">{naam}</span>
            </h3>
            {settings.tagline && (
              <p className="text-lg leading-relaxed font-light text-slate-400 max-w-sm">
                <span data-dock-type="text" data-dock-bind="site_settings.0.tagline">{settings.tagline}</span>
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-6 relative z-10">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Contact</h4>
            <ul className="space-y-4">
              {email && (
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <i className="fa-solid fa-envelope text-accent group-hover:scale-110 transition-transform"></i>
                  </div>
                  <a href={`mailto:${email}`} className="hover:text-white transition-colors" data-dock-type="text" data-dock-bind="contact.0.email">{email}</a>
                </li>
              )}
              {locatie && (
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <i className="fa-solid fa-location-dot text-accent group-hover:scale-110 transition-transform"></i>
                  </div>
                  <span className="group-hover:text-white transition-colors" data-dock-type="text" data-dock-bind="contact.0.location">{locatie}</span>
                </li>
              )}
              {linkedin && (
                <li className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <i className="fa-brands fa-linkedin text-accent group-hover:scale-110 transition-transform"></i>
                  </div>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" data-dock-type="link" data-dock-bind="contact.0.linkedin_url">Connect op LinkedIn</a>
                </li>
              )}
            </ul>
          </div>

          {/* Legal / Company Info */}
          <div className="space-y-6 relative z-10">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Bedrijfsgegevens</h4>
            <div className="space-y-4">
              {btw && (
                <p className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
                  <span className="text-slate-500 font-medium">BTW:</span> 
                  <span data-dock-type="text" data-dock-bind="contact.0.btw_nummer">{btw}</span>
                </p>
              )}
              <p className="text-sm font-light leading-relaxed opacity-80 hover:opacity-100 transition-opacity">
                <span data-dock-type="text" data-dock-bind="site_settings.0.footer_text">{settings.footer_text || 'Professionele website geleverd door Athena CMS Factory.'}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
          <p>&copy; {new Date().getFullYear()} {naam}. Alle rechten voorbehouden.</p>
          <div className="flex items-center gap-2 opacity-50">
            <img src={getImageUrl('athena-icon.svg')} alt="Athena Logo" className="w-5 h-5" />
            <span>Gemaakt met Athena CMS Factory</span>
          </div>
        </div>
      </div>
    </footer>
  );
}