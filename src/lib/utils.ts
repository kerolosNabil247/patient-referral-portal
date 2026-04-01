export function formatPhoneNumber(value: string): string {
  const phoneNumber = value.replace(/[^\d]/g, '');
  if (phoneNumber.length <= 3) return phoneNumber;
  if (phoneNumber.length <= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}