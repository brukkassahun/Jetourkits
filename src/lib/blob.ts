import { put, list, del } from "@vercel/blob";

export async function uploadImage(file: File | Blob, options?: { prefix?: string; filename?: string }) {
  const name =
    options?.filename ||
    (file instanceof File ? file.name : `image-${Date.now()}.jpg`);
  const safeName = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9.\-_]/g, "");
  const prefix = options?.prefix ? `${options.prefix.replace(/\/$/, "")}/` : "";
  const pathname = `${prefix}${Date.now()}-${safeName}`;

  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return blob;
}

export async function listImages(prefix?: string) {
  const { blobs } = await list({ prefix });
  return blobs;
}

export async function deleteImage(url: string) {
  await del(url);
}

export function isBlobUrl(url?: string) {
  return typeof url === "string" && url.includes(".public.blob.vercel-storage.com");
}
