function useValidUrl(urlString: string | URL | null) {
  if (urlString === null) return false;

  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}

export default useValidUrl