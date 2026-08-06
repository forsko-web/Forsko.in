/**
 * Forsko - Universal Global Search Dataset
 * Centralized array of searchable items across all categories:
 * Syllabus, Notes, PYQs, Question Bank, Paper Pattern, Practicals, and Resources.
 */

const searchData = [
  // ==========================================
  // SYLLABUS
  // ==========================================
  {
    title: "B.Sc. Computer Science Syllabus",
    category: "Syllabus",
    description: "Explore the official SGBAU B.Sc. Computer Science syllabus year-wise.",
    icon: "fa-solid fa-book-bookmark",
    url: "syllabus.html"
  },
  {
    title: "First Year B.Sc. CS Syllabus",
    category: "Syllabus",
    description: "Semester I & Semester II official SGBAU syllabus overview.",
    icon: "fa-solid fa-graduation-cap",
    url: "first-year.html"
  },
  {
    title: "Fundamentals of Computer Syllabus",
    category: "Syllabus",
    description: "Official Semester I syllabus for Fundamentals of Computer.",
    icon: "fa-solid fa-desktop",
    url: "../assets/pdfs/semester1/fundamentals-of-computer.pdf"
  },
  {
    title: "Programming with C Syllabus",
    category: "Syllabus",
    description: "Official Semester II syllabus for Programming with C.",
    icon: "fa-solid fa-laptop-code",
    url: "../assets/pdfs/semester2/programming-with-c.pdf"
  },
  {
    title: "Second Year B.Sc. CS Syllabus",
    category: "Syllabus",
    description: "Semester III & Semester IV official SGBAU syllabus overview.",
    icon: "fa-solid fa-layer-group",
    url: "second-year.html"
  },

  // ==========================================
  // NOTES
  // ==========================================
  {
    title: "B.Sc. CS Notes Portal",
    category: "Notes",
    description: "Download and access semester-wise notes for B.Sc. Computer Science students.",
    icon: "fa-solid fa-file-lines",
    url: "notes.html"
  },
  {
    title: "First Year Notes",
    category: "Notes",
    description: "Semester I & Semester II comprehensive notes and revision guides.",
    icon: "fa-solid fa-book-open",
    url: "notes-first-year.html"
  },
  {
    title: "Fundamentals of Computer Notes",
    category: "Notes",
    description: "Semester I notes covering hardware, software, OS, memory & number systems.",
    icon: "fa-solid fa-desktop",
    url: "notes-semester1.html"
  },
  {
    title: "Programming with C Notes",
    category: "Notes",
    description: "Semester II notes covering loops, functions, arrays, pointers, and file I/O.",
    icon: "fa-solid fa-code",
    url: "notes-semester2.html"
  },

  // ==========================================
  // PYQs (Previous Year Question Papers)
  // ==========================================
  {
    title: "Previous Year Question Papers (PYQs)",
    category: "PYQs",
    description: "Access semester-wise SGBAU university exam papers for all years.",
    icon: "fa-solid fa-clock-rotate-left",
    url: "pyqs.html"
  },
  {
    title: "First Year Question Papers",
    category: "PYQs",
    description: "Semester I & Semester II SGBAU question paper archives (2022-2025).",
    icon: "fa-solid fa-folder-open",
    url: "pyqs-first-year.html"
  },
  {
    title: "Semester I Question Papers",
    category: "PYQs",
    description: "Previous year papers for Fundamentals of Computer, ICT, and Office Automation.",
    icon: "fa-solid fa-file-pdf",
    url: "pyqs-semester1.html"
  },
  {
    title: "Fundamentals of Computer PYQ 2025",
    category: "PYQs",
    description: "Download 2025 SGBAU examination paper for Fundamentals of Computer.",
    icon: "fa-solid fa-file-arrow-down",
    url: "../assets/pyqs/semester1/fundamentals-of-computer/2025.pdf"
  },
  {
    title: "Programming with C PYQ 2025",
    category: "PYQs",
    description: "Download 2025 SGBAU examination paper for Programming with C.",
    icon: "fa-solid fa-file-arrow-down",
    url: "../assets/pyqs/semester2/programming-with-c/2025.pdf"
  },

  // ==========================================
  // QUESTION BANK
  // ==========================================
  {
    title: "B.Sc. CS Question Bank",
    category: "Question Bank",
    description: "Unit-wise long questions, short notes, and expected university exam questions.",
    icon: "fa-solid fa-database",
    url: "index.html#question-bank"
  },
  {
    title: "Fundamentals of Computer Question Bank",
    category: "Question Bank",
    description: "Semester I expected exam questions and short answer sets.",
    icon: "fa-solid fa-list-check",
    url: "semester1.html"
  },
  {
    title: "Programming with C Question Bank",
    category: "Question Bank",
    description: "Semester II C programming code problems and theoretical question set.",
    icon: "fa-solid fa-list-check",
    url: "semester2.html"
  },

  // ==========================================
  // PAPER PATTERN
  // ==========================================
  {
    title: "Official SGBAU Paper Pattern",
    category: "Paper Pattern",
    description: "Official examination paper pattern & semester-wise sample papers.",
    icon: "fa-solid fa-file-contract",
    url: "paper-pattern.html"
  },
  {
    title: "Semester I Sample Paper",
    category: "Paper Pattern",
    description: "University-style sample paper for B.Sc. Computer Science Semester I.",
    icon: "fa-solid fa-file-lines",
    url: "../assets/paper-pattern/sample-papers/semester1.pdf"
  },
  {
    title: "Semester II Sample Paper",
    category: "Paper Pattern",
    description: "University-style sample paper for B.Sc. Computer Science Semester II.",
    icon: "fa-solid fa-file-lines",
    url: "../assets/paper-pattern/sample-papers/semester2.pdf"
  },

  // ==========================================
  // PRACTICALS
  // ==========================================
  {
    title: "Laboratory on Office Automation Tools",
    category: "Practicals",
    description: "Practical exercises on MS Word, MS Excel, PowerPoint & Office tools.",
    icon: "fa-solid fa-file-pen",
    url: "semester1.html"
  },
  {
    title: "Laboratory on ICT Tools",
    category: "Practicals",
    description: "Practical activities on Information & Communication Technology tools.",
    icon: "fa-solid fa-terminal",
    url: "semester1.html"
  },
  {
    title: "Laboratory on Programming with C",
    category: "Practicals",
    description: "Practical executable C programs, viva questions, and outputs.",
    icon: "fa-solid fa-code",
    url: "semester2.html"
  },
  {
    title: "Laboratory on Web Publishing",
    category: "Practicals",
    description: "HTML, CSS, and website creation lab assignments.",
    icon: "fa-solid fa-globe",
    url: "semester2.html"
  },
  {
    title: "Laboratory on E-Commerce",
    category: "Practicals",
    description: "Introduction to e-commerce concepts & practical activities.",
    icon: "fa-solid fa-cart-shopping",
    url: "semester2.html"
  },

  // ==========================================
  // RESOURCES
  // ==========================================
  {
    title: "GOEC 1: Information Communication Technology",
    category: "Resources",
    description: "Semester I Generic Open Elective Course - ICT concepts & digital communication.",
    icon: "fa-solid fa-tower-cell",
    url: "semester1.html"
  },
  {
    title: "GOEC 2: Business Data Processing",
    category: "Resources",
    description: "Semester I Generic Open Elective Course - Business data processing & computing.",
    icon: "fa-solid fa-chart-line",
    url: "semester1.html"
  },
  {
    title: "GOEC 1: E-Business",
    category: "Resources",
    description: "Semester II Generic Open Elective Course - E-business models & applications.",
    icon: "fa-solid fa-briefcase",
    url: "semester2.html"
  },
  {
    title: "GOEC 2: Website Design Principles",
    category: "Resources",
    description: "Semester II Generic Open Elective Course - Layout design & UI guidelines.",
    icon: "fa-solid fa-palette",
    url: "semester2.html"
  }
];
