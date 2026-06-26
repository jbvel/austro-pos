import type { ReactNode } from "react";

import { AppLayout } from "@/components/layout/AppLayout";

type SettingsLayoutProps = {
  children: ReactNode;
};

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <AppLayout>{children}</AppLayout>;
}
