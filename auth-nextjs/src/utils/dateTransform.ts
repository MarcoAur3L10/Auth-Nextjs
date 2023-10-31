export function dateTransform(date: string): string {
    const [year, month, day] = date.split("T")[0].split("-");
    return `El usuario fue creado el ${day}-${month}-${year}`;
  }
  