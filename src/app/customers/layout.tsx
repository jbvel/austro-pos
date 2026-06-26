import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type CustomersLayoutProps = {
  children: ReactNode;
};

export default function CustomersLayout({
  children,
}: CustomersLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
