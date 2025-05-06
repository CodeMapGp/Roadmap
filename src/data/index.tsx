import {
  IAboutUsInfo,
  Icategories,
  IDataOfCardInfo,
  IFROGETPASSWORD,
  IinforamtionOfInfo,
  ILoginInput,
  INEWPASSWORD,
  IQuestions,
  IRegisterInput,
  IsidebarData,
} from "../interfaces";
import HtmlIcon from "../assets/Info/html-5-svgrepo-com.svg?url";
import CssIcon from "../assets/Info/css-document-extension-file-file-format-file-type-svgrepo-com.svg?url";
import JavaScriptIcon from "../assets/Info/javascript.svg?url";
import ReactIcon from "../assets/Info/react-svgrepo-com.svg?url";
import VueIcon from "../assets/Info/vue-svgrepo-com.svg?url";
import AngularIcon from "../assets/Info/angular-svgrepo-com.svg?url";
import SvelteIcon from "../assets/Info/svelte-icon-svgrepo-com.svg?url";
import VsCodeIcon from "../assets/Info/vs-code-svgrepo-com.svg?url";
import WebStormIcon from "../assets/Info/webstorm-svgrepo-com.svg?url";
import SublimeTextIcon from "../assets/Info/sublimetext-icon-svgrepo-com.svg?url";

export const REGISTER_FORM: IRegisterInput[] = [
  {
    name: "first_name",
    Label: "first_name",
    placeholder: "first_name",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "last_name",
    Label: "last_name",
    placeholder: "last_name",
    type: "text",
    validation: {
      required: true,
      minLength: 5,
    },
  },
  {
    name: "email",
    Label: "Email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ /*validation for email */,
    },
  },
  {
    name: "password",
    Label: "Password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];

export const LOGIN_FORM: ILoginInput[] = [
  {
    name: "email",
    Label: "Email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
    },
  },
  {
    name: "password",
    Label: "Password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];
export const FORGETPASSWORD: IFROGETPASSWORD[] = [
  {
    name: "email",
    Label: "Email",
    placeholder: "Email",
    type: "email",
    validation: {
      required: true,
      minLength: 6,
    },
  },
];
export const NEWPASSWORD: INEWPASSWORD[] = [
  {
    name: "newPassword",
    Label: "New Password",
    placeholder: "New Password",
    type: "password",
    validation: {
      required: true,
      minLength: 8,
    },
  },
  {
    name: "confirmPassword",
    Label: "Confirm New Password",
    placeholder: "Confirm New Password",
    type: "password",
    validation: {
      required: true,
      minLength: 8,
    },
  },
];

export const Questions: IQuestions[] = [
  {
    Question: "How can I get started with Learnly?",
    answer: "can I get started with Learnly",
  },
  {
    Question: "How do I join a course or path?",
    answer: "do I join a course or path",
  },
  {
    Question: "What are the differences between a course and a path?",
    answer: "are the differences between a course and a path",
  },
  {
    Question: "How much does Learnly cost?",
    answer: " much does Learnly cost",
  },
  {
    Question: "How much does Learnly cost?",
    answer: " much does Learnly cost",
  },
  {
    Question: "How can I get started with Learnly?",
    answer: " much does Learnly cost",
  },
  {
    Question: "How do I join a course or path?",
    answer: " much does Learnly cost",
  },
  {
    Question: "What are the differences between a course and a path?",
    answer: " much does Learnly cost",
  },
  {
    Question: "How much does Learnly cost?",
    answer: " much does Learnly cost",
  },
  {
    Question: "How can I get started with Learnly?",
    answer: " much does Learnly cost",
  },
  {
    Question: "How do I join a course or path?",
    answer: " much does Learnly cost",
  },
];

export const categories: Icategories[] = [
  {
    id: 1,
    StageName: "HTML",
    category1: "Introduction and Basics",
    category2: "HTML Structure and Basic Elements",
    category3: "Attributes, Links, and Formatting",
    category4: "Lists, Tables, and Div/Span Usage",
    category5: "Advanced HTML Features",
    category6: "Multimedia and Forms",
    category7: "Special Elements and Final Lessons",
  },
  {
    id: 2,
    StageName: "css",
    category1: "Introduction and what yiu need to learn",
    category2: "Box Model and Positioning",
    category3: "Element Appearance and Visibility",
    category4: "Element Structure and Behavior",
    category5: "text",
    category6: "inheratince",
    category7: "font",
    category8: "Element Interaction and Layering",
    category9: "Styling Structures and Special States",
    category10: "Cross-Browser Styling and Box Enhancements",
    category11: "Advanced Styling and Behavior Control",
    category12: "flex box",
    category13: "Visual Effects and Interaction Control",
    category14: "grid parent",
    category15: "transform",
    category16: "animation",
    category17: "selector",
    category18: "media",
    category19: "Framework Structure and Global Configurations",
  },
  {
    id: 3,
    StageName: "javascript",
    category1: "Introduction and what yiu need to learn",
    category2: "Box Model and Positioning",
    category3: "Element Appearance and Visibility",
    category4: "Element Structure and Behavior",
    category5: "text",
    category6: "inheratince",
    category7: "font",
    category8: "Element Interaction and Layering",
    category9: "Styling Structures and Special States",
    category10: "Cross-Browser Styling and Box Enhancements",
    category11: "Advanced Styling and Behavior Control",
    category12: "flex box",
    category13: "Visual Effects and Interaction Control",
    category14: "grid parent",
    category15: "transform",
    category16: "animation",
    category17: "selector",
    category18: "media",
    category19: "Framework Structure and Global Configurations",
    category20: "animation",
    category21: "selector",
    category22: "media",
  },
  {
    id: 4,
    StageName: "Bootstrap",
    category1: "Introduction and Basics",
  },
  {
    id: 5,
    StageName: "react",
    category1: "Introduction and Basics",
  },
];

export const DataOfCardInfo: IDataOfCardInfo[] = [
  {
    title: "Core Languages",
    content: [
      {
        imagurl: HtmlIcon,
        imagetitle: "HTML",
      },
      {
        imagurl: CssIcon,
        imagetitle: "Css",
      },
      {
        imagurl: JavaScriptIcon,
        imagetitle: "JavaScript",
      },
    ],
  },
  {
    title: "Popular FrameWork",
    content: [
      {
        imagurl: ReactIcon,
        imagetitle: "React",
      },
      {
        imagurl: VueIcon,
        imagetitle: "Vue",
      },
      {
        imagurl: AngularIcon,
        imagetitle: "Angular",
      },
      {
        imagurl: SvelteIcon,
        imagetitle: "Svelte",
      },
    ],
  },
  {
    title: "Development Tools",
    content: [
      {
        imagurl: VsCodeIcon,
        imagetitle: "VS CODE",
      },
      {
        imagurl: WebStormIcon,
        imagetitle: "WebStorm",
      },
      {
        imagurl: SublimeTextIcon,
        imagetitle: "Sublime Text",
      },
    ],
  },
];

export const AboutUsCardInfo: IAboutUsInfo[] = [
  {
    srcImage: "src/assets/Home/4bbc5c7f9365f56b36f3806bb40a1b9a.jpg",
    name: "rofaida",
    person_add: "",
    srcfacebookimg: "",
    srcinstgramim: "",
    srctwitterimg: "",
    srcwhatsappimg: "",
  },
  {
    srcImage: "src/assets/Home/4bbc5c7f9365f56b36f3806bb40a1b9a.jpg",
    name: "rofaida",
    person_add: "",
    srcfacebookimg: "",
    srcinstgramim: "",
    srctwitterimg: "",
    srcwhatsappimg: "",
  },
  {
    srcImage: "src/assets/Home/4bbc5c7f9365f56b36f3806bb40a1b9a.jpg",
    name: "rofaida",
    person_add: "",
    srcfacebookimg: "",
    srcinstgramim: "",
    srctwitterimg: "",
    srcwhatsappimg: "",
  },
  {
    srcImage: "src/assets/Home/4bbc5c7f9365f56b36f3806bb40a1b9a.jpg",
    name: "rofaida",
    person_add: "",
    srcfacebookimg: "",
    srcinstgramim: "",
    srctwitterimg: "",
    srcwhatsappimg: "",
  },
  {
    srcImage: "src/assets/Home/4bbc5c7f9365f56b36f3806bb40a1b9a.jpg",
    name: "rofaida",
    person_add: "",
    srcfacebookimg: "",
    srcinstgramim: "",
    srctwitterimg: "",
    srcwhatsappimg: "",
  },
  {
    srcImage: "src/assets/Home/4bbc5c7f9365f56b36f3806bb40a1b9a.jpg",
    name: "rofaida",
    person_add: "",
    srcfacebookimg: "",
    srcinstgramim: "",
    srctwitterimg: "",
    srcwhatsappimg: "",
  },
  {
    srcImage: "src/assets/Home/4bbc5c7f9365f56b36f3806bb40a1b9a.jpg",
    name: "rofaida",
    person_add: "",
    srcfacebookimg: "",
    srcinstgramim: "",
    srctwitterimg: "",
    srcwhatsappimg: "",
  },
];

export const roadmapData: IsidebarData[] = [
  {
    id: "1",
    title: "HTML",

    lessons: [
      {
        id: "1",
        title: "Introduction and Basics",
        subLessons: [
          {
            id: "1.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
            duration: "2 hrs",
          },
          {
            id: "1.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/6QAELgirvjs",
            duration: "2 hrs",
          },
          {
            id: "1.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/qfPUMV9J5yw",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "2",
        title: "HTML Structure and Basic Elements",
        subLessons: [
          {
            id: "2.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
            duration: "2 hrs",
          },
          {
            id: "2.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/6QAELgirvjs",
            duration: "2 hrs",
          },
          {
            id: "2.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/qfPUMV9J5yw",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "3",
        title: "Attributes, Links, and Formatting",
        subLessons: [
          {
            id: "3.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "3.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "3.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "4",
        title: "Lists, Tables, and Div/Span Usage",
        subLessons: [
          {
            id: "4.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "4.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "4.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "CSS",

    lessons: [
      {
        id: "1",
        title: "Introduction and Basics",
        subLessons: [
          {
            id: "1.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "1.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "1.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "2",
        title: "HTML Structure and Basic Elements",
        subLessons: [
          {
            id: "2.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "2.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "2.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: " 3",
        title: "Attributes, Links, and Formatting",
        subLessons: [
          {
            id: "3.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "3.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "3.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "javaScript",

    lessons: [
      {
        id: "1",
        title: "Introduction and Basics",
        subLessons: [
          {
            id: "1.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "1.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "1.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "2",
        title: "HTML Structure and Basic Elements",
        subLessons: [
          {
            id: "2.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "2.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "2.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "3",
        title: "Attributes, Links, and Formatting",
        subLessons: [
          {
            id: "3.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "3.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "3.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    title: "Bootstrap",

    lessons: [
      {
        id: "1",
        title: "Introduction and Basics",
        subLessons: [
          {
            id: "1.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "1.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "1.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "2",
        title: "HTML Structure and Basic Elements",
        subLessons: [
          {
            id: "2.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "2.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "2.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "3",
        title: "Attributes, Links, and Formatting",
        subLessons: [
          {
            id: "3.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "3.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "3.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    title: "Reactjs",

    lessons: [
      {
        id: "1",
        title: "Introduction and Basics",
        subLessons: [
          {
            id: "1.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "1.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "1.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "2",
        title: "HTML Structure and Basic Elements",
        subLessons: [
          {
            id: "2.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "2.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "2.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
      {
        id: "3",
        title: "Attributes, Links, and Formatting",
        subLessons: [
          {
            id: "3.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "3.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "3.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
          {
            id: "3.1",
            title: "Introduction and What I Need To Learn",
            videoUrl: "https://www.youtube.com/embed/lG_mTu0wyZA",
            duration: "2 hrs",
          },
          {
            id: "3.2",
            title: "Elements And Browser",
            videoUrl: "https://www.youtube.com/embed/video2",
            duration: "2 hrs",
          },
          {
            id: "3.3",
            title: "First Project And First Page",
            videoUrl: "https://www.youtube.com/embed/video3",
            duration: "2 hrs",
          },
        ],
      },
    ],
  },
];

export const InformationOfInfo: IinforamtionOfInfo[] = [
  {
    title: "Career Opportunities",
    description:
      "After completing this course, learners will be equipped with the necessary skills to explore opportunities in front-end development, AI applications, and software engineering roles",
  },
  {
    title: "Advanced Topics",
    description:
      "State Management in Front-End Applications,Performance Optimization & Lazy Loading,Security Best Practices for Front-End, AI-Powered Personalization in Web Development",
  },
  {
    title: "Project-Based Learning",
    description:
      "Hands-on projects include building a responsive website, developing an AI-powered chatbot, and creating a real-time dashboard with live data.",
  },
  {
    title: "Testimonials",
    description:
      "This course provided me with the skills I needed to land my first job as a front-end developer!,The AI integration lessons were game-changing for my career in real estate applications. - Sarah M.",
  },
];
