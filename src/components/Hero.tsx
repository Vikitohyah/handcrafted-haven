"use client";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Explore the Marketplace</h1>
          <p className="hero-subtitle">
            Discover unique, handcrafted treasures from talented artisans around the world
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-secondary">Become a Seller</button>
          </div>
        </div>
      </div>

      <style>{`
        .hero {
          background: linear-gradient(135deg, #FDF8F0 0%, #FFF 100%);
          padding: 80px 0;
          text-align: center;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .hero-content {
          max-width: 700px;
          margin: 0 auto;
        }
        .hero-title {
          font-size: 2.5rem;
          color: #E67E22;
          margin-bottom: 20px;
          font-family: 'Poppins', sans-serif;
        }
        .hero-subtitle {
          font-size: 1.2rem;
          color: #7F8C8D;
          margin-bottom: 32px;
          line-height: 1.6;
        }
        .hero-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          background-color: #E67E22;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .btn-secondary {
          background: transparent;
          border: 2px solid #E67E22;
          color: #E67E22;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          .hero { padding: 50px 20px; }
          .hero-title { font-size: 1.8rem; }
        }
      `}</style>
    </section>
  );
}