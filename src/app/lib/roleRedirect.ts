export function getDashboardRoute(role: string) {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "seller":
      return "/seller/dashboard";
    default:
      return "/customer/dashboard";
  }
}