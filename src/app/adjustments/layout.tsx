import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type AdjustmentsLayoutProps = {
  children: ReactNode;
};

export default function AdjustmentsLayout({
  children,
}: AdjustmentsLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
