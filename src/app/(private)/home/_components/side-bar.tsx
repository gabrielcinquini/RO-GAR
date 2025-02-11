"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Users, User, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/routes";
import { signOut } from "next-auth/react";

const routes = [
  { name: "Relatórios", href: APP_ROUTES.private.home.reports, icon: FileText },
  { name: "Membros", href: APP_ROUTES.private.home.officers, icon: Users },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-primary-foreground">
      <div className="px-3 py-2 flex-1">
        <div className="space-y-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "default" : "ghost"}
              className="w-full justify-start"
              asChild
            >
              <Link href={route.href}>
                <route.icon className="mr-2 h-4 w-4" />
                {route.name}
              </Link>
            </Button>
          ))}
        </div>
        <Button className="w-full mt-12" variant='secondary' onClick={() => signOut()}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
}
