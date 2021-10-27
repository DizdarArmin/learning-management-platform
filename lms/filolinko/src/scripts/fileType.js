import Icons from "../data/Icons.json";

export function FileType(type) {
  switch (type) {
    case "image/png":
    case "image/gif":
    case "image/jpeg":
    case "image/jpg":
      return Icons.image;

    case "video/mp4":
    case "video/avi":
      return Icons.video;
    case "text/plain":
      return Icons.text;
    case "application/pdf":
      return Icons.pdf;
    case "application/zip":
    case "application/rar":
      return Icons.archive;
    case "audio/mpeg":
    case "audio/flac":
    case "audio/wav":
      return Icons.audio;

    default:
      return Icons.unknown;
  }
}
