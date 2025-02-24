export async function GET() {
  return new Response(JSON.stringify({apiKey: process.env.REACT_APP_API_KEY}), {
    status: 200,
  });
}
