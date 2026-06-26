"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import afterImage from "../../assets/after.png";
import beforeImage from "../../assets/before.png";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  GalleryIcon,
  LeafIcon,
  LocationIcon,
  MailIcon,
  PhoneIcon,
  ServiceIcon,
  ShieldIcon,
  StarIcon,
  WhyIcon,
} from "@/components/icons";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CONTACT_EMAIL, estimateMailto } from "@/lib/contact";

type Lang = "en" | "es";

const copy = {
  en: {
    topCta: "Get a Free Estimate",
    heroTag: "Landscaping McAllen TX | RGV Lawn Care",
    heroPrefix: "The RGV's Premier",
    heroHighlight: "All-Around Landscape",
    heroSuffix: "Specialists.",
    heroSubheadline:
      "From professional irrigation to custom outdoor living, we bring 360-degree care to your Valley home.",
    heroSecondaryCta: "View Our Gallery",
    trustBadges: ["Licensed & Insured", "Local McAllen Experts", "Satisfaction Guaranteed"],
    servicesTitle: "Our 360 Services",
    servicesText:
      "Full-scope landscaping support built for South Texas soil, weather, and homeowner standards.",
    learnMore: "Learn More",
    whyTitle: "Our Promise to You",
    whyItems: [
      {
        title: "Licensed & Insured",
        text: "Protect your investment with a team that follows professional standards from day one.",
      },
      {
        title: "McAllen Soil & Climate Expertise",
        text: "We select materials and planting strategies built for RGV heat, rain, and clay conditions.",
      },
      {
        title: "Reliable Scheduling",
        text: "Expect dependable arrival windows and clear project timelines from estimate to final walkthrough.",
      },
    ],
    reviewsTitle: "Google Review Highlights",
    sliderTitle: "Before & After: Typical McAllen Yard",
    beforeLabel: "Before",
    afterLabel: "After",
    sliderAria: "Drag to compare before and after landscaping",
    formTitle: "Request Your Free Estimate",
    formText: "Tell us about your project and we'll follow up quickly with next steps.",
    formSubmit: "Email Us for a Free Estimate",
    formNote: "No obligation. Fast response.",
    contactTitle: "Contact Information",
    companyLabel: "Company",
    contactLabel: "Contact",
  },
  es: {
    topCta: "Cotizacion Gratis",
    heroTag: "Paisajismo McAllen TX | Cuidado de Cesped RGV",
    heroPrefix: "Los especialistas integrales de paisajismo",
    heroHighlight: "lideres del RGV",
    heroSuffix: ".",
    heroSubheadline:
      "Desde riego profesional hasta espacios exteriores personalizados, brindamos cuidado 360 a su hogar en el Valle.",
    heroSecondaryCta: "Ver Galeria",
    trustBadges: ["Licenciados y Asegurados", "Expertos Locales en McAllen", "Satisfaccion Garantizada"],
    servicesTitle: "Nuestros Servicios 360",
    servicesText:
      "Soporte integral de paisajismo adaptado al suelo, clima y estandares residenciales del sur de Texas.",
    learnMore: "Saber Mas",
    whyTitle: "Nuestra Promesa",
    whyItems: [
      {
        title: "Licenciados y Asegurados",
        text: "Proteja su inversion con un equipo que sigue estandares profesionales desde el primer dia.",
      },
      {
        title: "Expertos en Suelo y Clima de McAllen",
        text: "Seleccionamos materiales y estrategias de plantacion para el calor, lluvia y suelo arcilloso del RGV.",
      },
      {
        title: "Horarios Confiables",
        text: "Espere horarios de llegada confiables y tiempos de proyecto claros desde la cotizacion hasta la entrega final.",
      },
    ],
    reviewsTitle: "Resenas Destacadas de Google",
    sliderTitle: "Antes y Despues: Patio tipico de McAllen",
    beforeLabel: "Antes",
    afterLabel: "Despues",
    sliderAria: "Arrastre para comparar antes y despues del paisajismo",
    formTitle: "Solicite su Cotizacion Gratis",
    formText: "Cuentenos sobre su proyecto y le responderemos pronto con los siguientes pasos.",
    formSubmit: "Enviar correo para cotizacion gratis",
    formNote: "Sin compromiso. Respuesta rapida.",
    contactTitle: "Informacion de Contacto",
    companyLabel: "Empresa",
    contactLabel: "Contacto",
  },
} satisfies Record<Lang, Record<string, unknown>>;

const serviceOptions = {
  en: [
    { title: "Lawn Maintenance", points: ["Mowing", "Edging", "Fertilization"] },
    { title: "Hardscaping", points: ["Stone walkways", "Retaining walls", "Patios"] },
    {
      title: "Irrigation & Drainage",
      points: ["Smart sprinkler systems", "RGV-specific water planning", "Drainage correction"],
    },
    {
      title: "Landscape Design",
      points: ["Full 3D modeling", "Planting plans", "Outdoor living layouts"],
    },
  ],
  es: [
    { title: "Mantenimiento de Cesped", points: ["Corte", "Orillado", "Fertilizacion"] },
    { title: "Hardscaping", points: ["Andadores de piedra", "Muros de contencion", "Patios"] },
    {
      title: "Riego y Drenaje",
      points: ["Sistemas inteligentes", "Soluciones para el RGV", "Correccion de drenaje"],
    },
    {
      title: "Diseno de Paisaje",
      points: ["Modelado 3D completo", "Planes de plantacion", "Diseno de areas exteriores"],
    },
  ],
};

const testimonials = {
  en: [
    {
      quote:
        "Valley 360 cleaned up years of overgrowth and now our yard looks like a model home. Their team shows up on time every time.",
      author: "Laura M., McAllen",
    },
    {
      quote:
        "From irrigation fixes to a new paver patio, everything was done professionally and on schedule. Best landscaping crew in the Valley.",
      author: "Daniel R., North McAllen",
    },
    {
      quote:
        "We hired them for full service lawn care and the difference has been night and day. Great communication and quality work.",
      author: "Sofia T., Mission",
    },
  ],
  es: [
    {
      quote:
        "Valley 360 transformo nuestro patio por completo. Llegan puntuales y el trabajo siempre queda de primera.",
      author: "Laura M., McAllen",
    },
    {
      quote:
        "Nos ayudaron con riego y un patio nuevo. Todo quedo profesional y a tiempo. Excelente equipo.",
      author: "Daniel R., North McAllen",
    },
    {
      quote:
        "Los contratamos para mantenimiento completo y la diferencia fue enorme. Muy buena comunicacion y calidad.",
      author: "Sofia T., Mission",
    },
  ],
};

const trustIcons = [ShieldIcon, LeafIcon, CalendarIcon];

function BeforeAfterSlider({ lang }: { lang: Lang }) {
  const [position, setPosition] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, width } = container.getBoundingClientRect();
    const next = ((clientX - left) / width) * 100;
    setPosition(Math.min(95, Math.max(5, next)));
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingRef.current = true;
    updatePosition(event.clientX);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    updatePosition(event.clientX);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="slider-wrap">
      <h3 className="section-title" style={{ fontSize: "1.125rem", marginBottom: "1rem" }}>
        {t.sliderTitle as string}
      </h3>
      <div
        ref={containerRef}
        className="slider-frame"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        role="slider"
        aria-label={t.sliderAria as string}
        aria-valuemin={5}
        aria-valuemax={95}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") setPosition((c) => Math.max(5, c - 5));
          if (event.key === "ArrowRight") setPosition((c) => Math.min(95, c + 5));
        }}
      >
        <Image src={afterImage} alt="After landscaping" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" draggable={false} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image src={beforeImage} alt="Before landscaping" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" draggable={false} />
        </div>
        <div className="slider-divider" style={{ left: `${position}%` }} />
        <div className="slider-handle" style={{ left: `${position}%` }} aria-hidden>
          ↔
        </div>
      </div>
      <div style={{ marginTop: "0.75rem", display: "flex", justifyContent: "space-between", fontSize: "0.875rem", color: "#64748b" }}>
        <span>{t.beforeLabel as string}</span>
        <span>{t.afterLabel as string}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = copy[lang];
  const activeServices = serviceOptions[lang];
  const activeTestimonials = testimonials[lang];
  const trustBadges = t.trustBadges as string[];

  return (
    <div className="site">
      <header className="site-header">
        <div className="container-main" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", paddingBlock: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", minWidth: 0 }}>
            <span className="icon-box">
              <LeafIcon />
            </span>
            <p style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 600, color: "#fff" }}>
              Valley 360 Landscaping LLC
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <button type="button" className={`lang-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>
              EN
            </button>
            <button type="button" className={`lang-btn${lang === "es" ? " active" : ""}`} onClick={() => setLang("es")}>
              ES
            </button>
            <a href="#lead-form" className="btn-ghost header-cta">
              {t.topCta as string}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-overlay" />
          <div className="container-main hero-inner">
            <p className="hero-tag">{t.heroTag as string}</p>
            <h1 className="hero-title">
              {t.heroPrefix as string}{" "}
              <span className="hero-highlight">{t.heroHighlight as string}</span>{" "}
              {t.heroSuffix as string}
            </h1>
            <p className="hero-sub">{t.heroSubheadline as string}</p>
            <div className="hero-actions">
              <a href="#lead-form" className="btn-primary">
                {t.topCta as string}
                <ArrowRightIcon />
              </a>
              <a href="#gallery" className="btn-secondary">
                <GalleryIcon />
                {t.heroSecondaryCta as string}
              </a>
            </div>
            <div className="trust-row">
              {trustBadges.map((badge, i) => {
                const Icon = trustIcons[i];
                return (
                  <div key={badge} className="trust-item">
                    <Icon />
                    <span>{badge}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-surface-2 section-pad">
          <div className="container-main">
            <div className="section-intro">
              <h2 className="section-title">{t.servicesTitle as string}</h2>
              <p className="section-lead">{t.servicesText as string}</p>
            </div>
            <div className="services-grid">
              {activeServices.map((service, index) => (
                <article key={service.title} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <span className="icon-box">
                    <ServiceIcon index={index} />
                  </span>
                  <h3 style={{ marginTop: "1rem", fontSize: "1.0625rem", fontWeight: 600, color: "#fff" }}>
                    {service.title}
                  </h3>
                  <ul className="service-list" style={{ flex: 1 }}>
                    {service.points.map((point) => (
                      <li key={point}>
                        <CheckIcon />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#lead-form" className="learn-link">
                    {t.learnMore as string}
                    <ArrowRightIcon />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface section-pad">
          <div className="container-main">
            <div className="section-intro">
              <h2 className="section-title">{t.whyTitle as string}</h2>
            </div>
            <div className="promise-grid">
              {(t.whyItems as { title: string; text: string }[]).map((item, index) => (
                <div key={item.title} className="card promise-card">
                  <span className="icon-box">
                    <WhyIcon index={index} />
                  </span>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "#fff" }}>{item.title}</h3>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", lineHeight: 1.6, color: "#94a3b8" }}>
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="bg-surface-2 section-pad">
          <div className="container-main">
            <div className="section-intro">
              <h2 className="section-title">{t.reviewsTitle as string}</h2>
            </div>
            <div className="reviews-grid">
              {activeTestimonials.map((testimonial) => (
                <blockquote key={testimonial.author} className="card" style={{ display: "flex", flexDirection: "column" }}>
                  <div className="stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                  <p style={{ flex: 1, fontSize: "0.875rem", lineHeight: 1.65, color: "#cbd5e1" }}>
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <footer style={{ marginTop: "1rem", fontSize: "0.875rem", fontWeight: 500 }} className="text-brand">
                    {testimonial.author}
                  </footer>
                </blockquote>
              ))}
            </div>
            <BeforeAfterSlider lang={lang} />
          </div>
        </section>

        <section id="lead-form" className="bg-surface section-pad">
          <div className="container-main" style={{ maxWidth: "64rem" }}>
            <div className="cta-card">
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <span className="icon-box" style={{ width: "3rem", height: "3rem" }}>
                  <LeafIcon />
                </span>
                <div>
                  <h2 className="section-title" style={{ fontSize: "1.375rem", textAlign: "left" }}>
                    {t.formTitle as string}
                  </h2>
                  <p style={{ marginTop: "0.5rem", fontSize: "0.9375rem", lineHeight: 1.6, color: "#94a3b8" }}>
                    {t.formText as string}
                  </p>
                </div>
              </div>
              <div className="cta-actions" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <a href={estimateMailto(lang)} className="btn-primary">
                  {t.formSubmit as string}
                  <ArrowRightIcon />
                </a>
                <p className="cta-note">
                  <CheckIcon />
                  {t.formNote as string}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface-2 section-pad" style={{ paddingBottom: "3rem" }}>
          <div className="container-main">
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: "2rem" }}>
              {t.contactTitle as string}
            </h2>
            <div className="contact-grid">
              <div className="card contact-card">
                <LocationIcon />
                <div>
                  <p className="contact-label">{t.companyLabel as string}</p>
                  <p style={{ marginTop: "0.5rem", fontWeight: 600, color: "#fff" }}>Valley 360 Landscaping LLC</p>
                  <p style={{ marginTop: "0.25rem", fontSize: "0.875rem", color: "#94a3b8" }}>
                    McAllen, TX, United States, 78504
                  </p>
                </div>
              </div>
              <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div className="contact-card">
                  <PhoneIcon />
                  <div>
                    <p className="contact-label">{t.contactLabel as string}</p>
                    <a href="tel:+19564020427" className="contact-link" style={{ display: "block", marginTop: "0.5rem" }}>
                      +1 956-402-0427
                    </a>
                  </div>
                </div>
                <div className="contact-card">
                  <MailIcon />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link" style={{ fontSize: "0.875rem", wordBreak: "break-word" }}>
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </div>
  );
}
