export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replace(",", " -")
}

export function formattedMonth(dateString: string) {
  const date = new Date(dateString)
  const month = new Intl.DateTimeFormat("pt-br", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC"
  }).format(date)

  return month
}
