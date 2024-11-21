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

export const CATEGORY_IMAGES = {
  "ai-ml": "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/915245e8-9a2c-4a36-bf29-a7ea9fe87293.webp",
  "data-science": "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/0346cedb-5f6d-41b6-8868-f8345674f2ea.webp",
  "education": "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/37a974b4-eba5-4710-b962-a0c81e7cfa89.webp",
  "generative-ai": "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/689aa507-731c-444e-a955-6519cc7efe39.webp",
  "health": "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/58c5f1eb-bda3-4eeb-ba88-cf4271d7c5a1.webp",
  "iot": "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/346f89de-3f67-4a96-9597-ccfeaa6d3418.webp",
  "technology": "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/3a75120a-f291-41f8-a125-41443161e0c8.webp",
  "web-development": "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/0eb60d42-79ef-42aa-963d-6f8ec6c0090c.webp",
};
export const HOME_PAGE_URL = "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/ac16b36d-f188-4b0f-8107-eb1059d32382.webp";
export const LOGO_URL = "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/4ec0573b-164c-4483-bce6-4a7dee2b7382.webp";
export const CATEGORY_PAGE_URL = "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/cfaec92c-72d7-4d1c-b7cc-437d468bc823.webp";
export const DISCLAIMER_PAGE_URL = "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/0b298a6c-1c2d-4aff-ac1c-385bffca0910.webp";
export const PRIVACY_POLICY_PAGE_URL = "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/4867fdcd-55d8-47f6-96c6-9a072e8e8a3c.webp";
export const TERMSANDCONDITIONS_PAGE_URL = "https://writertools-v1.s3.us-east-1.amazonaws.com/images/blogs/coverPhoto/0579191a-c87a-495f-8920-e41ca8df125e.webp";
