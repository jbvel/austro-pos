import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type ShrinkageLayoutProps = {
  children: ReactNode;
};

export default function ShrinkageLayout({ children }: ShrinkageLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
