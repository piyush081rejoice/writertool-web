import moment from "moment";

export const DateConvert = (isoDateString) => {
  return moment(isoDateString).format("DD MMM YYYY");
};

export const getCurrentFormattedDate = () => {
  const currentDate = new Date();

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return formattedDate;
};
export const GenerateDescription = (htmlString) => {
  const maxLength = 200;
  const paragraphRegex = /<p>([^<]*(<br\s*\/?>)?[^<]*)*<\/p>/g;

  let match;
  const paragraphs = [];

  while ((match = paragraphRegex.exec(htmlString)) !== null) {
    // Extract the text content from the matched <p> element
    let textContent = match[0]
      .replace(/<p>|<\/p>/g, "")
      .replace(/<br\s*\/?>/g, " ")
      .replace(/&nbsp;/g, " ")
      .trim();

    if (/</.test(textContent)) {
      // Skip paragraphs with any other HTML tags
      continue;
    }

    // Check if textContent exceeds maxLength
    if (textContent.length > maxLength) {
      paragraphs.push(textContent.substring(0, maxLength) + "...");
    } else {
      paragraphs.push(textContent);
    }
  }

  return paragraphs[0];
};

export const formatTitleCase = (input) => {
  let result = input
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return result;
};
export const replaceQuotedTextWithSpan = (inputString) => {
  return inputString.replace(/"([^"]*)"/g, "<span>$1</span>");
};
