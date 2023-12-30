export function extractUsernameFromEmail(email: string) {
  const parts = email.split('@');
  if (parts.length === 2) {
    return parts[0];
  } else {
    console.error('Invalid email format');
    return null;
  }
}
