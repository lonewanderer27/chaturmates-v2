const MaskEmail = (email: string) => {
  const domain = "adamson.edu.ph";
  if (email.includes(domain)) {
    const [namePart, domainPart] = email.split(`@${domain}`);
    if (namePart.length <= 2) {
      return `${namePart[0]}*${namePart.slice(-1)}@${domain}`;
    }
    const maskedNamePart = `${namePart[0]}${"*".repeat(namePart.length - 2)}${namePart.slice(-1)}`;
    return `${maskedNamePart}@${domain}`;
  }
  return email;
};

export default MaskEmail;
