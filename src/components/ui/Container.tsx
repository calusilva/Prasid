import type { ElementType, ReactNode } from "react";

/** Largura de leitura consistente com margens generosas (espaço negativo). */
export function Container({
  as: Tag = "div",
  children,
  className = "",
  width = "default",
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const max =
    width === "wide"
      ? "max-w-[1400px]"
      : width === "narrow"
        ? "max-w-3xl"
        : "max-w-[1180px]";
  return (
    <Tag className={`mx-auto w-full ${max} px-6 sm:px-10 lg:px-16 ${className}`}>
      {children}
    </Tag>
  );
}
