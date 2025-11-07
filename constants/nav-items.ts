export interface NavItem {
  label: string;
  href: string;
  visibilityClass?: string;
}

export const navItems: NavItem[] = [
  { label: "SHOP", href: "/shop" },
  { label: "LOOKBOOK", href: "/lookbook" },
  { label: "ABOUT", href: "#" },
  { label: "BRAND", href: "#" },
];
