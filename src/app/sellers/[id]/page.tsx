import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SellerHeader from "@/components/SellerHeader";
import SellerProducts from "@/components/SellerProducts";
import "@/app/header.css";

import User from "@/models/User";
import Product from "@/models/Products";
import { connectDB } from "@/lib/mongoose";
import { auth } from "@/auth";

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const seller = await User.findOne({ _id: id, role: "seller" });

  if (!seller) {
    return <div>Seller not found</div>;
  }

  const sellerProducts = await Product.find({
    sellerId: id,
  });
  
  // check if logged in user is owner
  const session = await auth();
  const isOwner = session?.user?.id === seller._id.toString();

  return (
    <>
      <Header />

      <SellerHeader
        seller={{
          firstName: seller.firstName,
          lastName: seller.lastName,
          location: seller.location,
          bio: seller.bio,
          profileImage: seller.profileImage,
          createdAt: seller.createdAt?.toString(),
        }}
        isOwner={isOwner}
      />
      <SellerProducts
        products={sellerProducts.map((product) => ({
          id: product._id.toString(),
          title: product.title,
          price: product.price.toString(),
          image: product.images?.[0] || "https://placehold.co/600x400?text=Product",
        }))} 
      />

      <Footer />
    </>
  );
}