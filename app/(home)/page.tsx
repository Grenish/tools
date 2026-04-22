import Link from "next/link";

export default function HomePage() {
  return (
    <main className="container mx-auto flex flex-1 flex-col justify-center px-4 py-24 md:px-8 md:py-32 lg:py-40">
      <section className="mx-auto flex max-w-245 flex-col items-center gap-4 text-center">
        <h1 className="text-balance text-4xl font-extrabold tracking-tight lg:text-6xl lg:leading-[1.1]">
          Build your component library.
        </h1>
        <p className="max-w-187.5 text-balance text-lg text-muted-foreground sm:text-xl">
          Beautifully designed components that you can copy and paste into your
          apps. Accessible. Customizable. Open Source.
        </p>
        <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
          <Link
            href="/docs"
            className="inline-flex h-10 items-center justify-center rounded-md bg-zinc-900 px-8 text-sm font-medium text-zinc-50 shadow transition-colors hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
          >
            Get Started
          </Link>
          <Link
            href="https://github.com/fuma-nama/fumadocs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-300"
          >
            GitHub
          </Link>
        </div>
      </section>
    </main>
  );
}
