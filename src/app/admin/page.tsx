"use client";

import { useEffect, useState } from "react";
import { ContactMessage, Experience, Project } from "@/lib/types";

type Tab = "projects" | "experience" | "inbox";

const emptyProject: Omit<Project, "id" | "createdAt"> = {
  title: "",
  description: "",
  tech: [],
  githubUrl: "",
  liveUrl: "",
  featured: false,
  year: new Date().getFullYear().toString(),
};

const emptyExperience: Omit<Experience, "id" | "createdAt"> = {
  role: "",
  organization: "",
  type: "work",
  startDate: "",
  endDate: "",
  description: "",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("projects");

  const [projects, setProjects] = useState<Project[]>([]);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [showExpForm, setShowExpForm] = useState(false);
  const [expForm, setExpForm] = useState(emptyExperience);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => {
        setAuthed(d.authed);
        if (d.authed) loadAll();
      })
      .catch(() => setAuthed(false));
  }, []);

  async function loadAll() {
    setLoading(true);
    const [p, e, m] = await Promise.all([
      fetch("/api/admin/projects").then((r) => r.json()),
      fetch("/api/admin/experience").then((r) => r.json()),
      fetch("/api/admin/messages").then((r) => r.json()),
    ]);
    setProjects(p.projects ?? []);
    setExperience(e.experience ?? []);
    setMessages(m.messages ?? []);
    setLoading(false);
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      setPassword("");
      loadAll();
    } else {
      setLoginError("Wrong password.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
  }

  // ---------- projects ----------
  function startEditProject(p?: Project) {
    setShowProjectForm(true);
    if (p) {
      setEditingProject(p);
      setProjectForm({
        title: p.title,
        description: p.description,
        tech: p.tech,
        githubUrl: p.githubUrl ?? "",
        liveUrl: p.liveUrl ?? "",
        featured: p.featured,
        year: p.year,
      });
    } else {
      setEditingProject(null);
      setProjectForm(emptyProject);
    }
  }

  function closeProjectForm() {
    setShowProjectForm(false);
    setEditingProject(null);
    setProjectForm(emptyProject);
  }

  async function saveProject(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      ...projectForm,
      tech:
        typeof projectForm.tech === "string"
          ? (projectForm.tech as unknown as string)
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : projectForm.tech,
    };
    const res = await fetch(
      editingProject ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects",
      {
        method: editingProject ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (res.ok) {
      const d = await res.json();
      setProjects(d.projects);
      closeProjectForm();
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (res.ok) setProjects((await res.json()).projects);
  }

  // ---------- experience ----------
  function startEditExp(x?: Experience) {
    setShowExpForm(true);
    if (x) {
      setEditingExp(x);
      setExpForm({
        role: x.role,
        organization: x.organization,
        type: x.type,
        startDate: x.startDate,
        endDate: x.endDate,
        description: x.description,
      });
    } else {
      setEditingExp(null);
      setExpForm(emptyExperience);
    }
  }

  function closeExpForm() {
    setShowExpForm(false);
    setEditingExp(null);
    setExpForm(emptyExperience);
  }

  async function saveExp(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch(
      editingExp ? `/api/admin/experience/${editingExp.id}` : "/api/admin/experience",
      {
        method: editingExp ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expForm),
      }
    );
    if (res.ok) {
      setExperience((await res.json()).experience);
      closeExpForm();
    }
  }

  async function deleteExp(id: string) {
    if (!confirm("Delete this entry?")) return;
    const res = await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    if (res.ok) setExperience((await res.json()).experience);
  }

  // ---------- messages ----------
  async function toggleRead(m: ContactMessage) {
    const res = await fetch(`/api/admin/messages/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !m.read }),
    });
    if (res.ok) setMessages((await res.json()).messages);
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (res.ok) setMessages((await res.json()).messages);
  }

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus:border-accent-500/60";
  const btnPrimary =
    "rounded-lg bg-accent-600 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-500";
  const btnGhost =
    "rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-300 hover:bg-white/10";

  if (authed === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <form
          onSubmit={login}
          className="glass w-full max-w-sm rounded-2xl p-8"
        >
          <h1 className="font-display text-2xl font-bold text-white">
            Admin Login
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Enter the admin password to manage your portfolio.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className={`${inputCls} mt-6`}
            autoFocus
          />
          {loginError && (
            <p className="mt-2 text-sm text-red-400">{loginError}</p>
          )}
          <button type="submit" className={`${btnPrimary} mt-4 w-full`}>
            Login
          </button>
        </form>
      </div>
    );
  }

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-ink-950 px-5 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold text-white">
            Portfolio CMS
          </h1>
          <button onClick={logout} className={btnGhost}>
            Logout
          </button>
        </div>

        <div className="mb-8 flex gap-2">
          {(["projects", "experience", "inbox"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                tab === t
                  ? "bg-accent-600 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              }`}
            >
              {t}
              {t === "inbox" && unread > 0 && (
                <span className="ml-2 rounded-full bg-mint-400 px-2 py-0.5 text-xs font-bold text-ink-950">
                  {unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading && <p className="text-slate-500">Loading data…</p>}

        {/* ================= PROJECTS ================= */}
        {tab === "projects" && !loading && (
          <div>
            <button onClick={() => startEditProject()} className={btnPrimary}>
              + Add Project
            </button>

            {showProjectForm && (
              <form
                onSubmit={saveProject}
                className="glass mt-6 space-y-4 rounded-2xl p-6"
              >
                <h3 className="font-display font-bold text-white">
                  {editingProject ? "Edit Project" : "New Project"}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className={inputCls}
                    placeholder="Title"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    maxLength={120}
                    required
                  />
                  <input
                    className={inputCls}
                    placeholder="Year (e.g. 2026)"
                    value={projectForm.year}
                    onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                    maxLength={9}
                    required
                  />
                </div>
                <textarea
                  className={`${inputCls} min-h-[100px]`}
                  placeholder="Description"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  maxLength={600}
                  required
                />
                <input
                  className={inputCls}
                  placeholder="Tech stack (comma separated: Laravel, Vue.js, MySQL)"
                  value={Array.isArray(projectForm.tech) ? projectForm.tech.join(", ") : projectForm.tech}
                  onChange={(e) => setProjectForm({ ...projectForm, tech: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                  maxLength={300}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className={inputCls}
                    placeholder="GitHub URL (optional)"
                    value={projectForm.githubUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                    maxLength={300}
                  />
                  <input
                    className={inputCls}
                    placeholder="Live demo URL (optional)"
                    value={projectForm.liveUrl}
                    onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                    maxLength={300}
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-slate-300">
                  <input
                    type="checkbox"
                    checked={projectForm.featured}
                    onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                    className="h-4 w-4 accent-indigo-500"
                  />
                  Featured on homepage
                </label>
                <div className="flex gap-2">
                  <button type="submit" className={btnPrimary}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={closeProjectForm}
                    className={btnGhost}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 space-y-3">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="glass flex items-center justify-between gap-4 rounded-xl p-4"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {p.title}
                      {p.featured && (
                        <span className="ml-2 rounded-full bg-mint-400/15 px-2 py-0.5 text-xs text-mint-400">
                          Featured
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-slate-500">
                      {p.year} · {p.tech.join(", ")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditProject(p)} className={btnGhost}>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProject(p.id)}
                      className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= EXPERIENCE ================= */}
        {tab === "experience" && !loading && (
          <div>
            <button onClick={() => startEditExp()} className={btnPrimary}>
              + Add Entry
            </button>

            {showExpForm && (
              <form onSubmit={saveExp} className="glass mt-6 space-y-4 rounded-2xl p-6">
                <h3 className="font-display font-bold text-white">
                  {editingExp ? "Edit Entry" : "New Entry"}
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    className={inputCls}
                    placeholder="Role / Degree (e.g. Backend Developer)"
                    value={expForm.role}
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                    maxLength={120}
                    required
                  />
                  <input
                    className={inputCls}
                    placeholder="Organization / Company"
                    value={expForm.organization}
                    onChange={(e) => setExpForm({ ...expForm, organization: e.target.value })}
                    maxLength={120}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <select
                    className={inputCls}
                    value={expForm.type}
                    onChange={(e) => setExpForm({ ...expForm, type: e.target.value as Experience["type"] })}
                  >
                    <option value="work">Work</option>
                    <option value="education">Education</option>
                    <option value="organization">Organization</option>
                  </select>
                  <input
                    className={inputCls}
                    placeholder="Start (e.g. 2024)"
                    value={expForm.startDate}
                    onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })}
                    maxLength={20}
                    required
                  />
                  <input
                    className={inputCls}
                    placeholder="End (e.g. Present)"
                    value={expForm.endDate}
                    onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })}
                    maxLength={20}
                    required
                  />
                </div>
                <textarea
                  className={`${inputCls} min-h-[100px]`}
                  placeholder="Description"
                  value={expForm.description}
                  onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                  maxLength={800}
                  required
                />
                <div className="flex gap-2">
                  <button type="submit" className={btnPrimary}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={closeExpForm}
                    className={btnGhost}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 space-y-3">
              {experience.map((x) => (
                <div
                  key={x.id}
                  className="glass flex items-center justify-between gap-4 rounded-xl p-4"
                >
                  <div>
                    <p className="font-semibold text-white">
                      {x.role}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        · {x.type} · {x.startDate} — {x.endDate}
                      </span>
                    </p>
                    <p className="text-xs text-slate-500">{x.organization}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEditExp(x)} className={btnGhost}>
                      Edit
                    </button>
                    <button
                      onClick={() => deleteExp(x.id)}
                      className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= INBOX ================= */}
        {tab === "inbox" && !loading && (
          <div className="space-y-4">
            {messages.length === 0 && (
              <p className="text-slate-500">No messages yet.</p>
            )}
            {messages.map((m) => (
              <div
                key={m.id}
                className={`glass rounded-2xl p-5 ${m.read ? "opacity-70" : "border-accent-500/30"}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-white">
                    {m.name}
                    <span className="ml-2 text-xs font-normal text-slate-500">
                      {m.email}
                    </span>
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(m.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
                <p className="mt-1 text-sm font-medium text-accent-300">{m.subject}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-300">
                  {m.message}
                </p>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => toggleRead(m)} className={btnGhost}>
                    Mark as {m.read ? "unread" : "read"}
                  </button>
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-300 hover:bg-red-500/10"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
