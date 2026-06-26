import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type ReportsLayoutProps = {
  children: ReactNode;
};

export default function ReportsLayout({ children }: ReportsLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
