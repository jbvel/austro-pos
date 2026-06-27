import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type SuppliersLayoutProps = {
  children: ReactNode;
};

export default function SuppliersLayout({ children }: SuppliersLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
