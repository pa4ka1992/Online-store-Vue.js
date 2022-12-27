export function parseCamelCase(str: string) {
  const result = str.replace(/[A-Z]/g, (match) => {
    return ' ' + match.toLowerCase();
  });
  return result[0] ? result[0].toUpperCase() : '' + result.substring(1);
}
