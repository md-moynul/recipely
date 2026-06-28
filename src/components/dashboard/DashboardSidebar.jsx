"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutSideContentLeft,
  LayoutCellsLarge,
  Bookmark,
  Book,
  CreditCard,
  Person,
  Plus,
  Flag,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export default function DashboardSidebar({ user }) {
  const pathname = usePathname();
  const isPremium = user?.isPremium;
  const userNavItems = [
    {
      icon: LayoutCellsLarge,
      label: "Overview",
      href: "/dashboard/user",
    },
    {
      icon: Book,
      label: "My Recipes",
      href: "/dashboard/user/my-recipes",
    },
    {
      icon: Plus,
      label: "Add Recipe",
      href: "/dashboard/user/add-recipe",
    },
    {
      icon: Bookmark,
      label: "My Favorites",
      href: "/dashboard/user/favorites",
    },
    {
      icon: CreditCard,
      label: "Purchased Recipes",
      href: "/dashboard/user/purchased",
    },
    {
      icon: Person,
      label: "Profile",
      href: "/dashboard/profile",
    },
  ];

  // Per spec: Admin Dashboard = Overview, Manage Users, Manage Recipes, Reports
  const adminNavItems = [
    {
      icon: LayoutCellsLarge,
      label: "Overview",
      href: "/dashboard/admin",
    },
    {
      icon: Person,
      label: "Manage Users",
      href: "/dashboard/admin/manage-users",
    },
    {
      icon: Book,
      label: "Manage Recipes",
      href: "/dashboard/admin/manage-recipes",
    },
    {
      icon: Flag,
      label: "Reports",
      href: "/dashboard/admin/reports",
    },
    {
      icon: CreditCard,
      label: "Transactions",
      href: "/dashboard/admin/transactions",
    },
    {
      icon: Person,
      label: "Profile",
      href: "/dashboard/profile",
    },
  ];

  const navItems = user?.role === "admin" ? [...adminNavItems] : [...userNavItems];

  // `onLinkClick` lets us close the drawer on mobile when a nav item is tapped.
  // It's passed the drawer's own close callback from inside Drawer.Dialog's render-prop.
  const renderNavLinks = (onLinkClick) => (
    <nav className="flex flex-col gap-1.5 w-full">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link key={item.href} href={item.href} onClick={onLinkClick}>
            <button
              type="button"
              className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all text-left relative group ${isActive
                ? "bg-[#E85D3D]/10 text-[#E85D3D] cursor-pointer"
                : "text-[#6B6155] hover:text-[#2B2420] hover:bg-[#FBF1E6] cursor-pointer dark:text-[#B8AFA2] dark:hover:text-[#F4EDE4] dark:hover:bg-[#252019]"
                }`}
            >
              <div className="flex items-center gap-3.5">
                <IconComponent
                  className={`w-5 h-5 ${isActive
                    ? "text-[#E85D3D]"
                    : "text-[#9C9388] group-hover:text-[#6B6155] dark:text-[#7A7266] dark:group-hover:text-[#B8AFA2]"
                    }`}
                />
                <span>{item.label}</span>
              </div>

              {isActive && (
                <div className="absolute right-0 top-1/4 h-1/2 w-0.5 bg-[#E85D3D] rounded-l" />
              )}
            </button>
          </Link>
        );
      })}
    </nav>
  );

  const premiumCards = !isPremium ? (
    <div className="mt-auto rounded-2xl border border-[#F4A340]/40 p-4">
      <p className="text-sm font-medium text-[#B5781F]">Go Premium</p>
      <p className="mt-1 text-xs text-[#6B6155] dark:text-[#B8AFA2]">
        Unlock unlimited recipes and a premium badge.
      </p>
      <Link href="/premium">
        <Button className="mt-4 w-full rounded-xl bg-[#E85D3D] text-white hover:bg-[#D14E30]" size="sm">
          <Plus className="w-4 h-4" />
          Upgrade
        </Button>
      </Link>
    </div>
  ) : (
    <div className="mt-auto rounded-2xl border border-[#EAE0D3] p-4 dark:border-[#3A332A]">
      <p className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">Ready to cook?</p>
      <p className="mt-1 text-xs text-[#9C9388] dark:text-[#7A7266]">
        Share a new recipe with the community.
      </p>
      <Link href="/dashboard/user/add-recipe">
        <Button className="mt-4 w-full rounded-xl bg-[#E85D3D] text-white hover:bg-[#D14E30]" size="sm">
          <Plus className="w-4 h-4" />
          Add Recipe
        </Button>
      </Link>
    </div>
  );
  const premiumCard = user?.role !== "admin" && premiumCards;
  return (
    <div>
      {/* Mobile Header + Drawer
          IMPORTANT (HeroUI v3): the trigger button must be the FIRST child of
          <Drawer>, with <Drawer.Backdrop> as the second child. If the trigger
          isn't the first child, v3's DialogTrigger wiring breaks and the
          drawer never opens. */}
      <div className="sticky top-0 z-40 lg:hidden p-4 border-b border-[#EAE0D3] flex items-center justify-between dark:border-[#3A332A]">
        <Drawer>
          <Button
            variant="flat"
            size="sm"
            className="border border-[#EAE0D3] text-[#2B2420] gap-2 rounded-xl dark:border-[#3A332A] dark:text-[#F4EDE4]"
          >
            <LayoutSideContentLeft className="w-4 h-4" />
            Menu
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content
              placement="left"
              className="fixed inset-y-0 left-0 z-50 h-screen w-72 max-w-72 overflow-y-auto border-r border-[#EAE0D3] dark:border-[#3A332A]"
            >
              <Drawer.Dialog className="text-[#2B2420] p-5 dark:text-[#F4EDE4]">
                {({ close }) => (
                  <>
                    <Drawer.Header className="p-0 mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold">Recipely</h2>
                        <p className="text-sm text-[#9C9388] dark:text-[#7A7266]">
                          Your Kitchen
                        </p>
                      </div>
                    </Drawer.Header>

                    <Drawer.Body className="p-0">
                      {renderNavLinks(close)}
                    </Drawer.Body>
                  </>
                )}
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 border-r border-[#EAE0D3] p-5 dark:border-[#3A332A]">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            Recipely
          </h2>
          <p className="text-sm text-[#9C9388] dark:text-[#7A7266]">
            Your Kitchen
          </p>
        </div>

        {renderNavLinks()}

        {premiumCard}
      </aside>
    </div>
  );
}