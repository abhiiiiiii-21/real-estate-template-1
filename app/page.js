import About from "./_components/About";
import FeaturedProperties from "./_components/FeaturedProperties";
import Hero from "./_components/Hero";


export default function Home() {
  return (
    <div className="bg-white">
     <Hero />
     <About/>
     <FeaturedProperties />
    </div>
  );
}
