import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type CashRegisterLayoutProps = {
  children: ReactNode;
};

export default function CashRegisterLayout({
  children,
}: CashRegisterLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
