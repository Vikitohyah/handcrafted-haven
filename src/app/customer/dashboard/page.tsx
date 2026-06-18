import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/header.css";

export default function CustomerDashboard() {
  return (
    <>
      <Header />
      <main className="customer-dashboard">
        <section className="dashboard-banner">
          <h1>Welcome Back 👋</h1>

          <p>
            Discover new handmade treasures and
            manage your orders.
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <h3>Orders</h3>
            <p>0</p>
          </div>

          <div className="stat-card">
            <h3>Favorites</h3>
            <p>0</p>
          </div>
        </section>

        <div className="action-row">
          <a href="/products" className="action-btn">
            Browse Products
          </a>

          <a href="/sellers" className="action-btn">
            Explore Sellers
          </a>
        </div>

        <section>
          <h2>Recent Activity</h2>

          <p>
            You have not placed any orders yet.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}