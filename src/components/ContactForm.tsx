import React, { useState } from "react";

export default function ContactForm() {
  const [activeTab, setActiveTab] = useState<"business" | "meetup">("business");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Web3Formsのアクセスキー
  const WEB3FORMS_ACCESS_KEY = "b7546ad7-6951-4c2f-ad5b-208f5bd03bc9";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.status === 200) {
        setSubmitStatus("success");
      } else {
        console.error("Form submission error:", result);
        setSubmitStatus("error");
        setErrorMessage(
          result.message ||
            "送信に失敗しました。時間をおいて再度お試しください。",
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "通信エラーが発生しました。ネットワーク環境をご確認ください。",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8 sm:p-12 shadow-2xl text-center animate-fade-in">
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          送信が完了しました
        </h3>
        <p className="text-gray-400 mb-8 leading-relaxed">
          お問い合わせいただき、誠にありがとうございます。
          <br />
          通常24時間以内に、担当者よりご返信いたします。
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
        >
          フォームに戻る
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
      {/* Tabs */}
      <div className="flex p-1 space-x-1 bg-black/50 rounded-xl mb-8 border border-gray-800">
        <button
          onClick={() => setActiveTab("business")}
          className={`w-full py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 ${
            activeTab === "business"
              ? "bg-red-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          お仕事のご相談・お見積り
        </button>
        <button
          onClick={() => setActiveTab("meetup")}
          className={`w-full py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-200 ${
            activeTab === "meetup"
              ? "bg-blue-600 text-white shadow-lg"
              : "text-gray-400 hover:text-white hover:bg-gray-800/50"
          }`}
        >
          エンジニア交流会への参加
        </button>
      </div>

      {submitStatus === "error" && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {errorMessage}
        </div>
      )}

      {/* Business Form */}
      {activeTab === "business" && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          {/* メールの件名（Web3Forms側の設定） */}
          <input
            type="hidden"
            name="subject"
            value="【TECH-i】HPからのお仕事のご相談"
          />
          <input
            type="hidden"
            name="from_name"
            value="TECH-i コーポレートサイト"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="b_name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                お名前 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="b_name"
                name="name"
                required
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                placeholder="山田 太郎"
              />
            </div>
            <div>
              <label
                htmlFor="b_email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="b_email"
                name="email"
                required
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                placeholder="taro@example.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="b_company"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              貴社名 <span className="text-gray-500 text-xs">（任意）</span>
            </label>
            <input
              type="text"
              id="b_company"
              name="company"
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              placeholder="株式会社〇〇"
            />
          </div>

          <div>
            <label
              htmlFor="b_type"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              ご相談の種類
            </label>
            <select
              id="b_type"
              name="inquiry_type"
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors appearance-none"
            >
              <option value="Webシステム・アプリ開発">
                Webシステム・アプリ開発
              </option>
              <option value="ITコンサルティング・PMO支援">
                ITコンサルティング・PMO支援
              </option>
              <option value="モダンWebサイト・LP制作">
                モダンWebサイト・LP制作
              </option>
              <option value="業務効率化・自動化支援（DX）">
                業務効率化・自動化支援（DX）
              </option>
              <option value="その他">その他・全体的なご相談</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="b_message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              ご相談内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="b_message"
              name="message"
              required
              rows={5}
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
              placeholder="現在の課題やご希望の要件、予算感・納期目安など、お分かりになる範囲でご記入ください。"
            ></textarea>
          </div>

          <div className="pt-4 flex flex-col items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-12 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "送信中..." : "送信する"}
              {!isSubmitting && (
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              )}
            </button>
            <p className="mt-4 text-xs text-gray-500 text-center">
              ※送信後、通常24時間以内にご返信いたします。
            </p>
          </div>
        </form>
      )}

      {/* Meetup Form */}
      {activeTab === "meetup" && (
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
          <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
          <input
            type="hidden"
            name="subject"
            value="【TECH-i】エンジニア交流会 参加希望"
          />
          <input type="hidden" name="from_name" value="TECH-i 交流会受付" />

          <div className="p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg mb-6">
            <p className="text-sm text-blue-200">
              情報交換や技術トークを目的に、不定期でエンジニア交流会（オンライン/オフライン）を開催しています。
              <br />
              フリーランス、企業所属問わず、お気軽にご連絡ください！
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="m_name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                お名前 / ハンドルネーム <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="m_name"
                name="name"
                required
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="やまだ"
              />
            </div>
            <div>
              <label
                htmlFor="m_email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                連絡用メールアドレス <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="m_email"
                name="email"
                required
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="taro@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="m_role"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                メインの役割・職種
              </label>
              <input
                type="text"
                id="m_role"
                name="role"
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="例: バックエンドエンジニア"
              />
            </div>
            <div>
              <label
                htmlFor="m_social"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                X(Twitter) / GitHub等{" "}
                <span className="text-gray-500 text-xs">（任意）</span>
              </label>
              <input
                type="text"
                id="m_social"
                name="social_url"
                className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="m_message"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              メッセージ・興味のある技術等{" "}
              <span className="text-red-500">*</span>
            </label>
            <textarea
              id="m_message"
              name="message"
              required
              rows={4}
              className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              placeholder="自己紹介や、最近気になっている技術などをご自由にどうぞ！"
            ></textarea>
          </div>

          <div className="pt-4 flex flex-col items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-12 py-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "送信中..." : "参加希望を送信する"}
              {!isSubmitting && (
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              )}
            </button>
            <p className="mt-4 text-xs text-gray-500 text-center">
              ※次回の開催日程が決まり次第、メールにてご案内いたします。
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
