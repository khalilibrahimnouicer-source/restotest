"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  id: string;
  name: string;
  notes: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
};

const defaults: Product[] = [
  { id:"creme-brulee", name:"Crème Brûlée", notes:"Vanille • Caramel • Sucre roux", description:"Une gourmandise chaude et enveloppante, pensée comme un dessert ambré.", price:"40 €", image:"/products/photos/creme-real.svg", featured:true },
  { id:"flame-berry", name:"Flame Berry", notes:"Framboise • Miel • Crème fouettée", description:"Un accord fruité, doux et lumineux, relevé par une texture crémeuse.", price:"40 €", image:"/products/photos/flame-real.svg", featured:true },
  { id:"nectar", name:"Nectar", notes:"Fraise • Framboise • Poire", description:"Un nectar fruité et juteux, frais dès les premières notes.", price:"40 €", image:"/products/photos/nectar-real.svg" },
  { id:"eclat-vanille", name:"Éclat de Vanille", notes:"Vanille • Ambre • Fleurs exotiques", description:"Une vanille solaire, travaillée autour d'un fond ambré élégant.", price:"40 €", image:"/products/photos/eclat-real.svg" }
];

function getProducts(): Product[] {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem("mhl-products");
    return raw ? JSON.parse(raw) : defaults;
  } catch { return defaults; }
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>(defaults);
  const [active, setActive] = useState<Product | null>(null);

  useEffect(() => setProducts(getProducts()), []);

  const featured = useMemo(() => products.filter(p => p.featured).slice(0, 2), [products]);

  return (
    <main>
      <div className="announcement">LANCEMENT · EXTRAIT DE PARFUM · 40 €</div>

      <nav className="nav">
        <a className="brand" href="#"><img src="/products/logo.svg" alt="Maison Haute Lumière Paris" /></a>
        <div className="navLinks">
          <a href="#collection">Collection</a>
          <a href="#livraison">Livraison</a>
          <a href="#maison">La maison</a>
        </div>
        <a className="navCta" href="https://story.snapchat.com/u/parfums.byrsd?share_id=zHX7RBQuRW2baMBpQtIe6Q&locale=fr_FR" target="_blank" rel="noreferrer">Snapchat ↗</a>
      </nav>

      <section className="hero">
        <div className="heroGlow" />
        <div className="heroCopy">
          <p className="eyebrow">MAISON HAUTE LUMIÈRE · PARIS</p>
          <h1>Le parfum,<br /><em>en extrait.</em></h1>
          <p className="heroText">Des sillages gourmands, fruités et ambrés. Une collection confidentielle pensée pour laisser une présence.</p>
          <div className="heroActions">
            <a className="button primary" href="#collection">Découvrir la collection</a>
            <a className="button ghost" href="https://story.snapchat.com/u/parfums.byrsd?share_id=zHX7RBQuRW2baMBpQtIe6Q&locale=fr_FR" target="_blank" rel="noreferrer">Commander sur Snapchat</a>
          </div>
          <div className="heroMeta"><span>40 €</span><i /> Extrait de parfum <i /> Livraison 92 & alentours</div>
        </div>
        <div className="heroBottle">
          <div className="orb" />
          <img src="/products/photos/creme-real.svg" alt="Crème Brûlée" />
          <div className="heroBadge">OFFRE DE<br /><strong>LANCEMENT</strong></div>
        </div>
      </section>

      <section className="intro" id="maison">
        <p className="eyebrow">L'IDENTITÉ</p>
        <h2>Une signature <span>chaude, précieuse, lumineuse.</span></h2>
        <p>Maison Haute Lumière Paris met en scène des extraits de parfum autour d'accords immédiatement reconnaissables : vanille, caramel, fruits rouges, miel, ambre et fleurs exotiques.</p>
      </section>

      <section className="collection" id="collection">
        <div className="sectionHead">
          <div><p className="eyebrow">LA COLLECTION</p><h2>Nos extraits</h2></div>
          <p>Chaque création · <strong>40 €</strong></p>
        </div>
        <div className="grid">
          {products.map((p) => (
            <article className="productCard" key={p.id}>
              <button className="productVisual" onClick={() => setActive(p)} aria-label={"Voir " + p.name}>
                <img src={p.image} alt={p.name} />
                <span>Voir le parfum</span>
              </button>
              <div className="productInfo">
                <div><h3>{p.name}</h3><p>{p.notes}</p></div>
                <strong>{p.price}</strong>
              </div>
              <p className="productDesc">{p.description}</p>
              <a className="textLink" href="https://story.snapchat.com/u/parfums.byrsd?share_id=zHX7RBQuRW2baMBpQtIe6Q&locale=fr_FR" target="_blank" rel="noreferrer">Commander ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="launch">
        <div><p className="eyebrow">OFFRE DE LANCEMENT</p><h2>40 € <span>l'extrait.</span></h2><p>Une collection courte, des parfums qui se remarquent. Disponible à Nanterre, dans le 92 et alentours, ou par colis.</p></div>
        <a className="button primary" href="https://story.snapchat.com/u/parfums.byrsd?share_id=zHX7RBQuRW2baMBpQtIe6Q&locale=fr_FR" target="_blank" rel="noreferrer">Nous contacter</a>
      </section>

      <section className="delivery" id="livraison">
        <div className="deliveryCard"><span>01</span><h3>Remise locale</h3><p>Nanterre · Hauts-de-Seine · alentours</p></div>
        <div className="deliveryCard"><span>02</span><h3>Expédition</h3><p>Commande envoyée par colis en dehors de la zone locale.</p></div>
        <div className="deliveryCard"><span>03</span><h3>Commande simple</h3><p>Écrivez-nous sur Snapchat pour connaître la disponibilité et organiser la livraison.</p></div>
      </section>

      <footer>
        <img src="/products/logo.svg" alt="" />
        <p>Maison Haute Lumière Paris · Extraits de parfum</p>
        <div><a href="https://story.snapchat.com/u/parfums.byrsd?share_id=zHX7RBQuRW2baMBpQtIe6Q&locale=fr_FR" target="_blank" rel="noreferrer">Snapchat</a><a href="/admin">Admin</a></div>
      </footer>

      {active && <div className="modalBackdrop" onClick={() => setActive(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button className="close" onClick={() => setActive(null)}>×</button>
          <img src={active.image} alt={active.name} />
          <div><p className="eyebrow">EXTRAIT DE PARFUM</p><h2>{active.name}</h2><p className="notes">{active.notes}</p><p>{active.description}</p><strong className="modalPrice">{active.price}</strong><a className="button primary" href="https://story.snapchat.com/u/parfums.byrsd?share_id=zHX7RBQuRW2baMBpQtIe6Q&locale=fr_FR" target="_blank" rel="noreferrer">Commander sur Snapchat</a></div>
        </div>
      </div>}
    </main>
  );
}