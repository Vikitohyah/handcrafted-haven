export function getDashboardRoute(role: string) {
  switch (role) {
    case "admin":
      return "/admin/dashboard";
    case "seller":
      return "/sellers";
    default:
      return "/customer/dashboard";
  }
}