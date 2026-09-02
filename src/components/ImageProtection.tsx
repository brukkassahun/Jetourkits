"use client";

import { useEffect } from "react";

/**
 * Image protection deterrents:
 * - Blocks right-click context menu on images
 * - Blocks drag-and-drop on images
 * - Blocks keyboard shortcuts (Ctrl+S, Ctrl+C on images)
 */
export default function ImageProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.closest("img")) {
        e.preventDefault();
        return false;
      }
    };

    const blockDrag = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG" || target.closest("img")) {
        e.preventDefault();
        return false;
      }
    };

    const blockKey = (e: KeyboardEvent) => {
      // Block Ctrl+S (save page) and Ctrl+C (copy) when an image is focused/hovered
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "c" || e.key === "u")) {
        const sel = window.getSelection?.()?.toString();
        if (sel && sel.length > 0) return; // Allow normal text copy
        const hover = document.querySelector("img:hover");
        if (hover) {
          e.preventDefault();
          return false;
        }
      }
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("dragstart", blockDrag);
    document.addEventListener("keydown", blockKey);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("keydown", blockKey);
    };
  }, []);

  return null;
}
