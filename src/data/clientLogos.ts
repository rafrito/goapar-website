// Exemplo: src/data/clientLogos.ts
export interface ClientLogo {
  src: string;
  alt: string;
  width?: number | string; // Opcional: para logos com larguras muito diferentes
  height?: number | string; // Opcional: para logos com alturas muito diferentes
}

export const awerClientLogos: ClientLogo[] = [
  { src: '/partners/c2di.png', alt: 'Logo Cliente A' },
  { src: '/partners/blend.png', alt: 'Logo Cliente B' },
  { src: '/partners/cannova.png', alt: 'Logo Cliente C' },
  { src: '/partners/cel_advogados.png', alt: 'Logo Cliente D' },
  { src: '/partners/clube.png', alt: 'Logo Cliente E' },
  { src: '/partners/cursinho.jpg', alt: 'Logo Cliente E' },
  { src: '/partners/daterra.png', alt: 'Logo Cliente E' },

];
export const awerClientLogos2: ClientLogo[] = [
  { src: '/partners/doralice.png', alt: 'Logo Cliente E' },
  { src: '/partners/jma.png', alt: 'Logo Cliente E' },
  { src: '/partners/lindacor.png', alt: 'Logo Cliente E' },
  { src: '/partners/m3.png', alt: 'Logo Cliente E' },
  { src: '/partners/mmodontologia.svg', alt: 'Logo Cliente E' },
  { src: '/partners/namari.jpg', alt: 'Logo Cliente E' },
  { src: '/partners/spadoni.png', alt: 'Logo Cliente E' }
];