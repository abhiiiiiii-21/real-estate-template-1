
import About from "./_components/About";
import CTA from "./_components/CTA";
import FeaturedProperties from "./_components/FeaturedProperties";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import Procedure from "./_components/Procedure";
import Testimonial from "./_components/Testimonial";

export default function Home() {
  return (
    <main className="bg-[#151717]">
      {/* 
        Main content wrapped with white background and z-20 
        so it stays above everything else
      */}
      <div className="relative z-20 bg-white">
        <Hero />
        <About />
        <FeaturedProperties />
        <Procedure />
        <Testimonial />
      </div>
      
      {/* 
        CTA gets its own wrapper. bg-transparent so when it scales down via GSAP,
        it reveals the dark background underneath (which blends with the footer)
      */}
      <div className="relative z-10 bg-transparent -mt-5">
        <CTA />
      </div>
      
      {/* 
        The true CSS-only sticky footer reveal.
        By placing it AFTER the CTA in the DOM and using sticky bottom-0, 
        its natural position is at the very end of the document.
        This forces it to stick to the bottom of the viewport the entire time 
        the CTA is scrolling up, creating the perfect peel effect without any JS height calculations.
      */}
      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </main>
  );
}
