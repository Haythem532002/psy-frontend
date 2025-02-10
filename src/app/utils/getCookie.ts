export function getCookie(cookieName: string) {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    const cookiePair = cookie.split('=');
    const name = cookiePair[0].trim();

    if (name === cookieName) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  return null;
}
