"use client";

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">About Handcrafted Haven</h1>
          <p className="about-subtitle">
            Connecting artisans with conscious consumers since 2024
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                Handcrafted Haven was born from a simple belief: unique, handmade 
                treasures deserve a dedicated space where creators and customers 
                can connect meaningfully.
              </p>
              <p>
                We provide artisans with a platform to showcase their craftsmanship 
                and share their stories, while offering customers access to authentic, 
                one-of-a-kind pieces they won't find anywhere else.
              </p>
            </div>
            <div className="mission-icon">
              <span className="icon">🎨</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">What Makes Us Different</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Support Local Artisans</h3>
              <p>Every purchase directly supports independent makers and small businesses.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainable Shopping</h3>
              <p>Handcrafted items mean less mass production and more sustainable choices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💎</div>
              <h3>Unique Treasures</h3>
              <p>Find one-of-a-kind pieces you won't see in big box stores.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Community First</h3>
              <p>We build connections between creators and conscious consumers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Handcrafted Haven started with a simple observation: talented artisans 
                were struggling to reach customers who would truly appreciate their work, 
                while shoppers couldn't easily find authentic handmade goods.
              </p>
              <p>
                We built this platform to bridge that gap. Today, we're proud to host 
                hundreds of artisans from around the world, each bringing their unique 
                skills, traditions, and creativity to our marketplace.
              </p>
              <p>
                Whether you're a potter, weaver, woodworker, or jewelry maker, Handcrafted 
                Haven gives you the tools to share your craft with the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Join Our Community?</h2>
            <div className="cta-buttons">
              <button className="btn-primary">Shop Handcrafted Items</button>
              <button className="btn-secondary">Become a Seller</button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        /* Hero Section */
        .about-hero {
          background: linear-gradient(135deg, #FDF8F0 0%, #FFF 100%);
          padding: 80px 0;
          text-align: center;
        }
        .about-title {
          font-size: 3rem;
          color: #E67E22;
          margin-bottom: 16px;
        }
        .about-subtitle {
          font-size: 1.2rem;
          color: #7F8C8D;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Mission Section */
        .mission-section {
          padding: 60px 0;
        }
        .mission-content {
          display: flex;
          align-items: center;
          gap: 60px;
          flex-wrap: wrap;
        }
        .mission-text {
          flex: 2;
        }
        .mission-text h2 {
          font-size: 2rem;
          color: #2C3E50;
          margin-bottom: 20px;
        }
        .mission-text p {
          color: #5D6D7E;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        .mission-icon {
          flex: 1;
          text-align: center;
        }
        .icon {
          font-size: 120px;
        }

        /* Values Section */
        .values-section {
          background-color: #FDF8F0;
          padding: 60px 0;
        }
        .section-title {
          text-align: center;
          font-size: 2rem;
          color: #2C3E50;
          margin-bottom: 48px;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }
        .value-card {
          text-align: center;
          padding: 30px 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .value-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }
        .value-card h3 {
          color: #E67E22;
          margin-bottom: 12px;
        }
        .value-card p {
          color: #7F8C8D;
          line-height: 1.5;
        }

        /* Story Section */
        .story-section {
          padding: 60px 0;
        }
        .story-content {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .story-text h2 {
          font-size: 2rem;
          color: #2C3E50;
          margin-bottom: 20px;
        }
        .story-text p {
          color: #5D6D7E;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        /* Call to Action Section */
        .cta-section {
          background-color: #2C3E50;
          padding: 60px 0;
          text-align: center;
        }
        .cta-content h2 {
          color: white;
          font-size: 1.8rem;
          margin-bottom: 24px;
        }
        .cta-buttons {
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

        /* Responsive */
        @media (max-width: 768px) {
          .about-title { font-size: 2rem; }
          .mission-content { flex-direction: column; text-align: center; }
          .section-title { font-size: 1.5rem; }
          .values-grid { gap: 16px; }
          .cta-content h2 { font-size: 1.3rem; }
        }
      `}</style>
    </main>
  );
}