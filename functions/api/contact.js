export async function onRequestPost({ request, env }) {
  // Turnstile検証
  const formData = await request.formData();
  const token = formData.get("cf-turnstile-response");

  if (!token) {
    return Response.json({ error: "認証トークンが必要です" }, { status: 400 });
  }

  const turnstileRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${env.TURNSTILE_SECRET}&response=${token}`,
    },
  );

  const turnstileData = await turnstileRes.json();
  if (!turnstileData.success) {
    return Response.json({ error: "認証に失敗しました" }, { status: 403 });
  }

  // Resendでメール送信
  const sendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "デモサイト <noreply@yourdomain.com>",
      to: ["your-email@gmail.com"],
      subject: "【デモ】お問い合わせが来ました！",
      html: `
        <h2>Cloudflare Pagesデモ - お問い合わせ</h2>
        <p><strong>IP:</strong> ${ip}</p>
        <p><strong>User Agent:</strong> ${request.headers.get("User-Agent")}</p>
        <p><strong>時刻:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p>※これは静的サイトだけで動くデモです！</p>
      `,
    }),
  });

  if (!sendRes.ok) {
    return Response.json({ error: "メール送信エラー" }, { status: 500 });
  }

  return Response.json({ message: "送信完了！" });
}
