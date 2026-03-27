export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  topic: "Digital Evidence" | "Chain of Custody" | "Forensic Tools" | "Legal Issues";
};

export const questions: Question[] = [
  {
    id: 1,
    question: "What is digital evidence?",
    options: [
      "Physical objects found at crime scenes",
      "Information stored or transmitted in digital form",
      "Paper-based documents",
      "Eyewitness statements",
    ],
    correctAnswer: 1,
    topic: "Digital Evidence",
  },
  {
    id: 2,
    question: "What is chain of custody?",
    options: [
      "A legal punishment process",
      "A record of evidence handling",
      "A hacking technique",
      "A forensic tool",
    ],
    correctAnswer: 1,
    topic: "Chain of Custody",
  },

  // 🔹 Digital Evidence
  {
    id: 3,
    question: "Which of the following is an example of digital evidence?",
    options: [
      "Fingerprint",
      "Email message",
      "Blood sample",
      "Weapon",
    ],
    correctAnswer: 1,
    topic: "Digital Evidence",
  },
  {
    id: 4,
    question: "Digital evidence must be handled carefully to maintain:",
    options: [
      "Appearance",
      "Integrity",
      "Speed",
      "File size",
    ],
    correctAnswer: 1,
    topic: "Digital Evidence",
  },

  // 🔹 Chain of Custody
  {
    id: 5,
    question: "Why is chain of custody important?",
    options: [
      "To reduce file size",
      "To ensure evidence is admissible in court",
      "To encrypt data",
      "To delete unused files",
    ],
    correctAnswer: 1,
    topic: "Chain of Custody",
  },
  {
    id: 6,
    question: "Who is responsible for maintaining chain of custody?",
    options: [
      "Only the suspect",
      "Only the judge",
      "Anyone handling the evidence",
      "Only the lawyer",
    ],
    correctAnswer: 2,
    topic: "Chain of Custody",
  },

  // 🔹 Forensic Tools
  {
    id: 7,
    question: "What is a forensic tool used for?",
    options: [
      "Editing documents",
      "Analyzing digital evidence",
      "Sending emails",
      "Browsing the internet",
    ],
    correctAnswer: 1,
    topic: "Forensic Tools",
  },
  {
    id: 8,
    question: "Which of the following is a digital forensic tool?",
    options: [
      "Microsoft Word",
      "Autopsy",
      "Google Chrome",
      "Photoshop",
    ],
    correctAnswer: 1,
    topic: "Forensic Tools",
  },
  {
    id: 9,
    question: "What is the purpose of disk imaging?",
    options: [
      "To delete files",
      "To create an exact copy of a storage device",
      "To compress files",
      "To encrypt files",
    ],
    correctAnswer: 1,
    topic: "Forensic Tools",
  },

  // 🔹 Legal Issues
  {
    id: 10,
    question: "Why must digital evidence follow legal procedures?",
    options: [
      "To make it look better",
      "To ensure it is admissible in court",
      "To increase file size",
      "To improve speed",
    ],
    correctAnswer: 1,
    topic: "Legal Issues",
  },
  {
    id: 11,
    question: "What could happen if evidence is mishandled?",
    options: [
      "It becomes stronger",
      "It may be rejected in court",
      "It becomes encrypted",
      "Nothing happens",
    ],
    correctAnswer: 1,
    topic: "Legal Issues",
  },

  // 🔹 Mixed reinforcement
  {
    id: 12,
    question: "Which process ensures evidence has not been altered?",
    options: [
      "Hashing",
      "Printing",
      "Copying",
      "Deleting",
    ],
    correctAnswer: 0,
    topic: "Digital Evidence",
  },
  {
    id: 13,
    question: "What is the first step in digital forensic investigation?",
    options: [
      "Reporting",
      "Collection of evidence",
      "Deleting files",
      "Closing the case",
    ],
    correctAnswer: 1,
    topic: "Digital Evidence",
  },
  {
    id: 14,
    question: "Which action preserves evidence integrity?",
    options: [
      "Editing files directly",
      "Working on original data",
      "Using a forensic copy",
      "Deleting duplicates",
    ],
    correctAnswer: 2,
    topic: "Forensic Tools",
  },
  {
    id: 15,
    question: "Legal compliance in digital forensics ensures:",
    options: [
      "Faster processing",
      "Evidence is valid in court",
      "Better UI design",
      "Lower storage usage",
    ],
    correctAnswer: 1,
    topic: "Legal Issues",
  },
];