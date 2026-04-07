"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LuLayoutDashboard,
  LuUserRound,
  LuChevronRight,
  LuSwords,
  LuCrown,
  LuTrendingUp,
} from "react-icons/lu";
import styles from "./index.module.scss";
import Image from "next/image";
import logo from "@/assets/logo-bardquest-minor.png";
import { LogoutButton } from "./logoutButton";
import { StreakBadge } from "./streakBadge";
import classNames from "classnames";

const mobileNavItems = [
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

const sidebarNavItems = mobileNavItems.filter((item) => item.href !== "/perfil");

const STREAK = 7;

export const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <header className={styles.mobileHeader}>
        <div className={styles.mobileInner}>
          <Image src={logo} alt="Logo" className={styles.mobileLogo} />

          <div className={styles.mobileRight}>
            <StreakBadge streak={STREAK} />

            <button
              className={styles.mobileMenuBtn}
              onClick={() => setExpanded((p) => !p)}
              aria-label="Menu"
              aria-expanded={expanded}
            >
              <span className={classNames(styles.burger, expanded && styles.open)} />
            </button>
          </div>
        </div>

        <nav className={classNames(styles.mobileNav, expanded && styles.mobileNavOpen)}>
          {mobileNavItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={styles.mobileNavItem}
              onClick={() => setExpanded(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          ))}
          <LogoutButton variant="mobile" onSuccess={() => setExpanded(false)} />
        </nav>
      </header>

      <>
        <aside
          className={classNames(styles.sidebar, expanded && styles.sidebarExpanded)}
          onMouseEnter={() => setExpanded(true)}
          onMouseLeave={() => setExpanded(false)}
        >
          <div className={styles.logoArea}>
            <Image src={logo} alt="Logo" className={styles.logo} />
            <span className={styles.logoLabel}>Bard Quest</span>
          </div>

          <nav className={styles.nav}>
            {sidebarNavItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={styles.navItem}>
                <span className={styles.navIcon}>
                  <Icon size={20} />
                </span>
                <span className={styles.navLabel}>{label}</span>
              </Link>
            ))}
          </nav>

          <div className={styles.collapseHint}>
            <LuChevronRight
              size={16}
              className={classNames(styles.chevron, expanded && styles.chevronOpen)}
            />
          </div>
        </aside>

        <header className={styles.desktopHeader}>
          <div className={styles.desktopHeaderInner}>
            <StreakBadge streak={STREAK} />

            <Link href="/perfil" className={styles.desktopProfileLink}>
              <LuUserRound size={18} />
              <span>Perfil</span>
            </Link>

            <LogoutButton variant="desktop" isExpanded />
          </div>
        </header>
      </>
    </>
  );
};
