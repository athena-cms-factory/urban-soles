import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';

const Section = ({ data }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const sectionOrder = data.section_order || [];
  const categories = data.categorieen || [];

  useEffect(() => {
    if (window.athenaScan) {
      window.athenaScan(data);
    }
  }, [data, sectionOrder]);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (typeof url === 'object') url = url.text || url.url || '';
    if (url.startsWith('http') || url.startsWith('data:')) return url;
    const base = import.meta.env.BASE_URL || '/';
    return (base + '/images/' + url).replace(new RegExp('/+', 'g'), '/');
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col">
      {sectionOrder.map((sectionName, idx) => {
        let items = data[sectionName] || [];
        if (items.length === 0) return null;

        // Verberg de losse categorieen-sectie (de tekst-opsomming)
        if (sectionName === 'categorieen') return null;

        if (sectionName === 'basisgegevens') {
          const hero = items[0];
          const heroTitle = hero.titel || hero.hero_header || hero.site_naam;
          return (
            <section key={idx} id="hero" data-dock-section="basisgegevens" className="relative w-full h-auto min-h-[var(--hero-height,85vh)] max-h-[var(--hero-max-height,150vh)] aspect-[var(--hero-aspect-ratio,16/9)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0">
                <img src={getImageUrl(hero.hero_afbeelding || hero.foto_url)} className="hero-day absolute inset-0 w-full h-full object-cover object-top" data-dock-type="media" data-dock-bind="basisgegevens.0.hero_afbeelding" />
                <img src={getImageUrl('hero-urban-soles-night.webp')} alt="" aria-hidden="true" className="hero-night absolute inset-0 w-full h-full object-cover object-top" />
                <div className="hero-halo absolute inset-0 z-20 pointer-events-none" style={{ 
                  backgroundImage: 'radial-gradient(ellipse 46% 54% at 50% 46%, rgba(2,6,23,.72) 0%, rgba(2,6,23,.40) 58%, transparent 100%), linear-gradient(to bottom, var(--hero-overlay-start, rgba(0,0,0,0.6)), var(--hero-overlay-end, rgba(0,0,0,0.6)))' 
                }}></div>
              </div>
              <div className="relative z-10 text-center px-6 max-w-5xl">
                <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight drop-shadow-2xl">
                  <span data-dock-type="text" data-dock-bind="basisgegevens.0.titel">{heroTitle}</span>
                </h1>
                <div className="h-2 w-32 bg-accent mx-auto mb-10 rounded-full shadow-lg shadow-accent/50"></div>
                <div className="flex flex-col items-center gap-12">
                    <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light italic">
                       <span data-dock-type="text" data-dock-bind="basisgegevens.0.ondertitel">{hero.ondertitel || hero.introductie}</span>
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button onClick={(e) => { 
                if (e.shiftKey) return; 
                const target = document.getElementById("contact");
                if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
            }} data-dock-type="link" data-dock-bind="site_settings.0.titel">{}</button>
                        
                    </div>
                </div>
              </div>
            </section>
          );
        }

        if (sectionName.includes('product') || sectionName.includes('shop')) {
          const filteredItems = selectedCategory === 'Alle' 
            ? items 
            : items.filter(item => item.categorie === selectedCategory);

          return (
            <section key={idx} id={sectionName} data-dock-section={sectionName} className="py-24 px-6 bg-background">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-serif font-bold mb-8 text-center text-primary uppercase tracking-widest">{sectionName.replace(/_/g, ' ')}</h2>
                
                {/* Category Filter Bar */}
                {categories.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-4 mb-16">
                    <button 
                      onClick={() => setSelectedCategory('Alle')}
                      className={`px-6 py-2 rounded-full font-bold transition-all ${selectedCategory === 'Alle' ? 'bg-accent text-white shadow-lg scale-105' : 'bg-surface text-primary hover:bg-slate-100 dark:hover:bg-white/10'}`}
                    >
                      Alle
                    </button>
                    {categories.map((cat, cIdx) => (
                      <button 
                        key={cIdx}
                        onClick={() => setSelectedCategory(cat.naam)}
                        className={`px-6 py-2 rounded-full font-bold transition-all ${selectedCategory === cat.naam ? 'bg-accent text-white shadow-lg scale-105' : 'bg-surface text-primary hover:bg-slate-100 dark:hover:bg-white/10'}`}
                      >
                        {cat.naam}
                      </button>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {filteredItems.map((item, index) => {
                    const priceValue = parseFloat(String(item.prijs || 0).replace(/[^0-9.,]/g, '').replace(',', '.'));
                    const titleKey = Object.keys(item).find(k => /naam|titel/i.test(k)) || 'naam';
                    const imgKey = Object.keys(item).find(k => /foto|afbeelding|url/i.test(k)) || 'product_foto_url';
                    return (
                      <article key={index} className="flex flex-col bg-surface rounded-[2.5rem] shadow-xl overflow-hidden transition-all hover:-translate-y-2 hover:shadow-2xl group border border-slate-100 dark:border-white/10">
                        <div className="aspect-square overflow-hidden flex-shrink-0 relative">
                          <img src={getImageUrl(item[imgKey] || item.afbeelding || item.foto)} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-dock-type="media" data-dock-bind={`${sectionName}.${index}.${imgKey}`} />
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                          {item.categorie && (
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-xs font-black uppercase tracking-tighter text-accent shadow-sm dark:bg-white/10 dark:text-blue-300">
                              {item.categorie}
                            </div>
                          )}
                        </div>
                        <div className="p-8 flex flex-col flex-grow text-center">
                          <h3 className="text-2xl font-bold mb-4 text-primary min-h-[4rem] flex items-center justify-center">
                            <span data-dock-type="text" data-dock-bind={`${sectionName}.${index}.${titleKey}`}>{item[titleKey]}</span>
                          </h3>
                          <div className="text-accent font-bold mt-auto text-3xl mb-6">€{priceValue.toFixed(2)}</div>
                          <div className="flex flex-col gap-3">
                            <button onClick={() => addToCart({ id: item.id || index, title: item[titleKey], price: priceValue, image: item[imgKey] })} className="w-full py-4 bg-[var(--color-button-bg)] text-white rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg active:scale-95 text-lg uppercase tracking-wider">In winkelwagen</button>
                            
                          </div>
                        </div>
                      </article>
                    );
                  })}

                  {/* Slotvuller: vult de lege plek op de laatste rij (alleen op desktop, 3 kolommen) */}
                  {filteredItems.length > 0 && filteredItems.length % 3 !== 0 && (
                    <div
                      className="grid-filler hidden lg:flex flex-col justify-between relative overflow-hidden rounded-[2.5rem] border border-white/10 p-10 text-white shadow-xl"
                      style={{
                        gridColumn: `span ${3 - (filteredItems.length % 3)}`,
                        backgroundImage: 'radial-gradient(80% 120% at 100% 0%, rgba(59,130,246,.30) 0%, transparent 65%), linear-gradient(135deg, #0f172a 0%, #070b1a 100%)',
                      }}
                    >
                      <span aria-hidden="true" className="pointer-events-none absolute -right-4 -bottom-10 text-[13rem] font-black leading-none text-white/[0.04]" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        US
                      </span>
                      <div className="relative z-10">
                        <p className="text-[10px] uppercase tracking-[0.35em] text-blue-300 mb-6" style={{ fontFamily: 'ui-monospace, SFMono-Regular, monospace' }}>
                          Urban Soles / Est. Amsterdam
                        </p>
                        <h3 className="text-3xl md:text-5xl font-bold leading-tight max-w-xl text-white" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                          Every step tells a story.
                        </h3>
                        <p className="mt-5 text-slate-400 max-w-md leading-relaxed font-light">
                          {selectedCategory !== 'Alle'
                            ? `Op zoek naar iets anders? Bekijk alle modellen uit onze collectie.`
                            : 'Van de straten van Amsterdam naar jouw collectie. Ontdek de drops die je niet wilt missen.'}
                        </p>
                      </div>
                      <button
                        onClick={() => selectedCategory === 'Alle'
                          ? document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                          : setSelectedCategory('Alle')}
                        className="relative z-10 group inline-flex items-center gap-3 self-start px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-400 hover:text-slate-950 transition-all duration-300 text-sm font-bold"
                      >
                        {selectedCategory === 'Alle' ? 'Neem contact op' : 'Bekijk alle modellen'}
                        <i className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"></i>
                      </button>
                    </div>
                  )}
                </div>
                {filteredItems.length === 0 && (
                  <div className="text-center py-20 text-slate-400 italic text-xl">Geen producten gevonden in deze categorie.</div>
                )}
              </div>
            </section>
          );
        }

        return (
          <section key={idx} id={sectionName} data-dock-section={sectionName} className={'py-24 px-6 ' + (idx % 2 === 1 ? 'bg-slate-50 dark:bg-[#0b1220]' : 'bg-white dark:bg-[#0f172a]')}>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col items-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-4 capitalize">
                  {sectionName.replace(/_/g, ' ')}
                </h2>
                <div className="h-1.5 w-24 bg-accent rounded-full"></div>
              </div>
              
              <div className="space-y-20">
                {items.map((item, index) => {
                   const titleKey = Object.keys(item).find(k => /naam|titel|onderwerp|header/i.test(k));
                   const textKeys = Object.keys(item).filter(k => k !== titleKey && !/foto|afbeelding|url|link|id/i.test(k));
                   const imgKey = Object.keys(item).find(k => /foto|afbeelding|url/i.test(k));
                   const isEven = index % 2 === 0;

                   return (
                     <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-20 items-center`}>
                       {imgKey && item[imgKey] && (
                         <div className="w-full md:w-1/2 aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl rotate-1 group hover:rotate-0 transition-transform duration-500 border-8 border-white">
                           <img src={getImageUrl(item[imgKey])} className="w-full h-full object-cover" data-dock-type="media" data-dock-bind={`${sectionName}.${index}.${imgKey}`} />
                         </div>
                       )}
                       <div className="flex-1 text-center md:text-left">
                         {titleKey && (
                           <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
                               <h3 className="text-3xl font-serif font-bold text-primary leading-tight flex-1">
                                 <span data-dock-type="text" data-dock-bind={`${sectionName}.${index}.${titleKey}`}>{item[titleKey]}</span>
                               </h3>
                               
                           </div>
                         )}
                         {textKeys.map(tk => (
                           <div key={tk} className="text-xl leading-relaxed text-slate-600 mb-6 font-light">
                             <span data-dock-type="text" data-dock-bind={`${sectionName}.${index}.${tk}`}>{item[tk]}</span>
                           </div>
                         ))}
                         {(item.link || item.link_url) && (
                            <a href={"#"} data-dock-type="link" data-dock-bind="site_settings.0.titel">
                                {item.link || "Lees meer"} <i className="fa-solid fa-arrow-right text-sm ml-1"></i>
                            </a>
                         )}
                       </div>
                     </div>
                   );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Section;