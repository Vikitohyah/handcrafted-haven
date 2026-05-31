import ProductCard from "./ProductCard";

interface SellerProductsProps {
  products: {
    id: string;
    title: string;
    price: string;
    image: string;
  }[];
}

export default function SellerProducts({
  products,
}: SellerProductsProps) {
  return (
    <section
      style={{
        padding: "2rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          marginBottom: "2rem",
          fontWeight: "bold",
        }}
      >
        Products
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
}