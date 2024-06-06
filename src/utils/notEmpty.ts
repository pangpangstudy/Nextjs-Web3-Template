export function notEmpty<TVlaue>(
  value: TVlaue | null | undefined
): value is TVlaue {
  return value !== null && value !== undefined;
}
