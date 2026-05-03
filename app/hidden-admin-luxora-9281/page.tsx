"use client";

import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { Product } from "@/types";

const ADMIN_USER = "luxora-admin";
const ADMIN_PASS = "Ramses#9281";

type ProductForm = {
  name: string;
  price: string;
  image: string;
  description: string;
  story: string;
  longevity: string;
  projection: string;
  occasion: string;
  topNotes: string;
  middleNotes: string;
  baseNotes: string;
  ingredients: string;
  character: string;
  targetUser: string;
  shopeeUrl?: string | null;
  tiktokUrl?: string | null;
  isFeatured: boolean;
  isBestSeller: boolean;
  isLimitedEdition: boolean;
  isSignatureCollection: boolean;
};

const initialForm: ProductForm = {
  name: "",
  price: "",
  image: "",
  description: "",
  story: "",
  longevity: "",
  projection: "",
  occasion: "",
  topNotes: "",
  middleNotes: "",
  baseNotes: "",
  ingredients: "",
  character: "",
  targetUser: "",
  shopeeUrl: "",
  tiktokUrl: "",
  isFeatured: false,
  isBestSeller: false,
  isLimitedEdition: false,
  isSignatureCollection: false
};

export default function HiddenAdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const title = useMemo(() => (editingId ? "Edit Produk" : "Tambah Produk"), [editingId]);

  useEffect(() => {
    if (loggedIn) void load();
  }, [loggedIn]);

  async function load() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  function onLogin(e: FormEvent) {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) setLoggedIn(true);
    else alert("Login gagal.");
  }

  async function onImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: String(reader.result || "") }));
    reader.readAsDataURL(file);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    if (editingId) {
      await fetch(`/api/products/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
    setForm(initialForm);
    setEditingId(null);
    load();
  }

  async function onDelete(id: string) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  }

  function onEdit(product: Product) {
    setEditingId(product.id);
    setForm({ ...product, price: String(product.price) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!loggedIn) {
    return (
      <section className="section-padding py-32">
        <div className="container-width max-w-lg">
          <h1 className="mb-8 font-serif text-5xl">Admin Login</h1>
          <form onSubmit={onLogin} className="space-y-4">
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Username"
              className="w-full border border-black/20 bg-transparent px-4 py-3"
            />
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Password"
              className="w-full border border-black/20 bg-transparent px-4 py-3"
            />
            <button className="bg-black px-6 py-3 text-xs uppercase tracking-[0.18em] text-luxury-cream">
              Login
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding py-20">
      <div className="container-width space-y-12">
        <h1 className="font-serif text-5xl">{title}</h1>
        <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
          <Input label="Nama" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
          <Input label="Harga" value={form.price} onChange={(value) => setForm({ ...form, price: value })} />
          <Input label="Deskripsi" value={form.description} onChange={(value) => setForm({ ...form, description: value })} full />
          <Input label="Story" value={form.story} onChange={(value) => setForm({ ...form, story: value })} full />
          <Input label="Longevity" value={form.longevity} onChange={(value) => setForm({ ...form, longevity: value })} />
          <Input label="Projection" value={form.projection} onChange={(value) => setForm({ ...form, projection: value })} />
          <Input label="Occasion" value={form.occasion} onChange={(value) => setForm({ ...form, occasion: value })} full />
          <Input label="Top Notes" value={form.topNotes} onChange={(value) => setForm({ ...form, topNotes: value })} />
          <Input label="Middle Notes" value={form.middleNotes} onChange={(value) => setForm({ ...form, middleNotes: value })} />
          <Input label="Base Notes" value={form.baseNotes} onChange={(value) => setForm({ ...form, baseNotes: value })} />
          <Input label="Ingredients" value={form.ingredients} onChange={(value) => setForm({ ...form, ingredients: value })} full />
          <Input label="Character" value={form.character} onChange={(value) => setForm({ ...form, character: value })} />
          <Input label="Target User" value={form.targetUser} onChange={(value) => setForm({ ...form, targetUser: value })} />
          <Input label="Shopee URL" value={form.shopeeUrl || ""} onChange={(value) => setForm({ ...form, shopeeUrl: value })} full />
          <Input label="TikTok URL" value={form.tiktokUrl || ""} onChange={(value) => setForm({ ...form, tiktokUrl: value })} full />
          <div className="md:col-span-2">
            <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-black/60">Upload Gambar</label>
            <input type="file" accept="image/*" onChange={onImageUpload} />
          </div>
          <div className="grid gap-2 md:col-span-2 md:grid-cols-2 lg:grid-cols-4">
            <Check label="Featured" checked={form.isFeatured} onChange={(v) => setForm({ ...form, isFeatured: v })} />
            <Check label="Best Seller" checked={form.isBestSeller} onChange={(v) => setForm({ ...form, isBestSeller: v })} />
            <Check label="Limited Edition" checked={form.isLimitedEdition} onChange={(v) => setForm({ ...form, isLimitedEdition: v })} />
            <Check
              label="Signature Collection"
              checked={form.isSignatureCollection}
              onChange={(v) => setForm({ ...form, isSignatureCollection: v })}
            />
          </div>
          <div className="flex gap-3 md:col-span-2">
            <button className="bg-black px-6 py-3 text-xs uppercase tracking-[0.18em] text-luxury-cream">
              {editingId ? "Simpan Perubahan" : "Tambah Produk"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(initialForm);
                }}
                className="border border-black/20 px-6 py-3 text-xs uppercase tracking-[0.18em]"
              >
                Batal Edit
              </button>
            )}
          </div>
        </form>

        <div className="space-y-4">
          <h2 className="font-serif text-4xl">List Produk</h2>
          {products.map((product) => (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 py-4">
              <p className="font-serif text-2xl">{product.name}</p>
              <div className="flex gap-2">
                <button onClick={() => onEdit(product)} className="border border-black/20 px-4 py-2 text-xs uppercase tracking-[0.14em]">
                  Edit
                </button>
                <button onClick={() => onDelete(product.id)} className="border border-black/20 px-4 py-2 text-xs uppercase tracking-[0.14em]">
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  full
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <label className="mb-2 block text-xs uppercase tracking-[0.14em] text-black/60">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-black/20 bg-transparent px-4 py-3"
      />
    </div>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}
