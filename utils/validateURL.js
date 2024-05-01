import toast from "react-hot-toast";

export const checkRegex = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  var localhost = new RegExp(
    "^(https?:\\/\\/)?(localhost)(:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return !!pattern.test(str) || !!localhost.test(str);
};

export const validateUrl = (url, customUrl, isPassEnabled, password) => {
  if (url.length === 0) {
    toast.error("URL is required");
    return false;
  } else if (!checkRegex(url)) {
    toast.error("Page URL is invalid");
    return false;
  } else if (customUrl.length > 0 && customUrl.length < 3) {
    toast.error("Custom URL must be at least 3 characters long");
    return false;
  } else if (customUrl.length > 0 && customUrl.length > 20) {
    toast.error("Custom URL must be at most 20 characters long");
    return false;
  } else if (isPassEnabled && password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  } else {
    return true;
  }
};
