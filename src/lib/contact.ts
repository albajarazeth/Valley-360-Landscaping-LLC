export const CONTACT_EMAIL = "rgv360landscaping@gmail.com";

const estimateSubjects = {
  en: "Free Estimate Request - Valley 360 Landscaping",
  es: "Solicitud de Cotizacion - Valley 360 Landscaping",
} as const;

export function estimateMailto(lang: keyof typeof estimateSubjects): string {
  const subject = estimateSubjects[lang];
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}
