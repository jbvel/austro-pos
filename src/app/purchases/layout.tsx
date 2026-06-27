import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type PurchasesLayoutProps = {
  children: ReactNode;
};

export default function PurchasesLayout({ children }: PurchasesLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
