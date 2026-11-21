"use client";

import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase/client";

type LessonPlan = {
  id: string;
  title: string;
  subject: string;
  grade_level: string;
  topic: string;
  lesson_date: string | null;
  duration_minutes: number | null;
  learning_outcomes: string | null;
  activities: string | null;
  resources: string | null;
};

export default function LessonPlansPage() {
  const [plans, setPlans] = useState<LessonPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    subject: "",
    grade_level: "",
    topic: "",
    lesson_date: "",
    duration_minutes: "",
    learning_outcomes: "",
    activities: "",
    resources: "",
  });

  async function loadPlans() {
    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData.user) {
      window.location.href = "/login";
      return;
    }

    const { data, error } = await supabase
      .from("lesson_plans")
      .select("*")
      .eq("teacher_id", userData.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
    } else {
      setPlans(data as LessonPlan[]);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadPlans();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const { data: userData, error: userError } =
      await supabase.auth.getUser();

    if (userError || !userData.user) {
      setMessage("Please sign in again.");
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("lesson_plans").insert({
      teacher_id: userData.user.id,
      title: form.title,
      subject: form.subject,
      grade_level: form.grade_level,
      topic: form.topic,
      lesson_date: form.lesson_date || null,
      duration_minutes: form.duration_minutes
        ? Number(form.duration_minutes)
        : null,
      learning_outcomes: form.learning_outcomes,
      activities: form.activities,
      resources: form.resources,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Lesson plan saved successfully!");
      setForm({
        title: "",
        subject: "",
        grade_level: "",
        topic: "",
        lesson_date: "",
        duration_minutes: "",
        learning_outcomes: "",
        activities: "",
        resources: "",
      });
      await loadPlans();
    }

    setSaving(false);
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <a href="/" className="text-blue-700 hover:underline">
            ← Back to Dashboard
          </a>
          <h1 className="mt-4 text-3xl font-bold text-slate-800">
            Lesson Planner
          </h1>
          <p className="mt-2 text-slate-600">
            Create and manage your teaching lesson plans.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-6 shadow"
        >
          <h2 className="text-xl font-semibold">Create a Lesson Plan</h2>

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Lesson title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              className="rounded-lg border p-3"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) =>
                setForm({ ...form, subject: e.target.value })
              }
              required
            />

            <input
              className="rounded-lg border p-3"
              placeholder="Grade level"
              value={form.grade_level}
              onChange={(e) =>
                setForm({ ...form, grade_level: e.target.value })
              }
              required
            />
          </div>

          <input
            className="w-full rounded-lg border p-3"
            placeholder="Topic"
            value={form.topic}
            onChange={(e) =>
              setForm({ ...form, topic: e.target.value })
            }
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <input
              type="date"
              className="rounded-lg border p-3"
              value={form.lesson_date}
              onChange={(e) =>
                setForm({ ...form, lesson_date: e.target.value })
              }
            />

            <input
              type="number"
              min="1"
              className="rounded-lg border p-3"
              placeholder="Duration (minutes)"
              value={form.duration_minutes}
              onChange={(e) =>
                setForm({
                  ...form,
                  duration_minutes: e.target.value,
                })
              }
            />
          </div>

          <textarea
            className="w-full rounded-lg border p-3"
            placeholder="Lesson learning_outcomes"
            rows={3}
            value={form.learning_outcomes}
            onChange={(e) =>
              setForm({ ...form, learning_outcomes: e.target.value })
            }
          />

          <textarea
            className="w-full rounded-lg border p-3"
            placeholder="Teaching and learning activities"
            rows={4}
            value={form.activities}
            onChange={(e) =>
              setForm({ ...form, activities: e.target.value })
            }
          />

          <textarea
            className="w-full rounded-lg border p-3"
            placeholder="Teaching and learning resources"
            rows={3}
            value={form.resources}
            onChange={(e) =>
              setForm({ ...form, resources: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-lg bg-blue-700 p-3 font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Lesson Plan"}
          </button>

          {message && (
            <p className="text-sm text-slate-700">{message}</p>
          )}
        </form>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800">
            My Saved Lesson Plans
          </h2>

          {loading ? (
            <p>Loading lesson plans...</p>
          ) : plans.length === 0 ? (
            <p className="rounded-xl bg-white p-5 text-slate-600">
              No lesson plans saved yet.
            </p>
          ) : (
            plans.map((plan) => (
              <article
                key={plan.id}
                className="space-y-2 rounded-xl bg-white p-5 shadow"
              >
                <h3 className="text-lg font-bold">{plan.title}</h3>
                <p>Subject: {plan.subject}</p>
                <p>Grade: {plan.grade_level}</p>
                <p>Topic: {plan.topic}</p>
                {plan.lesson_date && <p>Date: {plan.lesson_date}</p>}
                {plan.duration_minutes && (
                  <p>Duration: {plan.duration_minutes} minutes</p>
                )}
                {plan.learning_outcomes && (
                  <p>learning_outcomes: {plan.learning_outcomes}</p>
                )}
                {plan.activities && (
                  <p>Activities: {plan.activities}</p>
                )}
                {plan.resources && (
                  <p>Resources: {plan.resources}</p>
                )}
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  );
}
