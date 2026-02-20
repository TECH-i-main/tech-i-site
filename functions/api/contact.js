export async function onRequestPost({ request, env }) {
  console.log("== DEBUG INFO ==");
  console.log("TURNSTILE_SECRET exists?", !!env.TURNSTILE_SECRET);
  console.log("RESEND_API_KEY exists?", !!env.RESEND_API_KEY);
  console.log("Secret length:", env.TURNSTILE_SECRET?.length);

  // Turnstile検証
  //   const formData = await request.formData();
  //   const token = formData.get("cf-turnstile-response");
  //   console.log("Token received:", !!token, token?.substring(0, 20) + "...");

  //   if (!token) {
  //     return Response.json({ error: "認証トークンが必要です" }, { status: 400 });
  //   }

  //   const turnstileRes = await fetch(
  //     "https://challenges.cloudflare.com/turnstile/v0/siteverify",
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: `secret=${env.TURNSTILE_SECRET}&response=${token}`,
  //     },
  //   );

  //   const turnstileData = await turnstileRes.json();
  //   if (!turnstileData.success) {
  //     return Response.json({ error: "認証に失敗しました" }, { status: 403 });
  //   }

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
        <p><strong>IP:</strong> ${request.headers.get("CF-Connecting-IP")}</p>
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
