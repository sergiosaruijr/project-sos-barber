import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Função para combinar classes do Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Formatar data para exibição
export function formatDate(date: Date | string, pattern = "PP") {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, pattern, { locale: ptBR })
}

// Converter Decimal para número
export function decimalToNumber(decimal: any): number {
  return parseFloat(decimal?.toString() || "0")
}

// Formatar moeda
export function formatCurrency(value: number | string): string {
  const number = typeof value === "string" ? parseFloat(value) : value
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number)
}
