import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type MovementsLayoutProps = {
  children: ReactNode;
};

export default function MovementsLayout({ children }: MovementsLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
