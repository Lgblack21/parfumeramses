import { FadeIn } from "@/components/ui/fade-in";

export default function AboutPage() {
  return (
    <section className="section-padding py-16 md:py-40">
      <div className="container-width grid gap-8 md:gap-12 md:grid-cols-2">
        <FadeIn>
          <h1 className="font-serif text-4xl md:text-7xl">Our Story</h1>
        </FadeIn>
        <FadeIn>
          <p className="text-sm leading-7 text-black/75 md:text-lg md:leading-8">
            RAMSES lahir dari gagasan bahwa parfum bukan sekadar aroma, tetapi ekspresi personal yang
            meninggalkan memori. Setiap koleksi diracik dengan bahan pilihan untuk menciptakan pengalaman
            yang elegan, intim, dan berkelas.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
