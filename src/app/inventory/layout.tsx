import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type InventoryLayoutProps = {
  children: ReactNode;
};

export default function InventoryLayout({
  children,
}: InventoryLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
