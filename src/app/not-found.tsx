import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-32 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="display-lg mt-5 text-4xl">Kit not found</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">This page took a wrong turn off the trail.</p>
      <Link href="/products" className="btn-primary mt-8">
        Back to all kits
      </Link>
    </div>
  );
}
