"use client";

import { useState } from "react";
import Link from "next/link";
import { LuLayoutDashboard, LuUser, LuChevronRight } from "react-icons/lu";
import styles from "./index.module.scss";
import Image from "next/image";
import logo from "@/assets/logo-bardquest-minor.png";
import { LogoutButton } from "./logoutButton";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LuLayoutDashboard },
  { href: "/perfil", label: "Perfil", icon: LuUser },
];

export const Header = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <header className={styles.mobileHeader}>
        <div className={styles.mobileInner}>
          <Image src={logo} alt="Logo" className={styles.mobileLogo} />

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setExpanded((p) => !p)}
            aria-label="Menu"
            aria-expanded={expanded}
          >
            <span className={`${styles.burger} ${expanded ? styles.open : ""}`} />
          </button>
        </div>

        <nav className={`${styles.mobileNav} ${expanded ? styles.mobileNavOpen : ""}`}>
          {navItems.map(({ href, label, icon: Icon }) => (
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

      <aside
        className={`${styles.sidebar} ${expanded ? styles.sidebarExpanded : ""}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <div className={styles.logoArea}>
          <Image src={logo} alt="Logo" className={styles.logo} />
          <span className={styles.logoLabel}>Bard Quest</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={styles.navItem}>
              <span className={styles.navIcon}>
                <Icon size={20} />
              </span>
              <span className={styles.navLabel}>{label}</span>
            </Link>
          ))}
          <LogoutButton variant="desktop" isExpanded={expanded} />{" "}
        </nav>

        <div className={styles.collapseHint}>
          <LuChevronRight
            size={16}
            className={`${styles.chevron} ${expanded ? styles.chevronOpen : ""}`}
          />
        </div>
      </aside>
    </>
  );
};
