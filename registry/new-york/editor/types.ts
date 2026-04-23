export type FontFamily =
  | 'default'
  | 'roboto'
  | 'montserrat'
  | 'lato'
  | 'noto-sans'
  | 'funnel-display'
  | 'pacifico'
  | 'comic-neue'
  | 'ibm-plex-sans'
  | 'ibm-plex-serif';

export type FormatType =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'h1'
  | 'h2'
  | 'bulletList'
  | 'numberList'
  | 'link'
  | 'image';

export interface EditorState {
  content: string;
  fontFamily: FontFamily;
  selectedFormats: string[];
  history: HistoryEntry[];
  historyIndex: number;
}

export interface HistoryEntry {
  content: string;
  timestamp: number;
}

export interface EditorContextType extends EditorState {
  updateContent: (content: string) => void;
  setFont: (font: FontFamily) => void;
  applyFormat: (format: FormatType) => void;
  removeFormat: (format: FormatType) => void;
  undo: () => void;
  redo: () => void;
  toggleFormat: (format: string) => void;
}
