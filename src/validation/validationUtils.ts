function checkEmpty(value: string, name: string) {
  if (value.trim() === "") {
    return `${name} can not be empty.`;
  }
}

function checkLength(
  value: string,
  name: string,
  min: number | null,
  max: number | null,
) {
  const length = value.length;
  if (min !== null && length < min) {
    return `${name} must be at least ${min} characters.`;
  }
  if (max !== null && length > max) {
    return `${name} cannot exceed ${max} characters.`;
  }
}

function checkWhitespace(value: string, name: string) {
  if (/\s/.test(value)) {
    return `${name} cannot contain spaces.`;
  }
}

export { checkEmpty, checkLength, checkWhitespace };
