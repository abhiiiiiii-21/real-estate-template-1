import About from "./_components/About";
import CTA from "./_components/CTA";
import FeaturedProperties from "./_components/FeaturedProperties";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Procedure from "./_components/Procedure";
import Testimonial from "./_components/Testimonial";


export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <About />
      <FeaturedProperties />
      <Procedure />
      <Testimonial />
      <CTA />
      <Footer />
    </div>
  );
}
