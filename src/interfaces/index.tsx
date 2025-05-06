export interface IRegisterInput {
  name: "email" | "first_name" | "last_name" | "password";
  Label: "first_name" | "last_name" | "Email" | "Password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface ILoginInput {
  name: "email" | "password";
  Label: "Email" | "Password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp; // regular Expression
  };
}
export interface IFROGETPASSWORD {
  name: "email";
  Label: "Email";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp; // regular Expression
  };
}
export interface INEWPASSWORD {
  name: "newPassword" | "confirmPassword";
  Label: "New Password" | "Confirm New Password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp; // regular Expression
  };
}
export interface IErrorResponse {
  error: {
    message?: string; // انا كده بطلع المسدج الي جوا ال ايرور
  };
}

export interface IQuestions {
  Question: string;
  answer: string;
}

export interface Icategories {
  id: number;
  StageName: string;
  category1: string;
  category2?: string;
  category3?: string;
  category4?: string;
  category5?: string;
  category6?: string;
  category7?: string;
  category8?: string;
  category9?: string;
  category10?: string;
  category11?: string;
  category12?: string;
  category13?: string;
  category14?: string;
  category15?: string;
  category16?: string;
  category17?: string;
  category18?: string;
  category19?: string;
  category20?: string;
  category21?: string;
  category22?: string;
}

export interface IDataOfCardInfo {
  title: string;
  content: {
    imagurl: string;
    imagetitle: string;
  }[];
}

export interface IAboutUsInfo {
  srcImage: string;
  name: string;
  person_add: string;
  srcinstgramim: string;
  srctwitterimg: string;
  srcwhatsappimg: string;
  srcfacebookimg: string;
}

export interface IsidebarData {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    subLessons: {
      id: string;
      title: string;
      duration: string;
      videoUrl: string;
    }[];
  }[];
}

export interface IinforamtionOfInfo {
  title: string;
  description: string;
}
