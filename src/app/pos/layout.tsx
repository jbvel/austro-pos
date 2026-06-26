import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type PosLayoutProps = {
  children: ReactNode;
};

export default function PosLayout({ children }: PosLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
