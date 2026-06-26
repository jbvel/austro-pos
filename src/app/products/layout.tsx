import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type ProductsLayoutProps = {
  children: ReactNode;
};

export default function ProductsLayout({ children }: ProductsLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
