"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export function MobileCallBar() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const buttons = [...document.querySelectorAll("[data-primary-apply]")];
    const footer = document.querySelector("body > footer");
    const update = () => {
      const onScreen = buttons.some(button => {
        const rect = button.getBoundingClientRect();
        return rect.bottom > 72 && rect.top < innerHeight - 100;
      });
      const footerVisible = footer ? footer.getBoundingClientRect().top < innerHeight - 100 : false;
      setVisible(!onScreen && !footerVisible);
    };
    const observer = new IntersectionObserver(update, { rootMargin: "-72px 0px -100px 0px", threshold: [0, 1] });
    buttons.forEach(button => observer.observe(button));
    if (footer) observer.observe(footer);
    update();
    return () => observer.disconnect();
  }, []);
  if (!visible) return null;
  return <aside className={styles.callDock} aria-label="Book an introductory call">
    <div><strong>Your intro call</strong><span>30 minutes · Jeff’s team</span></div>
    <Link href="/apply" aria-label="Apply and book a 30-minute intro call with Jeff’s team">Apply &amp; book <span aria-hidden="true">↗</span></Link>
  </aside>;
}
