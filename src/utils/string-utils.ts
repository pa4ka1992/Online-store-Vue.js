export function capitaliseLetter(str: string) {
  return str[0] ? str[0].toUpperCase() : '' + str.substring(1);
}

export function parseCamelCase(str: string) {
  return capitaliseLetter(
    str.replace(/[A-Z]/g, (match) => {
      return ' ' + match.toLowerCase();
    })
  );
}

export function parseKebabCase(str: string) {
  return capitaliseLetter(
    str.toLowerCase().replace('-', ' '),
  );
}
