/**
 * PostHog analytics — tracks user journey through the tutor prototype.
 * All events are fire-and-forget. Failures are silently ignored.
 */

const POSTHOG_KEY = 'phc_kybHCa6J4vegGfpioLh2oySe9toLfeFhtbhJTF4qXRFm';
const POSTHOG_HOST = 'https://eu.i.posthog.com';

let posthog: any = null;
let sessionId: string | null = null;

export function initAnalytics() {
  if (typeof window === 'undefined') return;
  // Load posthog-js dynamically
  import('posthog-js').then((mod) => {
    posthog = mod.default;
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      person_profiles: 'always',
      capture_pageview: false,
      capture_pageleave: true,
      autocapture: false,
    });
    sessionId = crypto.randomUUID?.() || Math.random().toString(36).slice(2);
    posthog.register({ session_id: sessionId });
  }).catch(() => {});
}

function track(event: string, props?: Record<string, any>) {
  try {
    posthog?.capture(event, { ...props, session_id: sessionId });
  } catch {}
}

// ─── Session lifecycle ───
export const trackLangSelected = (lang: string) =>
  track('lang_selected', { lang });

export const trackSessionStarted = (lang: string, questionCount: number) =>
  track('session_started', { lang, question_count: questionCount });

// ─── Catchup ───
export const trackCatchupStarted = (lang: string, topic: string) =>
  track('catchup_started', { lang, topic });

export const trackCatchupMessage = (role: 'user' | 'agent', text: string, inputMode: 'voice' | 'text') =>
  track('catchup_message', { role, text: text.substring(0, 500), input_mode: inputMode });

export const trackCatchupCompleted = (exchangeCount: number) =>
  track('catchup_completed', { exchange_count: exchangeCount });

export const trackCatchupSkipped = () =>
  track('catchup_skipped');

// ─── Quiz ───
export const trackQuestionViewed = (questionIdx: number, questionId: number) =>
  track('question_viewed', { question_idx: questionIdx, question_id: questionId });

export const trackAnswerSelected = (questionIdx: number, questionId: number, selectedLabel: string) =>
  track('answer_selected', { question_idx: questionIdx, question_id: questionId, selected: selectedLabel });

export const trackAnswerSubmitted = (questionIdx: number, questionId: number, selectedLabel: string, correctLabel: string, isCorrect: boolean) =>
  track('answer_submitted', { question_idx: questionIdx, question_id: questionId, selected: selectedLabel, correct: correctLabel, is_correct: isCorrect });

// ─── Post-answer actions ───
export const trackTutorOpened = (questionIdx: number, questionId: number) =>
  track('tutor_opened', { question_idx: questionIdx, question_id: questionId });

export const trackExplanationOpened = (questionIdx: number, questionId: number) =>
  track('explanation_opened', { question_idx: questionIdx, question_id: questionId });

// ─── Tutor session ───
export const trackTutorMessage = (role: 'user' | 'agent', text: string, inputMode: 'voice' | 'text', questionIdx: number) =>
  track('tutor_message', { role, text: text.substring(0, 500), input_mode: inputMode, question_idx: questionIdx });

export const trackTutorCompleted = (questionIdx: number, exchangeCount: number) =>
  track('tutor_completed', { question_idx: questionIdx, exchange_count: exchangeCount });

export const trackTutorSkipped = (questionIdx: number) =>
  track('tutor_skipped', { question_idx: questionIdx });

// ─── Mode switches ───
export const trackModeSwitch = (to: 'voice' | 'text', screen: string) =>
  track('mode_switch', { to, screen });

// ─── Session end ───
export const trackSessionCompleted = (score: number, total: number, results: string[]) =>
  track('session_completed', { score, total, percentage: Math.round((score / total) * 100), results });

export const trackSessionExited = (atScreen: string, questionIdx: number) =>
  track('session_exited', { at_screen: atScreen, question_idx: questionIdx });
