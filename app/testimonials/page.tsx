import { FadeIn } from "@/components/ui/fade-in";

const reviews = [
  { name: "Alya", text: "Noir Elixir has incredible depth. It feels couture in a bottle." },
  { name: "Rafi", text: "Long lasting and refined. The dry down is elegant and modern." },
  { name: "Nadine", text: "Beautiful balance of softness and character. Truly premium." }
];

export default function TestimonialsPage() {
  return (
    <section className="section-padding py-28">
      <div className="container-width">
        <h1 className="mb-12 font-serif text-5xl">Testimonials</h1>
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
