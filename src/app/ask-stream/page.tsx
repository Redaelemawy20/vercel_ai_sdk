"use client";

import { useCompletion } from "@ai-sdk/react";

export default function AskStreamPage() {
  const { completion, input, handleInputChange, handleSubmit, isLoading } =
    useCompletion({
      api: "/api/ask-stream",
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Ask AI Assistant (Streaming)
          </h1>
          <p className="text-lg text-gray-600">
            Ask me anything! I'll respond in real-time as I think through your
            question.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Message
              </label>
              <textarea
                id="message"
                value={input}
                onChange={handleInputChange}
                placeholder="Type your question or message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                rows={4}
                disabled={isLoading}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Streaming...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        {completion && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              AI Response
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-wrap">{completion}</p>
              {isLoading && (
                <span className="inline-block w-2 h-4 bg-green-500 ml-1 animate-pulse"></span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
