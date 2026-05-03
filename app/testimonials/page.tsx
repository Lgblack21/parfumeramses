import { FadeIn } from "@/components/ui/fade-in";

const reviews = [
  { name: "Alya", text: "Aromanya clean, mewah, dan tahan lama. Sangat cocok untuk event formal." },
  { name: "Rafi", text: "Noir Éclat memberi kesan berkelas dari awal semprot sampai dry-down." },
  { name: "Nadine", text: "Velvet Rose punya karakter romantis yang halus, tidak berlebihan." }
];

export default function TestimonialsPage() {
  return (
    <section className="section-padding py-32 md:py-40">
      <div className="container-width">
        <h1 className="mb-14 font-serif text-5xl md:text-7xl">Testimonials</h1>
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <FadeIn key={review.name} className="space-y-3 border-t border-luxury-gold pt-6">
              <p className="text-black/80">“{review.text}”</p>
              <p className="font-serif text-xl">{review.name}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
