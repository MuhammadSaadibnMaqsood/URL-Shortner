"use client"
import React, { useState } from "react";

export default function Shorten() {
  const [url, setUrl] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [generated, setGenerated] = useState(false);

  function handleChange() {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-bold tracking-wider text-blue-600 bg-blue-100 px-5 py-2 rounded-full uppercase">
              ✨ Link Shortener
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight">
            Generate Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Short URL
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform long, complex URLs into clean, shareable links in seconds
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-100 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Original URL Input */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Original URL
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-300" />
                <input
                  value={url}
                  type="text"
                  placeholder="https://example.com/very/long/url/path"
                  onChange={(e) => setUrl(e.target.value)}
                  className="relative w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none placeholder:text-gray-400"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Custom Short URL Input */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700 uppercase tracking-wide">
                Custom Short Link{" "}
                <span className="text-gray-400 font-normal normal-case">
                  (Optional)
                </span>
              </label>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-10 blur transition-opacity duration-300" />
                <div className="relative flex items-center">
                  <span className="absolute left-6 text-gray-500 font-medium">
                    bitlinks.co/
                  </span>
                  <input
                    value={shortURL}
                    type="text"
                    placeholder="my-custom-link"
                    onChange={(e) => setShortURL(e.target.value)}
                    className="relative w-full pl-32 pr-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-lg font-bold py-5 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 uppercase tracking-wide relative overflow-hidden group">
              <span className="relative z-10 flex items-center justify-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                Generate Short Link
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Info Text */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <svg
                className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p>
                <strong className="font-semibold text-gray-900">
                  Pro tip:
                </strong>{" "}
                Leave the custom link empty to auto-generate a random short URL,
                or enter your preferred custom alias for a branded link.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}
