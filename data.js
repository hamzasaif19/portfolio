window.portfolioData = {
  name: "Hamza Saif",
  titles: [
    "Data Analyst",
    "Dashboard Developer",
    "Business Intelligence",
    "ML Engineer",
    "AI Application Developer"
  ],
  email: "hamzasaif374@gmail.com",
  phone: "+92 3315272216",
  linkedin: "https://www.linkedin.com/in/hamza-saif-54b8512a1/",
  github: "https://github.com/hamzasaif19",
  avatar: "avatar.jpg", // Set to your bitmoji/photo filename e.g. "avatar.png"
  cvFile: "hamza_resume (4.5).pdf", // Set to your CV filename e.g. "hamza_cv.pdf" for the Download CV button

  summary:
    "Data Science graduate with hands-on experience in banking analytics, ML-powered dashboards and full-stack ML/AI applications, seeking a Data Analyst/Business Analyst role where I can leverage Python, BI tools, and predictive modeling to drive business decisions.",

  education: [
    {
      institution: "COMSATS University Islamabad",
      degree: "Bachelor's in Data Science",
      grade: "CGPA: 3.26",
      period: "2022 – 2026",
      location: "Islamabad, Pakistan"
    },
    {
      institution: "Bahria College Anchorage, Naval Anchorage",
      degree: "ICS",
      grade: "",
      period: "2020 – 2022",
      location: "Islamabad, Pakistan"
    }
  ],

  skills: {
    languages: ["Python", "Java", "JavaScript", "SQL", "C++", "R", "HTML/CSS"],
    librariesFrameworks: [
      "ReactJS",
      "FastAPI",
      "Pandas",
      "NumPy",
      "Scikit-Learn",
      "TensorFlow",
      "Matplotlib",
      "LangChain"
    ],
    tools: [
      "Tableau",
      "PowerBI",
      "n8n",
      "GitHub Copilot",
      "PostgreSQL",
      "MongoDB"
    ],
    platforms: [
      "VS Code",
      "Cursor",
      "Jupyter Notebook",
      "Google Colab",
      "RStudio",
      "AWS"
    ]
  },

  // -------------------------------------------------------------------
  // EXPERIENCE
  // To add a new role: copy one object below, paste it, fill in details.
  // images: [] — leave empty OR add filenames e.g. ["dashboard1.png"]
  // -------------------------------------------------------------------
  experience: [
    {
      id: "hbl",
      role: "Data Analyst Intern",
      company: "HBL Mfb – Impactship Program",
      type: "Onsite",
      period: "July 2025 – September 2025",
      bullets: [
        "Built real-time transaction monitoring dashboards for DFI Banking Operations, enabling proactive detection of system failures via email alerts and reducing manual monitoring effort.",
        "Developed 10+ dashboards for transaction flow (Raast + 1Link), customer retention, cards monitoring, accounts monitoring (conventional + wallet), and complaints (proactive + reactive).",
        "Delivered detailed analysis across 10+ granular levels including transaction type, time, ATM, and app."
      ],
      images: ["pic/intern1.jpg", "pic/intern2.jpg", "pic/intern3.jpg"]
      // Example when adding images: images: ["hbl-dashboard1.png", "hbl-dashboard2.png"]
    },
    {
      id: "massive",
      role: "Inbound Sales Executive",
      company: "Massive Dynamics",
      type: "Onsite",
      period: "Feb 2024 – July 2024",
      bullets: [
        "Handled 20+ inbound leads daily on a UK-based project with a 90% lead-to-sale conversion rate.",
        "Promoted to Assistant Floor Manager in the final month due to consistent performance and professional corporate behavior."
      ],
      images: []
    }
  ],

  // -------------------------------------------------------------------
  // PROJECTS
  // To add a new project: copy one object below, paste it, fill in details.
  // images: [] — leave empty OR add filenames e.g. ["screenshot1.png"]
  // github: "" — add your GitHub repo URL when available
  // -------------------------------------------------------------------
  projects: [
    {
      id: "exvision",
      title: "ExVision",
      subtitle: "Export Intelligence Platform (FYP)",
      period: "July 2025 – July 2026",
      description:
        "A full-stack Export Intelligence Platform covering 100+ product commodities across 10+ countries. Features export demand prediction, price optimization, competitor analysis, policy viewing, and an AI-powered chatbot for business insights. Integrates data from six international sources to provide Pakistan's exporters with actionable intelligence.",
      tech: [
        "Python",
        "ReactJS",
        "FastAPI",
        "PostgreSQL",
        "Gemini API",
        "GitHub Copilot",
        "Google Colab"
      ],
      stats: [
        "100+ commodities",
        "10+ countries",
        "6 data sources",
        "AI chatbot"
      ],
      dataSources: [
        "PBS",
        "WTO",
        "UN Comtrade",
        "IMF",
        "World Bank Pink Sheet",
        "UNCTAD"
      ],
      github: "",
      images: ["pic/project1.png", "pic/project2.png", "pic/project3.png", "pic/project4.png"]
    },
    {
      id: "insightpilot",
      title: "InsightPilot",
      subtitle: "AI-Powered Business Report Generator",
      period: "2025",
      description:
        "An intelligent data analysis tool where users upload a CSV or Excel file and the system automatically generates a comprehensive business report using an LLM-powered agentic pipeline. InsightPilot performs statistical summarization, trend detection, anomaly flagging, and produces a structured narrative report complete with charts — turning raw data into boardroom-ready insights in seconds.",
      tech: [
        "Python",
        "LangChain",
        "Gemini API",
        "FastAPI",
        "ReactJS",
        "Pandas",
        "Matplotlib"
      ],
      stats: [
        "CSV & Excel support",
        "LangChain agents",
        "Auto chart generation",
        "PDF report export"
      ],
      github: "",
      images: []
    },
    {
      id: "statmate",
      title: "Statmate",
      subtitle: "Football Player Prediction & Classification Tool",
      period: "Jan 2025",
      description:
        "A machine learning system trained on 10,000+ records across 5 seasons to predict football player performance for the upcoming season with 82% accuracy. Uses KNN classification to find statistically similar players based on performance profiles, with rich visualizations built in Seaborn and Matplotlib to communicate predictions clearly to end-users.",
      tech: [
        "Python",
        "Scikit-Learn",
        "Pandas",
        "Seaborn",
        "Matplotlib"
      ],
      stats: [
        "10,000+ records",
        "5 seasons of data",
        "82% accuracy",
        "KNN classification"
      ],
      github: "",
      images: []
    }
  ],

  // -------------------------------------------------------------------
  // ACHIEVEMENTS & CERTIFICATIONS
  // To add: copy one object, paste, fill in title/org/icon
  // icon options: "trophy", "medal", "certificate", "star"
  // -------------------------------------------------------------------
  achievements: [
    {
      title: "ExVision (FYP) – 3rd Place, Career Expo 2026",
      org: "COMSATS University Islamabad",
      icon: "trophy"
    },
    {
      title: "Top 5 – GIKI Softcom",
      org: "GIKI University",
      icon: "trophy"
    },
    {
      title: "3rd Position – Impactship Program",
      org: "HBL Mfb",
      icon: "medal"
    },
    {
      title: "2nd Position – 1st & 3rd Semester",
      org: "COMSATS University Islamabad",
      icon: "medal"
    },
    {
      title: "AWS AI Practitioner",
      org: "Udacity",
      icon: "certificate"
    }
  ]
};