import { FadeIn } from "@/components/ui/fade-in";

export default function AboutPage() {
  return (
    <section className="section-padding py-28">
      <div className="container-width grid gap-10 md:grid-cols-2">
        <FadeIn>
          <h1 className="font-serif text-5xl">Our Story</h1>
        </FadeIn>
        <FadeIn>
          <p className="text-black/75">
            Born from a desire to turn memory into scent, RAMSES builds fragrance as an intimate ritual.
            Every composition is crafted to fit moments of ambition, intimacy, and celebration with a
            timeless high-luxury sensibility.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
