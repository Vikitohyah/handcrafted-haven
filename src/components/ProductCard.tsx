import Image from "next/image";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
}

export default function ProductCard({
  title,
  price,
  image,
}: ProductCardProps) {
  return (
    <div
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Image
        src={image}
        alt={title}
        width={500}
        height={300}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          padding: "1rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            marginTop: "0.5rem",
            color: "#d97706",
            fontWeight: "bold",
          }}
        >
          {price}
        </p>
      </div>
    </div>
  );
}