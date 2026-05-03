import { FadeIn } from "@/components/ui/fade-in";

const reviews = [
  { name: "Alya", text: "Aromanya clean, mewah, dan tahan lama. Sangat cocok untuk event formal." },
  { name: "Rafi", text: "Noir Éclat memberi kesan berkelas dari awal semprot sampai dry-down." },
  { name: "Nadine", text: "Velvet Rose punya karakter romantis yang halus, tidak berlebihan." }
];

export default function TestimonialsPage() {
  return (
    <section className="section-padding py-16 md:py-40">
      <div className="container-width">
        <h1 className="mb-8 font-serif text-4xl md:mb-14 md:text-7xl">Testimonials</h1>
        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <FadeIn key={review.name} className="space-y-3 border-t border-luxury-gold pt-6">
              <p className="text-sm leading-7 text-black/80 md:text-base">“{review.text}”</p>
              <p className="font-serif text-xl">{review.name}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
