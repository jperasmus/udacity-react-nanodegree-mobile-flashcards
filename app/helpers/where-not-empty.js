export default function whereNotEmpty(payload = {}) {
  const clone = { ...payload };
  delete clone[''];
  return clone;
}
