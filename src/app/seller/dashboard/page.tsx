import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Products";
import User from "@/models/User";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/header.css";

export default async function SellerDashboard() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "seller") {
    redirect("/dashboard");
  }

  await connectDB();

  const seller = await User.findById(session.user.id);

  const products = await Product.find({
    sellerId: session.user.id,
  }).lean();

  const totalProducts = products.length;

  const totalReviews = products.reduce(
    (sum, product) => sum + (product.reviewCount || 0),
    0
  );

  const averageRating =
    products.length > 0
      ? (
          products.reduce(
            (sum, product) => sum + (product.averageRating || 0),
            0
          ) / products.length
        ).toFixed(1)
      : "0.0";

  return (
    <>
      <Header />
      <main className="seller-dashboard">
      {/* Welcome Banner */}
      <section className="dashboard-banner">
        <div>
          <h1>
            Welcome Back, {seller?.firstName} 👋
          </h1>

          <p>
            Manage your products, update your profile,
            and grow your handcrafted business.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-grid">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Total Reviews</h3>
          <p>{totalReviews}</p>
        </div>

        <div className="stat-card">
          <h3>Average Rating</h3>
          <p>{averageRating} ⭐</p>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="action-row">
        <Link
          href="/dashboard/profile"
          className="action-btn"
        >
          Edit Profile
        </Link>

        <Link
          href="/products/new"
          className="action-btn"
        >
          Add Product
        </Link>
      </section>

      {/* Products */}
      <section className="products-section">
        <h2>Your Products</h2>

        {products.length === 0 ? (
          <div className="empty-state">
            <p>
              You haven't added any products yet.
            </p>

            <Link
              href="/products/new"
              className="action-btn"
            >
              Create First Product
            </Link>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product: any) => (
              <div
                key={product._id.toString()}
                className="product-card"
              >
                <img
                  src={
                    product.images?.[0] ||
                    "/placeholder.jpg"
                  }
                  alt={product.title}
                />

                <div className="product-content">
                  <h3>{product.title}</h3>

                  <p className="price">
                    ${product.price}
                  </p>

                  <p>
                    Stock: {product.stock}
                  </p>

                  <p>
                    ⭐ {product.averageRating || 0}
                  </p>
                </div>
                
              </div>
            ))}
          </div>
        )}
      </section>
      </main>
      <Footer />
    
    </>
    
  );
}