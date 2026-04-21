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

export const FONT_DEFINITIONS: Record<FontFamily, { name: string; cssFont: string }> = {
  default: {
    name: 'Default',
    cssFont: 'ui-sans-serif, system-ui, sans-serif',
  },
  roboto: {
    name: 'Roboto',
    cssFont: '"Roboto", sans-serif',
  },
  montserrat: {
    name: 'Montserrat',
    cssFont: '"Montserrat", sans-serif',
  },
  lato: {
    name: 'Lato',
    cssFont: '"Lato", sans-serif',
  },
  'noto-sans': {
    name: 'Noto Sans',
    cssFont: '"Noto Sans", sans-serif',
  },
  'funnel-display': {
    name: 'Funnel Display',
    cssFont: '"Funnel Display", serif',
  },
  pacifico: {
    name: 'Pacifico',
    cssFont: '"Pacifico", cursive',
  },
  'comic-neue': {
    name: 'Comic Neue',
    cssFont: '"Comic Neue", cursive',
  },
  'ibm-plex-sans': {
    name: 'IBM Plex Sans',
    cssFont: '"IBM Plex Sans", sans-serif',
  },
  'ibm-plex-serif': {
    name: 'IBM Plex Serif',
    cssFont: '"IBM Plex Serif", serif',
  },
};

export const GOOGLE_FONTS_IMPORTS = `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@400;500;700&display=swap');
`;

export function getFontClass(fontFamily: FontFamily): string {
  return `editor-font-${fontFamily}`;
}

export function getFontCSSVariable(fontFamily: FontFamily): string {
  return FONT_DEFINITIONS[fontFamily].cssFont;
}

export function generateEditorFontStyles(): string {
  const styles = GOOGLE_FONTS_IMPORTS;

  let fontClassStyles = '';
  Object.entries(FONT_DEFINITIONS).forEach(([key, value]) => {
    fontClassStyles += `
.editor-container.editor-font-${key} {
  font-family: ${value.cssFont};
}
`;
  });

  return styles + fontClassStyles;
}
