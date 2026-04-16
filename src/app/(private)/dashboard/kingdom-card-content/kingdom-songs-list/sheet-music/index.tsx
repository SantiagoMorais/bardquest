import { LuExternalLink, LuFileMusic, LuLoader, LuUpload, LuX } from "react-icons/lu";
import cn from "classnames";
import { useRef, useState } from "react";
import styles from "./index.module.scss";

interface ISheetMusicProps {
  url: string | null | undefined;
  songId: string;
}

export const SheetMusic = ({ url, songId }: ISheetMusicProps) => {
  const css = styles as Record<string, string>;
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // ── Handlers (vazios — lógica via API) ──────────────────────────────────
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setPendingFile(file);
    try {
      // TODO: upload para storage e PATCH /songs/:id -> sheet_music_url
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPendingFile(null);
    // TODO: PATCH /songs/:id -> sheet_music_url: null
  };
  // ────────────────────────────────────────────────────────────────────────

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  if (url && !pendingFile) {
    return (
      <div className={styles.sheetMusicHas}>
        <LuFileMusic size={14} className={styles.sheetMusicIcon} />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.sheetMusicLink}
        >
          Ver partitura
          <LuExternalLink size={12} />
        </a>
        <button
          className={styles.sheetMusicRemove}
          onClick={handleRemove}
          title="Remover partitura"
        >
          <LuX size={12} />
        </button>
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className={styles.sheetMusicUploading}>
        <LuLoader size={14} className={styles.sheetMusicSpinner} />
        <span>Enviando {pendingFile?.name}…</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        styles.sheetMusicDropzone,
        isDragging && css["sheetMusicDropzone--dragging"]
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      <LuUpload size={14} className={styles.sheetMusicDropIcon} />
      <span className={styles.sheetMusicDropLabel}>
        {isDragging ? "Solte o arquivo aqui" : "Adicionar partitura"}
      </span>
      <span className={styles.sheetMusicDropHint}>PDF, PNG ou JPG</span>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        className={styles.sheetMusicInput}
        onChange={onFileChange}
      />
    </div>
  );
};
