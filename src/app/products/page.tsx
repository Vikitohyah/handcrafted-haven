import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import "@/app/header.css";

export default function ProductsPage() {
  return (
    <main>
      <Header />
      <FeaturedProducts showAll />
      <Footer />
    </main>
  );
}