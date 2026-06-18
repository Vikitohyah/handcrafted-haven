export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Handcrafted Haven</h3>
            <p>Connecting artisans with conscious consumers since 2024.</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/shipping">Shipping Info</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <a href="https://www.instagram.com/" aria-label="Instagram">
                📷 Instagram
              </a>
              <a href="https://x.com/" aria-label="Twitter">
                🐦 Twitter
              </a>
              <a href="https://web.facebook.com/" aria-label="Facebook">
                📘 Facebook
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/accessibility">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Handcrafted Haven. All rights reserved.</p>
          <p className="reference">
            Handcrafted Haven – Supporting Artisans Worldwide
          </p>
          <p className="last-mod">Last Modified: 2026/06/11</p>
        </div>
      </div>

      <style>{`
        .footer {
          background-color: #2c3e50;
          color: white;
          padding: 48px 0 24px;
          margin-top: 60px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          margin-bottom: 32px;
        }

        .footer-section h3,
        .footer-section h4 {
          margin-bottom: 16px;
        }

        .footer-section ul {
          list-style: none;
          padding: 0;
        }

        .footer-section li {
          margin-bottom: 8px;
        }

        .footer-section a {
          color: #ccc;
          text-decoration: none;
        }

        .footer-section a:hover {
          color: #e67e22;
        }

        .social-icons {
          display: flex;
          gap: 16px;
          flex-direction: column;
        }

        .social-icons a {
          color: white;
          text-decoration: none;
        }

        .social-icons a:hover {
          color: #e67e22;
        }

        .footer-bottom {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid #3d5a6c;
          font-size: 0.85rem;
          color: #aaa;
        }

        .reference,
        .last-mod {
          margin-top: 8px;
        }
      `}</style>
    </footer>
  );
}