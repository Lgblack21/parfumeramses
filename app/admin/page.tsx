"use client";

import { FormEvent, useEffect, useState } from "react";
import { formatIDR } from "@/lib/currency";
import { Product } from "@/types";

type Order = { id: string; email: string; total: number; status: string; createdAt: string };

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [form, setForm] = useState({ name: "", price: "", image: "", description: "" });

  async function load() {
    const [productRes, orderRes] = await Promise.all([fetch("/api/products"), fetch("/api/orders")]);
    setProducts(await productRes.json());
    setOrders(await orderRes.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, price: Number(form.price) })
    });
    setForm({ name: "", price: "", image: "", description: "" });
    load();
  }

  async function onDelete(id: string) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <section className="section-padding py-28">
      <div className="container-width space-y-14">
        <div>
          <h1 className="mb-6 font-serif text-5xl">Admin Dashboard</h1>
          <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-2">
            <input className="border border-black/20 bg-transparent px-4 py-3" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="border border-black/20 bg-transparent px-4 py-3" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input className="border border-black/20 bg-transparent px-4 py-3 md:col-span-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <textarea className="border border-black/20 bg-transparent px-4 py-3 md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <button className="w-fit bg-black px-6 py-3 text-sm uppercase tracking-widest text-luxury-cream">Add Product</button>
          </form>
        </div>

        <div>
          <h2 className="mb-5 font-serif text-3xl">Products</h2>
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex items-center justify-between border-b border-black/10 pb-3">
                <div>
                  <p className="font-serif text-2xl">{product.name}</p>
                  <p className="text-sm text-black/70">{formatIDR(product.price)}</p>
                </div>
                <button onClick={() => onDelete(product.id)} className="text-sm uppercase tracking-widest text-black/60">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-5 font-serif text-3xl">Orders</h2>
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="flex items-center justify-between border-b border-black/10 pb-3">
                <div>
                  <p>{order.email}</p>
                  <p className="text-sm text-black/70">
                    {formatIDR(order.total)} - {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
