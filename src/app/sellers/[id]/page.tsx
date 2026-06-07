import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SellerHeader from "@/components/SellerHeader";
import SellerProducts from "@/components/SellerProducts";

import { sellers } from "@/data/sellers";
import { products } from "@/data/products";

interface SellerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SellerPage({
  params,
}: SellerPageProps) {
  const { id } = await params;

  const seller = sellers.find(
    (seller) => seller.id === id
  );

  const sellerProducts = products.filter(
    (product) => product.sellerId === id
  );

  if (!seller) {
    return <div>Seller not found</div>;
  }

  return (
    <>
      <Header />

      <SellerHeader seller={seller} />

      <SellerProducts
        products={sellerProducts.map((product) => ({
          id: product.id,
          title: product.title,
          price: product.price.toString(),
          image: product.images?.[0] || "",
        }))}
      />

      <Footer />
    </>
  );
}