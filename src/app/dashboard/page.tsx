import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role === "admin") {
    redirect("/admin/dashboard");
  }

  if (session.user.role === "seller") {
    redirect("/seller/dashboard");
  }

  if (session.user.role === "customer") {
    redirect("/customer/dashboard");
  }

  return null;
}