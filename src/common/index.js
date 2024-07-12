export const DateConvert = (isoDateString) => {
  const date = new Date(isoDateString);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  formattedDate;

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


export const TransformString =(input) => {
  // Capitalize the first letter
  let result = input.charAt(0).toUpperCase() + input.slice(1);
  
  // Replace dashes with spaces
  result = result.replace(/-/g, ' ');
  
  return result;
}
