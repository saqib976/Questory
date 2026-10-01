/**
 * Utility functions to extract embed-ready URLs from YouTube, Shorts, Vimeo, Loom, and MP4 links.
 */
export function getEmbedUrl(url?: string): string | null {
  if (!url) return null;

  // YouTube standard, youtu.be, or shorts
  const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
  }

  // Vimeo: https://vimeo.com/123456789
  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch && vimeoMatch[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;
  }

  // Loom: https://www.loom.com/share/...
  const loomMatch = url.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
  if (loomMatch && loomMatch[1]) {
    return `https://www.loom.com/embed/${loomMatch[1]}?autoplay=1`;
  }

  return url;
}

export function isDirectVideoFile(url?: string): boolean {
  if (!url) return false;
  return Boolean(url.match(/\.(mp4|webm|ogg|mov)(\?|$)/i));
}
