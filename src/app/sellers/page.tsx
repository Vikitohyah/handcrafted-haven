import Link from "next/link";
import Image from "next/image";
import User from "@/models/User";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/app/header.css";

import { connectDB } from "@/lib/mongoose";

export default async function SellersPage() {
  await connectDB();

  const sellers = await User.find({ role: "seller" });

    return (
        <>
            <Header />
            <main>
                <section className="sellers-section">
                    <div className="container">
                        <h1>Meet Our Artisans</h1>
                        <div className="seller-content">
                            {sellers.map((seller) => (
                                <div key={seller._id} className="seller-card">
                                    <Image
                                        src={
                                            seller.profileImage ||
                                            "https://placehold.co/300x250?text=Seller"
                                        }
                                        alt={`${seller.firstName} ${seller.lastName}`}
                                        width={300}
                                        height={250}
                                     />
                                    <div className="seller-info">
                                        <h2>{seller.firstName} {seller.lastName}</h2>
                                        <p>{seller.bio || "Handcrafted artisan on Handcrafted Haven."}</p>
                                        <p className="seller-location">{seller.location}</p>
                                        <p>⭐ Artisan Seller</p>
                                    </div>
                                    <div className="seller-actions">
                                        <Link
                                            href={`/sellers/${seller._id.toString()}`}
                                            className="btn-primary"
                                        >
                                            View Profile
                                        </Link>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <style>{`
                        h1{
                            margin: 2rem 0;
                            text-align: center;
                        }
                        .container {
                            max-width: 1200px;
                            margin: 0 auto;
                            padding: 2rem;
                        }
                        .seller-content {
                            display: grid;
                            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                            gap: 2rem;
                        }
                        .seller-card {
                            background: #fff;
                            border: 1px solid #ddd;
                            border-radius: 12px;
                            overflow: hidden;
                            box-shadow: 0 2px 10px rgba(0,0,0,0.08);
                            display: flex;
                            flex-direction: column;
                        }
                        .seller-card img{
                            width: 100%;
                            height: 250px;
                            object-fit: cover;
                            border-radius: 8px;
                        }
                        .seller-info {
                            padding: 1rem;
                        }
                        .seller-location {
                            font-style: italic;
                            font-weight: bold;
                            color: #555;
                        }
                        .seller-actions {
                            display: flex;
                            gap: 10px;
                            padding: 0 1rem 1rem;
                        }
                        .seller-actions a {
                            text-decoration: none;
                        }
                        .seller-actions a:hover {
                            opacity: 0.9;
                            text-decoration: underline;
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
                            .sellers-section { padding: 50px 20px; }
                            h1 { font-size: 1.8rem; }
                        }
                    `}</style>
                </section>
            </main>
            <Footer />
        </>
    );
}