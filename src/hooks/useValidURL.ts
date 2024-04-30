function useValidUrl(urlString: string | URL) {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
}

export default useValidUrl