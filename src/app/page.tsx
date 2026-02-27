import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MarketingGenerator } from "@/components/marketing-generator";
import { SignOutButton } from "@/components/sign-out-button";

export default async function HomePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/login");
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<header className="border-b border-gray-200 bg-white">
				<div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
					<h1 className="text-xl font-bold text-gray-900">
						Marketing AI Planner
					</h1>
					<div className="flex items-center gap-4">
						<span className="text-sm text-gray-600">
							{session.user.email}
						</span>
						<SignOutButton />
					</div>
				</div>
			</header>

			<main className="mx-auto max-w-4xl px-4 py-8">
				<MarketingGenerator />
			</main>
		</div>
	);
}
