"use client";

import Image from "next/image";
import { FormEvent, useCallback, useRef, useState, type PointerEvent } from "react";
import WhatsAppButton from "@/components/WhatsAppButton";

type Lang = "en" | "es";

const copy = {
  en: {
    topCta: "Get a Free Estimate",
    heroHeadline: "The RGV's Premier All-Around Landscape Specialists.",
    heroSubheadline:
      "From professional irrigation to custom outdoor living, we bring 360-degree care to your Valley home.",
    heroSecondaryCta: "View Our Gallery",
    servicesTitle: "Our 360 Services",
    servicesText:
      "Full-scope landscaping support built for South Texas soil, weather, and homeowner standards.",
    whyTitle: "Why 360?",
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
    namePlaceholder: "Name",
    phonePlaceholder: "Phone",
    servicePlaceholder: "Service Needed",
    zipPlaceholder: "Zip Code",
    formSubmit: "Get a Free Estimate",
    contactTitle: "Contact Information",
    companyLabel: "Company",
    contactLabel: "Contact",
    callNow: "Call Now",
  },
  es: {
    topCta: "Cotizacion Gratis",
    heroHeadline: "Los especialistas integrales de paisajismo lideres del RGV.",
    heroSubheadline:
      "Desde riego profesional hasta espacios exteriores personalizados, brindamos cuidado 360 a su hogar en el Valle.",
    heroSecondaryCta: "Ver Galeria",
    servicesTitle: "Nuestros Servicios 360",
    servicesText:
      "Soporte integral de paisajismo adaptado al suelo, clima y estandares residenciales del sur de Texas.",
    whyTitle: "Por que 360?",
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
    namePlaceholder: "Nombre",
    phonePlaceholder: "Telefono",
    servicePlaceholder: "Servicio Necesario",
    zipPlaceholder: "Codigo Postal",
    formSubmit: "Cotizacion Gratis",
    contactTitle: "Informacion de Contacto",
    companyLabel: "Empresa",
    contactLabel: "Contacto",
    callNow: "Llame Ahora",
  },
} satisfies Record<Lang, Record<string, unknown>>;

const serviceOptions = {
  en: [
    {
      title: "Lawn Maintenance",
      points: ["Mowing", "Edging", "Fertilization"],
    },
    {
      title: "Hardscaping",
      points: ["Stone walkways", "Retaining walls", "Patios"],
    },
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
    {
      title: "Mantenimiento de Cesped",
      points: ["Corte", "Orillado", "Fertilizacion"],
    },
    {
      title: "Hardscaping",
      points: ["Andadores de piedra", "Muros de contencion", "Patios"],
    },
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

const zipCodes = ["78501", "78502", "78503", "78504", "78505"];

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
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)] sm:p-6">
      <h3 className="mb-4 text-lg font-semibold text-white sm:text-xl">{t.sliderTitle as string}</h3>
      <div
        ref={containerRef}
        className="relative h-56 touch-none select-none overflow-hidden rounded-xl border border-white/[0.06] sm:h-72 md:h-96"
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
          if (event.key === "ArrowLeft") {
            setPosition((current) => Math.max(5, current - 5));
          }
          if (event.key === "ArrowRight") {
            setPosition((current) => Math.min(95, current + 5));
          }
        }}
      >
        <Image
          src="/after.png"
          alt="After landscaping project image"
          className="h-full w-full object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 900px"
          draggable={false}
        />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <Image
            src="/before.png"
            alt="Before landscaping project image"
            className="h-full w-full object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            draggable={false}
          />
        </div>
        <div
          className="absolute inset-y-0 w-1 bg-olive"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        />
        <div
          className="absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/90 bg-gradient-to-b from-olive-light to-olive font-semibold text-sm text-white shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
          style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
          aria-hidden="true"
        >
          ||
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-slate-400 sm:text-base">
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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="overflow-x-hidden bg-forest-deep text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-charcoal-dark/90 backdrop-blur-md supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3.5 md:px-8">
          <p className="min-w-0 flex-1 text-sm font-semibold leading-snug tracking-wide text-slate-100 sm:text-base md:text-lg">
            Valley 360 Landscaping LLC
          </p>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`min-h-11 min-w-11 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                lang === "en"
                  ? "bg-white text-charcoal-dark"
                  : "border border-white/15 bg-white/[0.03] text-slate-200 hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("es")}
              className={`min-h-11 min-w-11 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                lang === "es"
                  ? "bg-white text-charcoal-dark"
                  : "border border-white/15 bg-white/[0.03] text-slate-200 hover:border-white/25 hover:bg-white/[0.06]"
              }`}
            >
              ES
            </button>
            <a href="#lead-form" className="btn-primary hidden !min-h-10 !px-5 !py-2 !text-sm md:inline-flex">
              {t.topCta as string}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero — Forest Green */}
        <section className="relative overflow-hidden bg-gradient-to-br from-forest-deep via-forest-mid to-forest-rich">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/95 via-forest-mid/80 to-charcoal-dark/60" />
          <div className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-4 py-16 sm:min-h-[80vh] sm:py-24 md:px-8">
            <p className="mb-5 max-w-full text-xs font-medium uppercase tracking-[0.12em] text-slate-300 sm:text-sm">
              <span className="inline-flex rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 backdrop-blur-sm sm:px-4">
                Landscaping McAllen TX | RGV Lawn Care
              </span>
            </p>
            <h1 className="max-w-4xl text-3xl font-bold leading-[1.18] text-white sm:text-4xl md:text-6xl">
              {t.heroHeadline as string}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-slate-300 md:text-lg">
              {t.heroSubheadline as string}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href="#lead-form" className="btn-primary w-full sm:w-auto">
                {t.topCta as string}
              </a>
              <a href="#gallery" className="btn-secondary w-full sm:w-auto">
                {t.heroSecondaryCta as string}
              </a>
            </div>
          </div>
        </section>

        {/* Services — Charcoal */}
        <section className="bg-gradient-to-b from-charcoal via-neutral-dark to-charcoal-dark">
          <div className="section-pad mx-auto w-full max-w-6xl">
            <div className="section-intro">
              <h2 className="section-title">{t.servicesTitle as string}</h2>
              <div className="section-accent" />
              <p className="section-lead">{t.servicesText as string}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              {activeServices.map((service) => (
                <article key={service.title} className="card-elevated group">
                  <h3 className="text-xl font-semibold text-gold transition-colors duration-300 group-hover:text-gold-light sm:text-2xl">
                    {service.title}
                  </h3>
                  <ul className="mt-5 space-y-2.5 text-base leading-[1.7] text-slate-300">
                    {service.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="text-gold/60">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us — Forest Green */}
        <section className="bg-gradient-to-b from-forest-mid via-forest-rich to-forest-deep">
          <div className="section-pad mx-auto w-full max-w-6xl">
            <div className="section-intro">
              <h2 className="section-title">{t.whyTitle as string}</h2>
              <div className="section-accent" />
            </div>
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {t.whyItems &&
                (t.whyItems as { title: string; text: string }[]).map((item) => (
                  <div key={item.title} className="card-elevated card-accent">
                    <h3 className="text-lg font-semibold text-gold sm:text-xl">{item.title}</h3>
                    <p className="mt-4 text-base leading-[1.7] text-slate-300">{item.text}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Testimonials — Black */}
        <section
          id="gallery"
          className="bg-gradient-to-b from-charcoal-dark via-charcoal to-charcoal-dark"
        >
          <div className="section-pad mx-auto w-full max-w-6xl">
            <div className="section-intro">
              <h2 className="section-title">{t.reviewsTitle as string}</h2>
              <div className="section-accent" />
            </div>
            <div className="grid gap-6 md:grid-cols-3 md:gap-8">
              {activeTestimonials.map((testimonial) => (
                <blockquote key={testimonial.author} className="card-elevated card-quote">
                  <p className="text-base leading-[1.7] text-slate-300">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <footer className="mt-5 text-sm font-medium tracking-wide text-gold">
                    {testimonial.author}
                  </footer>
                </blockquote>
              ))}
            </div>
            <div className="mt-10 md:mt-12">
              <BeforeAfterSlider lang={lang} />
            </div>
          </div>
        </section>

        {/* Quote Form — Forest Green */}
        <section
          id="lead-form"
          className="bg-gradient-to-b from-forest-deep via-forest-mid to-forest-rich"
        >
          <div className="section-pad mx-auto w-full max-w-4xl">
            <div className="section-intro">
              <h2 className="section-title">{t.formTitle as string}</h2>
              <div className="section-accent" />
              <p className="section-lead">{t.formText as string}</p>
            </div>
            <form onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2">
              <input
                required
                type="text"
                placeholder={t.namePlaceholder as string}
                className="field-premium"
              />
              <input
                required
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={t.phonePlaceholder as string}
                className="field-premium"
              />
              <select required className="field-premium" defaultValue="">
                <option value="" disabled>
                  {t.servicePlaceholder as string}
                </option>
                {activeServices.map((service) => (
                  <option key={service.title}>{service.title}</option>
                ))}
              </select>
              <select required className="field-premium" defaultValue="">
                <option value="" disabled>
                  {t.zipPlaceholder as string}
                </option>
                {zipCodes.map((zip) => (
                  <option key={zip}>{zip}</option>
                ))}
              </select>
              <button type="submit" className="btn-primary w-full md:col-span-2">
                {t.formSubmit as string}
              </button>
            </form>
          </div>
        </section>

        {/* Footer — Almost Black */}
        <section className="bg-footer">
          <div className="section-pad mx-auto w-full max-w-6xl !py-12 md:!py-16">
            <div className="section-intro !mb-8">
              <h2 className="section-title">{t.contactTitle as string}</h2>
              <div className="section-accent" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div className="card-elevated">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  {t.companyLabel as string}
                </p>
                <p className="mt-3 text-lg font-semibold text-white">Valley 360 Landscaping LLC</p>
                <p className="mt-3 text-base leading-[1.7] text-slate-400">
                  McAllen, TX, United States, 78504
                </p>
              </div>
              <div className="card-elevated">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
                  {t.contactLabel as string}
                </p>
                <a
                  href="tel:+19564020427"
                  className="mt-3 block text-lg font-semibold text-gold transition-colors duration-200 hover:text-gold-light"
                >
                  +1 956-402-0427
                </a>
                <a
                  href="mailto:rgv360landscaping@gmail.com"
                  className="mt-3 block break-all text-base leading-[1.7] text-slate-300 underline decoration-white/15 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white/30 sm:break-normal"
                >
                  rgv360landscaping@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton />
    </div>
  );
}
