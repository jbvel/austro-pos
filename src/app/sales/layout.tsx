import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type SalesLayoutProps = {
  children: ReactNode;
};

export default function SalesLayout({ children }: SalesLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
