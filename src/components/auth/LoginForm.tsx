"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { login } from "@/lib/auth";
import type { LoginCredentials } from "@/types/auth";
import {
  loginSchema,
} from "@/lib/validations/login.schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const form = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit = handleSubmit(async (values) => {
    try {
      setGeneralError(null);
      await login(values);
      router.push("/dashboard");
    } catch (error) {
      setGeneralError(
        error instanceof Error ? error.message : "No fue posible iniciar sesión",
      );
    }
  });

  return (
    <Card className="w-full max-w-md border border-primary/12 bg-white/95 shadow-[0_24px_64px_-32px_var(--brand-shadow-soft)] backdrop-blur dark:border-white/10 dark:bg-[color-mix(in_oklch,var(--card)_94%,black)] dark:shadow-[0_24px_64px_-32px_rgba(0,0,0,0.72)]">
      <CardHeader className="space-y-3 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--brand-gradient-start)_0%,var(--brand-gradient-end)_100%)] text-lg font-semibold text-[color:var(--brand-foreground)] shadow-lg shadow-[var(--brand-shadow-soft)]">
          AP
        </div>
        <CardTitle className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          Austro POS
        </CardTitle>
        <CardDescription className="text-sm text-slate-700 dark:text-slate-300">
          Sistema de punto de venta
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit} noValidate>
          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-200" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@austropos.cl"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              disabled={isSubmitting}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-200" htmlFor="password">
              Contraseña
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              disabled={isSubmitting}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            ) : null}
          </div>

          {generalError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
              {generalError}
            </div>
          ) : null}

          <Button
            className="h-11 w-full bg-[linear-gradient(135deg,var(--brand-gradient-start)_0%,var(--brand-gradient-end)_100%)] text-[color:var(--brand-foreground)] hover:opacity-95"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </Button>

          <p className="text-center text-sm text-slate-600 dark:text-slate-300">
            Acceso solo para usuarios autorizados
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
