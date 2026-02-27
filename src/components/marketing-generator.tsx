"use client";

import { useCompletion } from "@ai-sdk/react";
import { useState } from "react";

const MODELS = [
	{ id: "anthropic/claude-sonnet-4.6", label: "Claude Sonnet 4.6" },
	{ id: "anthropic/claude-opus-4.6", label: "Claude Opus 4.6" },
] as const;

export function MarketingGenerator() {
	const [model, setModel] = useState<string>(MODELS[0].id);

	const { completion, input, handleInputChange, handleSubmit, isLoading, error } =
		useCompletion({
			api: "/api/marketing",
			streamProtocol: "text",
			body: { model },
		});

	return (
		<div className="space-y-6">
			{/* Model selector */}
			<div className="flex items-center gap-3">
				<label
					htmlFor="model"
					className="text-sm font-medium text-gray-700"
				>
					Modelo:
				</label>
				<select
					id="model"
					value={model}
					onChange={(e) => setModel(e.target.value)}
					className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					{MODELS.map((m) => (
						<option key={m.id} value={m.id}>
							{m.label}
						</option>
					))}
				</select>
			</div>

			{/* Prompt form */}
			<form onSubmit={handleSubmit} className="flex gap-3">
				<input
					value={input}
					onChange={handleInputChange}
					placeholder="Describe tu producto o servicio para generar un plan de marketing…"
					className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
					required
				/>
				<button
					type="submit"
					disabled={isLoading}
					className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
				>
					{isLoading ? "Generando…" : "Generar plan"}
				</button>
			</form>

			{/* Error display */}
			{error && (
				<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
					{error.message}
				</div>
			)}

			{/* Result */}
			{completion && (
				<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
					<h2 className="mb-4 text-lg font-semibold text-gray-900">
						Plan de Marketing
					</h2>
					<div className="prose prose-sm max-w-none whitespace-pre-wrap text-gray-700">
						{completion}
					</div>
				</div>
			)}
		</div>
	);
}
