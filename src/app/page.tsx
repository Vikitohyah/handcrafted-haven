import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import "./header.css"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <FeaturedProducts />
      <Footer />
    </main>
  );
}