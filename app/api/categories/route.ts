export async function GET() {
	return new Response(
		JSON.stringify(["All", "Todo", "Work", "Personal", "Meeting", "Shopping"]),
		{
			status: 200,
			headers: { "Content-Type": "application/json" },
		}
	)
}
