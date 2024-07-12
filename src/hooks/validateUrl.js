import { WEBSITE_URL_REGEX } from "@/helpers/Constant";

export const validateUrl = (url, fieldName, errors) => {
    if (url?.length > 0) {
      if (!WEBSITE_URL_REGEX.test(url)) {
        errors[fieldName] = `Please enter a valid ${fieldName.replace("Link", "")} URL`;
        return false;
      }
    }
    return true;
  };
