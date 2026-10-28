import type { Metadata } from "next";
import { cookies } from "next/headers";
import { CLIENTS_COOKIE, isClientsViewer } from "@/lib/clients-auth";
import { getBoard } from "@/lib/client-board";
import { ClientsLogin } from "./clients-login";
import { Board } from "./board";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clients — CPG Founders Group",
  robots: { index: false, follow: false },
};

export default async function ClientsPage() {
  if (!(await isClientsViewer((await cookies()).get(CLIENTS_COOKIE)?.value))) {
    return <ClientsLogin />;
  }
  const { clients, prospects, stripeError } = await getBoard();
  return <Board clients={clients} prospects={prospects} stripeError={stripeError} />;
}
