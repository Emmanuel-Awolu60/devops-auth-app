"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
      });
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8">
          <span className="text-xs font-mono tracking-widest text-cyan-500 uppercase">
            devops-auth-app
          </span>
          <h1 className="mt-2 text-3xl font-bold text-white">Sign in</h1>
          <p className="mt-1 text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              Register
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2.5">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-gray-950 font-semibold rounded-lg px-4 py-2.5 text-sm transition-colors"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
