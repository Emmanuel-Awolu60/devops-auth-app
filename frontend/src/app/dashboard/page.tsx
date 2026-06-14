"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    apiFetch("/api/auth/me", {}, token)
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <span className="text-xs font-mono tracking-widest text-cyan-500 uppercase">
            devops-auth-app
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-400 hover:text-white transition-colors border border-gray-700 hover:border-gray-500 rounded-md px-3 py-1.5"
          >
            Sign out
          </button>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="mt-1 text-sm text-gray-400">You&apos;re authenticated. Here&apos;s your session.</p>
        </div>

        {/* User card */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
          <div className="flex items-center gap-4 pb-5 border-b border-gray-800">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-lg">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">User ID</p>
              <p className="font-mono text-sm text-gray-200">{user.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Member since</p>
              <p className="text-sm text-gray-200">{joinedDate}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
              <p className="text-sm text-gray-200">{user.email}</p>
            </div>
          </div>
        </div>

        {/* DevOps hint */}
        <div className="mt-6 bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-5">
          <p className="text-xs font-mono text-cyan-500 uppercase tracking-wider mb-2">
            DevOps checkpoint
          </p>
          <p className="text-sm text-gray-300">
            This user is stored in PostgreSQL. Open a terminal and run:
          </p>
          <pre className="mt-3 bg-gray-950 rounded-lg px-4 py-3 text-xs font-mono text-cyan-300 overflow-x-auto">
            {`psql -U postgres -d devops_auth\nSELECT id, name, email, created_at FROM users;`}
          </pre>
        </div>
      </div>
    </div>
  );
}
