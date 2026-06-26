"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import { type ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.06,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "fadeUp" | "fadeIn" | "scaleIn";
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "fadeUp",
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const variants = variant === "fadeIn" ? fadeIn : variant === "scaleIn" ? scaleIn : fadeUp;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-60px", amount: 0.2 }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

type MotionSectionProps = HTMLMotionProps<"section"> & {
  children: ReactNode;
};

export function MotionSection({ children, ...props }: MotionSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={reduceMotion ? false : { opacity: 0 }}
      whileInView={reduceMotion ? undefined : { opacity: 1 }}
      viewport={{ once: true, margin: "-60px", amount: 0.08 }}
      transition={{ duration: 0.6, ease: easeOut }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

type MotionCardProps = HTMLMotionProps<"article"> & {
  children: ReactNode;
  index?: number;
};

export function MotionCard({ children, index = 0, className, ...props }: MotionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{ duration: 0.55, ease: easeOut, delay: index * 0.08 }}
      whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.25 } }}
      {...props}
    >
      {children}
    </motion.article>
  );
}

type MotionDivProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  index?: number;
};

export function MotionGridItem({ children, index = 0, className, ...props }: MotionDivProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.15 }}
      transition={{ duration: 0.5, ease: easeOut, delay: index * 0.09 }}
      whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.22 } }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionButtonLink({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={href}
      className={className}
      whileHover={reduceMotion ? undefined : { scale: 1.02, y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: easeOut }}
    >
      {children}
    </motion.a>
  );
}

export { motion };
