"use client";

import { useEffect, useState } from "react";
import { MessageCircle, X, QrCode } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <div
        className={`fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 transition-all duration-500 sm:bottom-5 sm:right-5 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <button
          onClick={() => setWechatOpen(true)}
          aria-label="Contact us on WeChat"
          className="flex items-center gap-2 rounded-full border border-line bg-cream px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-ink shadow-soft transition-colors hover:border-ink hover:text-accent"
        >
          <QrCode className="h-4 w-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">WeChat</span>
        </button>
        <a
          href={whatsappLink(`Hello ${site.name}! I have a question about a body kit.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="relative flex items-center gap-2 rounded-full bg-ink px-4 py-3 font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-cream shadow-soft transition-transform hover:scale-[1.03]"
        >
          <MessageCircle className="h-4 w-4 text-success" strokeWidth={1.5} />
          <span className="hidden sm:inline">Chat with us</span>
          <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-success ring-2 ring-cream" />
          </span>
        </a>
      </div>

      {wechatOpen && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setWechatOpen(false)}
        >
          <div
            className="w-full max-w-xs rounded-3xl border border-line bg-cream p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl border border-dashed border-line bg-paper">
              <QrCode className="h-16 w-16 text-faint" />
            </div>
            <p className="mt-4 font-sans text-sm font-black uppercase tracking-[0.14em] text-ink">WeChat Customer Service</p>
            <p className="mt-1 select-all rounded-2xl bg-paper px-3 py-2 font-mono text-sm text-accent">
              {site.wechat}
            </p>
            <p className="mt-2 text-xs text-faint">Scan the QR in-store or add our ID directly.</p>
            <button
              onClick={() => setWechatOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 font-sans text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:border-ink hover:text-ink"
            >
              <X className="h-4 w-4" strokeWidth={1.5} /> Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
