import { streamText } from "ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const SYSTEM_PROMPT = `Eres un experto en marketing digital. Cuando el usuario te dé un prompt, genera un plan de marketing completo y estructurado en español que incluya:

1. **Resumen ejecutivo**
2. **Análisis del público objetivo**
3. **Objetivos SMART**
4. **Estrategias y tácticas** (canales digitales, contenido, publicidad)
5. **Calendario de ejecución** (timeline de 3 meses)
6. **Presupuesto estimado**
7. **KPIs y métricas de seguimiento**

Sé detallado, práctico y adapta todo al contexto que proporcione el usuario.`;

export async function POST(req: Request) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return new Response("No autorizado", { status: 401 });
	}

	const { prompt, model } = (await req.json()) as {
		prompt: string;
		model: string;
	};

	const allowedModels = [
		"anthropic/claude-sonnet-4.6",
		"anthropic/claude-opus-4.6",
	];

	const selectedModel = allowedModels.includes(model)
		? model
		: "anthropic/claude-sonnet-4.6";

	// AI SDK v6: pasar el modelo como string literal usa automáticamente
	// el Vercel AI Gateway con AI_GATEWAY_API_KEY como autenticación.
	const result = streamText({
		model: selectedModel,
		system: SYSTEM_PROMPT,
		prompt,
	});

	return result.toTextStreamResponse();
}
