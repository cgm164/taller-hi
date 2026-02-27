content = '''import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { MarketingGenerator } from "@/components/marketing-generator";
import { SignOutButton } from "@/components/sign-out-button";

export default async function HomePage() {
\tconst session = await auth.api.getSession({
\t\theaders: await headers(),
\t});

\tif (!session) {
\t\tredirect("/login");
\t}

\treturn (
\t\t<div className="min-h-screen bg-gray-50">
\t\t\t<header className="border-b border-gray-200 bg-white">
\t\t\t\t<div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
\t\t\t\t\t<h1 className="text-xl font-bold text-gray-900">
\t\t\t\t\t\tMarketing AI Planner
\t\t\t\t\t</h1>
\t\t\t\t\t<div className="flex items-center gap-4">
\t\t\t\t\t\t<span className="text-sm text-gray-600">
\t\t\t\t\t\t\t{session.user.email}
\t\t\t\t\t\t</span>
\t\t\t\t\t\t<SignOutButton />
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</header>

\t\t\t<main className="mx-auto max-w-4xl px-4 py-8">
\t\t\t\t<MarketingGenerator />
\t\t\t</main>
\t\t</div>
\t);
}
'''

with open("/Users/carlosgarridomarin/Documents/projects/taller-hi/src/app/page.tsx", "w") as f:
    f.write(content)
print("Done")
