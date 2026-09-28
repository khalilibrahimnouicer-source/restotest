"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type Product = { id:string; name:string; notes:string; description:string; price:string; image:string; featured?:boolean };
const defaults: Product[] = [
  { id:"creme-brulee", name:"Crème Brûlée", notes:"Vanille • Caramel • Sucre roux", description:"Une gourmandise chaude et enveloppante.", price:"40 €", image:"/products/creme-brulee.svg", featured:true },
  { id:"flame-berry", name:"Flame Berry", notes:"Framboise • Miel • Crème fouettée", description:"Un accord fruité, doux et lumineux.", price:"40 €", image:"/products/flame-berry.svg", featured:true },
  { id:"nectar", name:"Nectar", notes:"Fraise • Framboise • Poire", description:"Un nectar fruité et juteux.", price:"40 €", image:"/products/nectar.svg" },
  { id:"eclat-vanille", name:"Éclat de Vanille", notes:"Vanille • Ambre • Fleurs exotiques", description:"Une vanille solaire sur un fond ambré.", price:"40 €", image:"/products/eclat-vanille.svg" }
];

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({id:"",name:"",notes:"",description:"",price:"40 €",image:"",featured:false});
  const [message, setMessage] = useState("");

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("mhl-products") || JSON.stringify(defaults)));
  }, []);

  const persist = (next: Product[]) => { setProducts(next); localStorage.setItem("mhl-products", JSON.stringify(next)); };

  async function login(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password})});
    if (res.ok) { setLogged(true); setMessage(""); } else setMessage("Mot de passe incorrect.");
  }

  function addProduct(e: FormEvent) {
    e.preventDefault();
    if (!form.name || !form.image) return setMessage("Nom et image obligatoires.");
    const id = form.id || form.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-");
    persist([...products, {...form,id}]);
    setForm({id:"",name:"",notes:"",description:"",price:"40 €",image:"",featured:false});
    setMessage("Produit ajouté.");
  }

  function uploadImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm(f => ({...f,image:String(reader.result)}));
    reader.readAsDataURL(file);
  }

  if (!logged) return <main className="adminPage"><div className="adminLogin"><img src="/products/logo.svg" alt="Maison Haute Lumière"/><p className="eyebrow">ESPACE ADMIN</p><h1>Gérer la collection</h1><form onSubmit={login}><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe" autoFocus/><button className="button primary">Connexion</button></form><p className="adminHint">Le mot de passe est défini avec <code>ADMIN_PASSWORD</code> dans Vercel.</p>{message && <p className="error">{message}</p>}<a href="/">← Retour au site</a></div></main>;

  return <main className="adminPage"><div className="adminShell">
    <header className="adminHeader"><div><p className="eyebrow">MAISON HAUTE LUMIÈRE</p><h1>Catalogue</h1></div><a href="/">Voir le site ↗</a></header>
    <section className="adminGrid">
      <form className="adminForm" onSubmit={addProduct}><p className="eyebrow">AJOUTER</p><h2>Nouveau parfum</h2>
        <input placeholder="Nom" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Notes olfactives" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
        <input placeholder="Prix" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
        <input placeholder="URL de l'image (ou data URL)" value={form.image.startsWith("data:") ? "" : form.image} onChange={e=>setForm({...form,image:e.target.value})}/>
        <label className="fileInput">Ou importer une image<input type="file" accept="image/*" onChange={uploadImage}/></label>
        <label className="check"><input type="checkbox" checked={!!form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/> Mettre en avant</label>
        <button className="button primary">Ajouter au catalogue</button>
        {message && <p className="success">{message}</p>}
      </form>
      <div><p className="eyebrow">PRODUITS</p><h2>{products.length} références</h2><div className="adminProducts">{products.map(p=><div className="adminProduct" key={p.id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><small>{p.notes}</small><span>{p.price}</span></div><button onClick={()=>persist(products.filter(x=>x.id!==p.id))}>Supprimer</button></div>)}</div></div>
    </section>
  </div></main>;
}