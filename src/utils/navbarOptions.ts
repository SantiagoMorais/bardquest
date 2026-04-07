import {
  LuCrown,
  LuLayoutDashboard,
  LuSwords,
  LuTrendingUp,
  LuUserRound,
} from "react-icons/lu";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
}

export const mobileNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
  { href: "/perfil", label: "Perfil", icon: LuUserRound },
  { href: "/grimorio?tipo=chefes", label: "Grimório de Chefes", icon: LuSwords },
  { href: "/grimorio?tipo=reinos", label: "Grimório de Reinos", icon: LuCrown },
  {
    href: "/grimorio?tipo=evolucao",
    label: "Grimório de Evolução",
    icon: LuTrendingUp,
  },
];

export const sidebarNavItems: NavItem[] = mobileNavItems.filter((item) => item.href !== "/perfil");
