"use client";

import { FormEvent, useState } from "react";
import {
  Check,
  ChevronRight,
  Heart,
  Loader2,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";

const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];
const ratingFields = [
  { name: "cleanlinessRating", label: "Cleanliness" },
  { name: "serviceRating", label: "Service" },
  { name: "comfortRating", label: "Comfort" },
];

type FeedbackForm = {
  guestName: string;
  email: string;
  stayDate: string;
  roomNumber: string;
  overallRating: number;
  cleanlinessRating: number;
  serviceRating: number;
  comfortRating: number;
  comments: string;
  wouldRecommend: boolean;
  consent: boolean;
};

const initialForm: FeedbackForm = {
  guestName: "",
  email: "",
  stayDate: "",
  roomNumber: "",
  overallRating: 0,
  cleanlinessRating: 0,
  serviceRating: 0,
  comfortRating: 0,
  comments: "",
  wouldRecommend: true,
  consent: false,
};

function Rating({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (value: number) => void;
  label: string;
}) {
  return (
    <fieldset className="min-w-0 space-y-3">
      <legend className="text-sm font-semibold text-[#111f0f]">{label}</legend>
      <div
        className="flex flex-wrap items-center gap-1"
        role="radiogroup"
        aria-label={`${label} rating`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            aria-label={`${star} out of 5`}
            aria-pressed={value === star}
            className="rounded-full p-1 transition hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Star
              className={`size-7 ${star <= value ? "fill-primary text-[#bac200]" : "text-[#7c837a]/30"}`}
            />
          </button>
        ))}
        <span className="ml-2 text-xs text-[#7c837a]">
          {value ? ratingLabels[value - 1] : "Select a rating"}
        </span>
      </div>
    </fieldset>
  );
}

export default function Page() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  const update = (key: keyof FeedbackForm, value: string | number | boolean) =>
    setForm((current) => ({ ...current, [key]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (
      !form.overallRating ||
      !form.cleanlinessRating ||
      !form.serviceRating ||
      !form.comfortRating ||
      !form.consent
    ) {
      setError(
        "Please complete every rating and agree to the feedback consent.",
      );
      return;
    }
    setStatus("submitting");
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Unable to save feedback");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success")
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8faec] px-5 py-12">
        <section className="w-full max-w-xl rounded-[2rem] border border-[#dbddc7] bg-[#ffffff] p-8 text-center shadow-xl shadow-[#bac200]/5 sm:p-12">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#bac200] text-[#0b1a09]">
            <Check className="size-8" />
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-[#ea5e8c]">
            Thank you
          </p>
          <h1 className="mt-3 text-balance font-serif text-4xl font-bold text-[#111f0f]">
            Your feedback means the world to us.
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-[#7c837a]">
            Your thoughts help our team make every stay at Comfy Inn Eldoret
            even more comfortable.
          </p>
          <button
            onClick={() => {
              setForm(initialForm);
              setStatus("idle");
            }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#bac200] px-6 py-3 text-sm font-bold text-[#0b1a09] transition hover:opacity-90"
          >
            Share more feedback <ChevronRight className="size-4" />
          </button>
        </section>
      </main>
    );

  return (
    <main className="min-h-screen bg-[#f8faec] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex items-center justify-between gap-4 border-b border-[#dbddc7] pb-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#bac200] text-[#0b1a09]">
              <Image
                src="/logo.jpeg"
                alt="Comfy Inn Logo"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="font-serif text-[#111f0f] text-xl font-bold tracking-tight">
                Comfy Inn
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#ea5e8c]">
                Eldoret
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs font-medium text-[#7c837a] sm:flex">
            <ShieldCheck className="size-4 text-[#bac200]" /> Your privacy is
            respected
          </div>
        </header>

        <div className="grid gap-10 py-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:py-16">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <h1 className="max-w-lg text-balance font-serif text-5xl font-bold leading-[1.04] tracking-tight text-[#111f0f] sm:text-6xl">
              How was your stay?
            </h1>
            <p className="mt-6 max-w-md text-pretty text-lg leading-8 text-[#7c837a]">
              A few moments of your time help us create warmer welcomes, softer
              landings, and better stays for every guest.
            </p>
            <div className="mt-10 flex items-start gap-3 border-l-2 border-[#ea5e8c] pl-5">
              <MessageCircleHeart className="mt-1 size-5 shrink-0 text-[#ea5e8c]" />
              <p className="text-sm leading-6 text-[#7c837a]">
                Be honest, be specific, and let us know what would make your
                next visit exceptional.
              </p>
            </div>
          </div>

          <form
            onSubmit={submit}
            className="rounded-[2rem] border border-[#dbddc7] bg-[#ffffff] p-5 shadow-xl shadow-[#bac200]/5 sm:p-8"
          >
            <div className="space-y-8">
              <div>
                <h2 className="font-serif text-[#111f0f] text-2xl font-bold">
                  Tell us about you
                </h2>
                <p className="mt-1 text-sm text-[#7c837a]">
                  Your details help us connect feedback to your visit.
                </p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="space-y-2 text-[#111f0f] text-sm font-semibold">
                  Your name
                  <input
                    required
                    value={form.guestName}
                    onChange={(e) => update("guestName", e.target.value)}
                    placeholder="Jane Wanjiku"
                    className="field"
                  />
                </label>
                <label className="space-y-2 text-[#111f0f] text-sm font-semibold">
                  Email address (Optional)
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane@example.com"
                    className="field"
                  />
                </label>
                <label className="space-y-2 text-[#111f0f] text-sm font-semibold">
                  Date of stay
                  <input
                    required
                    type="date"
                    value={form.stayDate}
                    onChange={(e) => update("stayDate", e.target.value)}
                    className="field"
                  />
                </label>
                <label className="space-y-2 text-[#111f0f] text-sm font-semibold">
                  Room number{" "}
                  <span className="font-normal text-[#7c837a]">(optional)</span>
                  <input
                    value={form.roomNumber}
                    onChange={(e) => update("roomNumber", e.target.value)}
                    placeholder="e.g. 204"
                    className="field"
                  />
                </label>
              </div>
              <div className="border-t border-[#dbddc7] pt-7">
                <Rating
                  label="Overall experience"
                  value={form.overallRating}
                  onChange={(v) => update("overallRating", v)}
                />
              </div>
              <div className="grid gap-6 border-t border-[#dbddc7] pt-7 sm:grid-cols-3">
                {ratingFields.map((field) => (
                  <Rating
                    key={field.name}
                    label={field.label}
                    value={form[field.name as keyof FeedbackForm] as number}
                    onChange={(v) =>
                      update(field.name as keyof FeedbackForm, v)
                    }
                  />
                ))}
              </div>
              <label className="block space-y-2 border-t text-[#111f0f] border-[#dbddc7] pt-7 text-sm font-semibold">
                What stood out during your stay?
                <textarea
                  required
                  minLength={10}
                  rows={5}
                  value={form.comments}
                  onChange={(e) => update("comments", e.target.value)}
                  placeholder="Tell us about a memorable moment, or where we can do better..."
                  className="field resize-none"
                />
              </label>
              <div className="space-y-4 border-t border-[#dbddc7] pt-7">
                <label className="flex cursor-pointer items-start gap-3 text-sm text-[#7c837a]">
                  <input
                    type="checkbox"
                    checked={form.wouldRecommend}
                    onChange={(e) => update("wouldRecommend", e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--primary)]"
                  />
                  <span>
                    Yes, I would recommend Comfy Inn Eldoret to friends and
                    family.
                  </span>
                </label>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-[#7c837a]">
                  <input
                    required
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => update("consent", e.target.checked)}
                    className="mt-0.5 size-4 accent-[var(--secondary)]"
                  />
                  <span>
                    I agree that Comfy Inn Eldoret may use this feedback to
                    improve its guest experience.
                  </span>
                </label>
              </div>
              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
                >
                  {error}
                </p>
              )}
              <button
                disabled={status === "submitting"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-secondary px-6 py-4 text-sm font-bold text-[#ea5e8c]-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Sending
                    feedback...
                  </>
                ) : (
                  <>
                    Send my feedback <ChevronRight className="size-4" />
                  </>
                )}
              </button>
              <p className="text-center text-xs leading-5 text-[#7c837a]">
                Thank you for helping us make Comfy Inn feel like home.
              </p>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
