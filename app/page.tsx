"use client";
import { supabase } from "@/lib/supabase/client";
import AuthGuard from "./components/AuthGuard";
import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Library,
  Settings,
  Users,
  Bell,
  Plus,
  CalendarDays,
  ArrowUpRight,
  Menu,
} from "lucide-react";

const activities = [
  { title: "Lesson Plans", detail: "Create and manage lessons", icon: BookOpen, count: "12", color: "blue" },
  { title: "Assessments", detail: "Prepare learner assessments", icon: ClipboardCheck, count: "8", color: "purple" },
  { title: "Teaching Resources", detail: "Organise learning materials", icon: Library, count: "24", color: "green" },
  { title: "My Learners", detail: "Manage learner records", icon: Users, count: "45", color: "orange" },
];

export default function Home() {
  async function handleSignOut() {
  await supabase.auth.signOut();
  window.location.href = "/login";
}
  return (
    <AuthGuard>
      <div className="flex justify-end p-4">
  <button
    onClick={handleSignOut}
    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
  >
    Sign Out
  </button>
</div>
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><GraduationCap size={25} /></div>
          <span>Smart<span className="brand-light">Teacher</span></span>
        </div>

        <p className="nav-label">MAIN MENU</p>
        <nav className="navigation">
          <a className="nav-link active" href="#"><LayoutDashboard size={19} /> Dashboard</a>
          <a className="nav-link" href="#lessons"><BookOpen size={19} /> Lesson Plans</a>
          <a className="nav-link" href="#assessments"><ClipboardCheck size={19} /> Assessments</a>
          <a className="nav-link" href="#resources"><Library size={19} /> Teaching Resources</a>
          <a className="nav-link" href="#learners"><Users size={19} /> Learners</a>
        </nav>

        <div className="sidebar-bottom">
          <a className="nav-link" href="#settings"><Settings size={19} /> Settings</a>
          <div className="profile-mini">
            <div className="avatar">T</div>
            <div><strong>Teacher Account</strong><small>Welcome to Smart Teacher</small></div>
          </div>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <button className="menu-button" aria-label="Menu"><Menu /></button>
          <div className="breadcrumb">Smart Teacher / <strong>Dashboard</strong></div>
          <button className="notification" aria-label="Notifications"><Bell size={20} /></button>
        </header>

        <div className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow">YOUR TEACHING SPACE</p>
              <h1>Welcome to Smart Teacher!</h1>
              <p className="welcome-text">Plan better, teach smarter, and make learning more meaningful.</p>
            </div>
            <div className="welcome-icon"><GraduationCap size={65} /></div>
          </section>

          <div className="section-heading">
            <div><h2>Your workspace</h2><p>Everything you need to manage your teaching.</p></div>
            <span className="today"><CalendarDays size={16} /> Teacher dashboard</span>
          </div>

          <section className="activity-grid">
            {activities.map((item) => {
              const Icon = item.icon;
              return (
                <article className="activity-card" key={item.title}>
                  <div className={`activity-icon ${item.color}`}><Icon size={23} /></div>
                  <div className="activity-count">{item.count}</div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                  <a href={`#${item.title.toLowerCase().replaceAll(" ", "-")}`} className="card-link">
                    Open workspace <ArrowUpRight size={16} />
                  </a>
                </article>
              );
            })}
          </section>

          <section className="lower-grid">
            <div className="panel">
              <div className="panel-heading">
                <div><h2>Quick actions</h2><p>Get started with your teaching tasks.</p></div>
              </div>
              <div className="quick-actions">
                <a href="#lessons"><span><Plus size={19} /></span><div><strong>Create lesson plan</strong><small>Prepare your next lesson</small></div><ArrowUpRight size={17} /></a>
                <a href="#assessments"><span><ClipboardCheck size={19} /></span><div><strong>Create assessment</strong><small>Prepare learner activities</small></div><ArrowUpRight size={17} /></a>
                <a href="#resources"><span><Library size={19} /></span><div><strong>Add teaching resource</strong><small>Organise learning materials</small></div><ArrowUpRight size={17} /></a>
              </div>
            </div>

            <div className="panel mission-panel">
              <div className="mission-symbol"><GraduationCap size={30} /></div>
              <h2>Teach with purpose.</h2>
              <p>Smart Teacher brings your planning, assessment and teaching resources together in one convenient workspace.</p>
              <span className="mission-tag">PLAN · TEACH · INSPIRE</span>
            </div>
          </section>

          <footer>© 2026 Smart Teacher. Supporting better teaching and learning.</footer>
        </div>
      </section>
    </main>
   </AuthGuard>        
  );
}
