// Proxy ไปยัง Anthropic API — เก็บ API key ไว้ใน Environment Variable ฝั่ง Netlify
// ตั้งค่า: Site settings → Environment variables → เพิ่ม ANTHROPIC_API_KEY
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: { message: "Method Not Allowed" } }) };
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: { message: "ยังไม่ได้ตั้งค่า ANTHROPIC_API_KEY ใน Netlify Environment variables" } })
    };
  }
  try {
    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: event.body
    });
    const text = await resp.text();
    return {
      statusCode: resp.status,
      headers: { "Content-Type": "application/json" },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: { message: "เรียก Anthropic API ไม่สำเร็จ: " + err.message } })
    };
  }
};
