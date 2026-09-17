// Optional direct delivery on Netlify. Enable PUBLIC_CONTACT_ENDPOINT only after
// configuring RESEND_API_KEY and a verified CONTACT_FROM address on the host.
const allowedServices = new Set([
  '',
  'projetos-arquitetura',
  'remodelacao-reabilitacao',
  'viabilidade-terrenos',
  'levantamentos',
  'projetos-execucao',
  'interiores',
]);
const response = (statusCode, message) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify(message),
});

export async function handler(event) {
  if (event.httpMethod !== 'POST') return response(405, { ok: false });
  const headers = Object.fromEntries(
    Object.entries(event.headers || {}).map(([key, value]) => [key.toLowerCase(), value])
  );
  const origins = new Set(['https://www.sarapereira-arquitetura.pt', 'https://sarapereira-arquitetura.pt']);
  if (process.env.CONTACT_ALLOWED_ORIGIN) origins.add(process.env.CONTACT_ALLOWED_ORIGIN);
  if (headers.origin && !origins.has(headers.origin)) return response(403, { ok: false });
  if (!headers['content-type']?.startsWith('application/json')) return response(415, { ok: false });
  if (!event.body || event.body.length > 16000) return response(413, { ok: false });
  let data;
  try {
    data = JSON.parse(event.body);
  } catch {
    return response(400, { ok: false });
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return response(400, { ok: false });
  if (data.website) return response(400, { ok: false });
  const limits = { name: 120, email: 254, phone: 40, location: 180, message: 5000, service: 80 };
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof data[key] !== 'string' || data[key].length > limit) return response(400, { ok: false });
    data[key] = data[key].trim();
  }
  if (
    !data.name ||
    !data.location ||
    data.message.length < 10 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
    !allowedServices.has(data.service)
  )
    return response(400, { ok: false });
  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_FROM) return response(503, { ok: false });
  const text = `${data.message}\n\nNome: ${data.name}\nEmail: ${data.email}\nTelefone: ${data.phone || 'Não indicado'}\nLocalidade: ${data.location}\nServiço: ${data.service || 'A definir'}`;
  try {
    const result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM,
        to: ['sarapereira.arquitetura@hotmail.com'],
        reply_to: data.email,
        subject: 'Novo pedido - Sara Pereira Arquitetura',
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!result.ok) return response(502, { ok: false });
    const sent = await result.json();
    if (!sent.id) return response(502, { ok: false });
    return response(200, { ok: true });
  } catch {
    return response(502, { ok: false });
  }
}
