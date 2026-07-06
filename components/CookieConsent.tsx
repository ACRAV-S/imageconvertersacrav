"use client";

import { useState, useEffect } from "react";
import {
  getStoredConsent,
  grantAllConsent,
  denyAllConsent,
  updateConsent,
} from "@/lib/consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [ads, setAds] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    grantAllConsent();
    setVisible(false);
  };

  const handleRejectAll = () => {
    denyAllConsent();
    setVisible(false);
  };

  const handleSave = () => {
    updateConsent({
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: ads ? "granted" : "denied",
      ad_user_data: ads ? "granted" : "denied",
      ad_personalization: ads ? "granted" : "denied",
    });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">
        {!showCustomize ? (
          <>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
              We use cookies and similar technologies to enhance your
              experience, analyze traffic, and serve personalized content. You
              can choose to accept or reject non-essential cookies.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectAll}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Reject All
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="rounded-lg px-5 py-2.5 text-sm font-medium text-blue-600 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-blue-400"
              >
                Customize
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Cookie Preferences
            </h3>
            <div className="mb-4 space-y-3">
              <label className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Analytics
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Helps us understand how visitors use the site.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
              <label className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Advertising
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Enables personalized ads and ad measurement.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={ads}
                  onChange={(e) => setAds(e.target.checked)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </label>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Functional
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Required for core site functionality. Always active.
                  </p>
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  Always Active
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowCustomize(false)}
                className="rounded-lg px-5 py-2.5 text-sm font-medium text-gray-600 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:text-gray-400"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
