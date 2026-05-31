import FeaturedProducts from "@/components/FeaturedProducts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  return (
    <>
      <Header />

      <main>
        <section
          className="container"
          style={{
            padding: "60px 20px",
            textAlign: "center",
          }}
        >
          <h1>Our Products</h1>
          <p>
            Browse beautiful handmade items from talented artisans.
          </p>
        </section>

        <FeaturedProducts />
      </main>

      <Footer />
    </>
  );
}