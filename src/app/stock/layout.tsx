import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type StockLayoutProps = {
  children: ReactNode;
};

export default function StockLayout({ children }: StockLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
