'use client'

import { useState } from 'react'
import { ArrowRight, Check, Clock3, MapPin, Menu, MessageCircle, Plus, ShoppingBag, Star, X } from 'lucide-react'

const cakes = [
  { name: 'Velvet Cloud', detail: 'Vanilla bean · Raspberry · Rose', price: '$68', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85', tag: 'Bestseller' },
  { name: 'Midnight Ganache', detail: 'Dark chocolate · Sea salt · Espresso', price: '$74', image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85', tag: 'Rich & indulgent' },
  { name: 'Strawberry Élan', detail: 'Fresh strawberry · Mascarpone · Lemon', price: '$72', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', tag: 'Seasonal' },
]

const testimonials = [
  ['“The most beautiful cake I have ever ordered. Every bite felt like a little celebration.”', 'Amelia R.', 'Birthday cake, Brooklyn'],
  ['“The team turned my vague idea into something extraordinary. Our wedding guests are still talking about it.”', 'Nora & James', 'Wedding cake, Manhattan'],
  ['“Looks like art, tastes even better. Velvet Cloud is now a standing order in our house.”', 'Clara M.', 'Repeat customer'],
]

export default function CakeHaven() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8f3] text-[#211916]">
      <div className="announcement"><span>Made fresh in small batches</span><span className="announcement-dot">•</span><span>Local delivery across Brooklyn & Manhattan</span></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Cake Haven home"><span className="brand-mark">CH</span><span>Cake Haven<small>EST. 2018 · NEW YORK</small></span></a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <button onClick={() => scrollTo('collection')}>The collection</button>
          <button onClick={() => scrollTo('story')}>Our story</button>
          <button onClick={() => scrollTo('reviews')}>Kind words</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
        <div className="header-actions"><button className="bag-button" onClick={() => setCartCount((count) => count + 1)} aria-label={`Shopping bag, ${cartCount} items`}><ShoppingBag size={18} /> <span>Bag ({cartCount})</span></button><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button></div>
      </header>

      <section id="top" className="hero-section">
        <div className="hero-copy"><p className="eyebrow">Patisserie & celebration cakes</p><h1>Make a little<br /><em>more</em> of today.</h1><p className="hero-lede">Hand-finished cakes for the moments that deserve a little more sweetness. Made with excellent ingredients, generous spirit, and absolutely no shortcuts.</p><div className="hero-actions"><button className="button button-dark" onClick={() => scrollTo('collection')}>Shop the collection <ArrowRight size={16} /></button><button className="text-link" onClick={() => scrollTo('contact')}>Plan something custom <ArrowRight size={15} /></button></div><div className="hero-proof"><span><strong>4.9</strong> <Star size={13} fill="currentColor" /> <small>from 300+ celebrations</small></span><span className="proof-line" /><span><Clock3 size={15} /> <small>48 hr pre-order</small></span></div></div>
        <div className="hero-art"><div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=90" alt="A beautifully decorated pink celebration cake" /></div><div className="hero-note"><span>01</span><span>Sweetness<br />with intention</span></div><div className="hero-stamp">Baked<br />with love</div></div>
      </section>

      <section className="marquee" aria-label="Cake Haven values"><span>Slowly made</span><i>✦</i><span>Always memorable</span><i>✦</i><span>Made in New York</span><i>✦</i><span>Slowly made</span><i>✦</i></section>

      <section id="collection" className="section collection-section"><div className="section-heading"><div><p className="eyebrow">The collection</p><h2>Worth gathering for.</h2></div><p>Our signature cakes are designed to be shared, savored, and remembered. Choose your favorite, then make it yours.</p></div><div className="cake-grid">{cakes.map((cake) => <article className="cake-card" key={cake.name}><div className="cake-image"><img src={cake.image} alt={`${cake.name} cake`} /><span>{cake.tag}</span><button aria-label={`Add ${cake.name} to bag`} onClick={() => setCartCount((count) => count + 1)}><Plus size={20} /></button></div><div className="cake-info"><div><h3>{cake.name}</h3><p>{cake.detail}</p></div><strong>{cake.price}</strong></div></article>)}</div><button className="button button-outline collection-button" onClick={() => scrollTo('contact')}>Explore all cakes <ArrowRight size={16} /></button></section>

      <section id="story" className="story-section"><div className="story-image"><img src="https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=1200&q=85" alt="Freshly baked pastries in a bakery kitchen" /><span className="image-caption">From our kitchen<br />to your table</span></div><div className="story-copy"><p className="eyebrow">The Cake Haven way</p><h2>Good things take<br /><em>time.</em></h2><p>We believe dessert should feel personal. That means real butter, seasonal fruit, chocolate worth writing home about, and a whole lot of care in every swirl and crumb.</p><p>Every cake is baked to order in our Brooklyn kitchen, hand-decorated by our small team, and delivered with a note for the person you are celebrating.</p><button className="text-link" onClick={() => scrollTo('contact')}>Meet the bakers <ArrowRight size={15} /></button><div className="story-stats"><div><strong>6+</strong><span>years of<br />sweet making</span></div><div><strong>100%</strong><span>real, thoughtful<br />ingredients</span></div></div></div></section>

      <section id="reviews" className="section reviews-section"><div className="section-heading centered"><p className="eyebrow">Kind words</p><h2>Don&apos;t just take our word for it.</h2></div><div className="reviews-grid">{testimonials.map(([quote, author, occasion]) => <figure className="review-card" key={author}><div className="stars">★★★★★</div><blockquote>{quote}</blockquote><figcaption><strong>{author}</strong><span>{occasion}</span></figcaption></figure>)}</div></section>

      <section id="contact" className="contact-section"><div><p className="eyebrow">Let&apos;s make it special</p><h2>Have a celebration<br /><em>in mind?</em></h2><p>Tell us what you&apos;re dreaming up. We&apos;ll get back to you within one business day with ideas, availability, and a little magic.</p><div className="contact-details"><span><MapPin size={17} /> 218 Court Street, Brooklyn</span><span><MessageCircle size={17} /> hello@cakehaven.co</span></div></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>{submitted ? <div className="success-state"><span><Check /></span><h3>We got your note.</h3><p>Thank you — we&apos;ll be in touch soon with something sweet.</p><button type="button" className="text-link" onClick={() => setSubmitted(false)}>Send another note <ArrowRight size={15} /></button></div> : <><div className="form-title"><span>Custom orders</span><span>Reply in 1 day</span></div><label>Name<input required type="text" placeholder="Your name" /></label><label>Email<input required type="email" placeholder="you@email.com" /></label><label>Tell us a little about your celebration<textarea required rows={3} placeholder="Date, servings, flavor dreams..." /></label><button className="button button-dark form-button">Start a conversation <ArrowRight size={16} /></button></>}</form></section>

      <footer><div className="footer-top"><a className="brand footer-brand" href="#top"><span className="brand-mark">CH</span><span>Cake Haven<small>EST. 2018 · NEW YORK</small></span></a><p>Beautiful cakes for ordinary days<br />and extraordinary ones.</p><div className="socials"><a href="https://instagram.com" aria-label="Instagram">IG</a><a href="mailto:hello@cakehaven.co" aria-label="Email">@</a></div></div><div className="footer-bottom"><span>© 2026 Cake Haven Patisserie</span><span>Made with care in Brooklyn, NY</span><span>Privacy · Terms</span></div></footer>
    </main>
  )
}
