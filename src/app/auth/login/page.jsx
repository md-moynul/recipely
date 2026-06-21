"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  FieldError,
  Avatar,
} from "@heroui/react";
import { Envelope, Lock, Eye, EyeSlash } from "@gravity-ui/icons";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // TODO: connect to your auth flow (Better Auth / JWT) here
    console.log({ email, password });

    setTimeout(() => setIsSubmitting(false), 1200);
  };

  return (
    <main className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1fr] ">
      {/* LEFT — Form */}
      <section className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="mx-auto w-full max-w-100">

          {/* Heading */}
          <h1 className="text-[2rem] leading-tight font-semibold text-[#2B2420] dark:text-[#F4EDE4]">
            Welcome back
          </h1>
          <p className="mt-2 text-[15px] text-[#6B6155] dark:text-[#F4EDE4]">
            Log in to save recipes, follow cooks, and pick up right where you left off.
          </p>

          {/* Form */}
          <Form className="mt-8 flex flex-col gap-5" onSubmit={handleSubmit}>
            <TextField name="email" type="email" isRequired className="flex flex-col gap-1.5">
              <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">Email</Label>
              <InputGroup>
                <InputGroup.Prefix>
                  <Envelope width={16} height={16} className="text-[#9C9388] dark:text-[#F4EDE4]" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="you@example.com"
                  className="border-[#EAE0D3]  text-[#2B2420] placeholder:text-[#9C9388] focus-visible:border-[#E85D3D] focus-visible:ring-[#E85D3D]/20"
                />
              </InputGroup>
              <FieldError className="text-xs text-[#D64545]" />
            </TextField>

            <TextField
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              isRequired
              minLength={6}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-[#2B2420] dark:text-[#F4EDE4]">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[#E85D3D] hover:text-[#D14E30]"
                >
                  Forgot password?
                </Link>
              </div>
              <InputGroup>
                <InputGroup.Prefix>
                  <Lock width={16} height={16} className="text-[#9C9388] dark:text-[#F4EDE4]" />
                </InputGroup.Prefix>
                <InputGroup.Input
                  placeholder="Enter your password"
                  className="border-[#EAE0D3] text-[#2B2420] placeholder:text-[#9C9388] focus-visible:border-[#E85D3D] focus-visible:ring-[#E85D3D]/20"
                />
                <InputGroup.Suffix>
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((v) => !v)}
                    className="text-[#9C9388] hover:text-[#6B6155]"
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                  >
                    {isPasswordVisible ? (
                      <EyeSlash width={16} height={16} />
                    ) : (
                      <Eye width={16} height={16} />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-xs text-[#D64545]" />
            </TextField>

            <Checkbox name="remember" className="mt-1">
              <Checkbox.Content>
                <Checkbox.Control className="border-[#EAE0D3] data-[selected=true]:border-[#E85D3D] data-[selected=true]:bg-[#E85D3D]">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                <Label className="text-sm text-[#6B6155] dark:text-[#F4EDE4]">Remember me</Label>
              </Checkbox.Content>
            </Checkbox>

            <Button
              type="submit"
              isDisabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-[#E85D3D] py-3 text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-[#D14E30] disabled:opacity-60"
            >
              {isSubmitting ? "Logging in…" : "Log in"}
            </Button>
          </Form>

          {/* Divider */}
          <div className="mt-7 flex items-center gap-3">
            <span className="h-px flex-1 bg-[#EAE0D3]" />
            <span className="text-xs font-medium uppercase tracking-wide text-[#9C9388] dark:text-[#F4EDE4]">
              or continue with
            </span>
            <span className="h-px flex-1 bg-[#EAE0D3]" />
          </div>

          {/* Google login */}
          <Button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#EAE0D3] bg-white py-3 text-[15px] font-medium text-[#2B2420] shadow-sm transition-colors hover:bg-[#FBF1E6]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.57 2.69-3.88 2.69-6.61z"
              />
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.85.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z"
              />
              <path
                fill="#FBBC05"
                d="M3.96 10.71A5.4 5.4 0 0 1 3.68 9c0-.59.1-1.17.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3-2.33z"
              />
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A8.59 8.59 0 0 0 9 0 9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z"
              />
            </svg>
            Continue with Google
          </Button>

          {/* Footer link */}
          <p className="mt-8 text-center text-sm text-[#6B6155] dark:text-[#F4EDE4]">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="font-medium text-[#E85D3D] hover:text-[#D14E30]">
              Sign up
            </Link>
          </p>
        </div>
      </section>

      {/* RIGHT — Visual panel: full-bleed image background, centered overlay text */}
      <section className="relative hidden overflow-hidden bg-[#2B2420] lg:block">
        <Image
          src="/cooking-image2.jpg"
          alt="Fresh vegetables sizzling in a wok"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 shadow-[inset_0_0_120px_60px_rgba(0,0,0,0.55)]" />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
          {/* Exactly 3 sentences */}
          <div className="max-w-md text-[1.1rem] leading-relaxed text-white/90">
            <p className="mb-3 text-[1.75rem] font-medium leading-snug text-white">
              Every recipe worth keeping, in one place.
            </p>
            <p>
              Discover culinary inspiration from home cooks and organize your favorite flavors effortlessly.
              Step into a smarter kitchen experience designed to turn everyday ingredients into unforgettable memories.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}