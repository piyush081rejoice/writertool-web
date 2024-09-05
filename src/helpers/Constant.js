export const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_SITEMAP_URL;
export const WEBSITE_URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
export const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W_]{8,}$/;
export const BUTTON_LIST = [
  ["font", "fontSize", "formatBlock"],
  ["bold", "underline", "italic", "strike", "subscript", "superscript"],
  ["align", "horizontalRule", "list", "table"],
  ["fontColor", "hiliteColor"],
  ["outdent", "indent"],
  ["undo", "redo"],
  ["removeFormat"],
  ["outdent", "indent"],
  ["link"],
  ["showBlocks"],
  ["image"],
];

export const FAQ_DATA = [
  {
    question: "What is Writertools.ai?",
    answer: "Writertools.ai is a platform where users can publish their blogs. In the future, it will also offer AI-assisted blog generation capabilities.",
    isOpen: false,
  },
  {
    question: "How do I create an account on Writertools.ai?",
    answer: "To create an account, visit the Writertools.ai website and click on the 'Sign Up' or 'Register' button. Follow the prompts to enter your information and set up your account.",
    isOpen: false,
  },
  {
    question: "What types of content can I publish on Writertools.ai?",
    answer: "Writertools.ai is primarily designed for blog posts. You can publish articles on various topics, depending on the platform's content guidelines.",
    isOpen: false,
  },
  {
    question: "How will the AI-assisted blog generation feature work?",
    answer: "The AI-assisted blog generation feature is upcoming. It will help users create blog content by providing suggestions, outlines, or even full drafts based on user inputs and preferences.",
    isOpen: false,
  },
  {
    question: "Can I edit my published blog posts?",
    answer: "Yes, you can edit your published blog posts. Look for an 'Edit' option near your published post to make changes.",
    isOpen: false,
  },
  {
    question: "How does Writertools.ai handle copyright and plagiarism issues?",
    answer:
      "Writertools.ai takes copyright seriously. All content should be original or properly attributed. The platform may use tools to check for plagiarism. For AI-generated content, there will be guidelines to ensure originality and proper use.",
    isOpen: false,
  },
];
