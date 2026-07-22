// This is PRIVATE — it lives in a subfolder (lib/).
// Outside code CANNOT import from here. Only the package's own entry points may.
export function greet(name: string): string {
  return `Hello, ${name}!`;
}
