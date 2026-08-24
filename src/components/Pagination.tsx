"use client";

import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ page, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const makeUrl = (p: number) => {
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}page=${p}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
      <Link
        href={makeUrl(page - 1)}
        className={`rounded-full border border-line bg-paper px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink ${
          page <= 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Previous
      </Link>

      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <Link
            key={p}
            href={makeUrl(p)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border font-sans text-xs font-bold transition-colors ${
              p === page
                ? "border-ink bg-ink text-cream"
                : "border-line bg-paper text-ink hover:border-ink"
            }`}
          >
            {p}
          </Link>
        ))}
      </div>

      <Link
        href={makeUrl(page + 1)}
        className={`rounded-full border border-line bg-paper px-4 py-2 font-sans text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-ink ${
          page >= totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        Next
      </Link>
    </nav>
  );
}
