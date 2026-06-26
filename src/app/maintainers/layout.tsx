import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type MaintainersLayoutProps = {
  children: ReactNode;
};

export default function MaintainersLayout({
  children,
}: MaintainersLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
