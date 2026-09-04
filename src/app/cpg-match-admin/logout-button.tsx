"use client";
import { useRouter } from "next/navigation";
export function LogoutButton() { const router = useRouter(); return <button className="text-sm font-semibold text-muted hover:text-foreground" onClick={async () => { await fetch("/api/cpg-match-admin/login", { method: "DELETE" }); router.replace("/login"); router.refresh(); }}>Log out</button>; }
