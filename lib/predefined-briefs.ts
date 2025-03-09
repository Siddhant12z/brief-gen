interface Brief {
  short: string;
  detailed: string;
}

interface BriefsByNiche {
  [niche: string]: Brief[];
}

interface BriefsByCategory {
  [category: string]: BriefsByNiche;
}

export const predefinedBriefs: BriefsByCategory = {
  web: {
    tech: [
      {
        short: "Design a landing page for an AI-powered code review tool with real-time collaboration features.",
        detailed: `# Project Overview
CodeAI is a revolutionary code review platform that uses artificial intelligence to enhance code quality and team collaboration.

# Client Background
A tech startup that has developed an AI-powered code review system, seeking to attract enterprise development teams and individual developers.

# Objectives
- Showcase the platform's AI capabilities and real-time collaboration features
- Drive sign-ups for the free trial
- Position CodeAI as a cutting-edge development tool

# Target Audience
- Software development teams
- Engineering managers
- Individual developers
- Tech companies of all sizes

# Key Requirements
- Modern, technically sophisticated design
- Interactive feature demonstrations
- Clear pricing and comparison tables
- Customer testimonials section
- Live demo signup form
- Mobile-responsive design

# Brand Guidelines
- Color scheme: Deep blues, electric purples, and crisp whites
- Typography: Modern, technical sans-serif fonts
- Tone: Professional, innovative, and trustworthy

# Design Resources
- UI Inspiration: github.com, vercel.com, linear.app
- Design System: Material Design 3 (m3.material.io)
- Icons: Phosphor Icons (phosphoricons.com)
- Illustrations: undraw.co/illustrations
- Animation Examples: dribbble.com/tags/code-animation`
      },
      {
        short: "Design a dashboard for a cloud computing platform's resource monitoring system.",
        detailed: `# Project Overview
CloudMetrics is a comprehensive cloud resource monitoring platform that helps teams track and optimize their cloud infrastructure.

# Client Background
An established cloud services provider expanding their product line with a new monitoring solution.

# Objectives
- Create an intuitive interface for complex data visualization
- Enable quick identification of system issues
- Facilitate cost optimization decisions

# Target Audience
- DevOps engineers
- System administrators
- Cloud architects
- IT managers

# Key Requirements
- Real-time data visualization
- Customizable dashboard widgets
- Alert configuration system
- Resource usage trends
- Cost analytics
- Performance metrics

# Brand Guidelines
- Color scheme: Navy, teal, and cloud gray
- Typography: Clear, legible fonts for data
- Tone: Technical, reliable, and efficient

# Design Resources
- UI Inspiration: grafana.com, datadog.com, newrelic.com
- Design System: Ant Design (ant.design)
- Charts: D3.js (d3js.org)
- Icons: Lucide Icons (lucide.dev)
- Data Visualization: observablehq.com/@d3/gallery`
      },
      {
        short: "Create a product page for a quantum computing educational platform.",
        detailed: "Design an engaging product page for QuantumLeap, an educational platform teaching quantum computing concepts. Feature interactive quantum circuit simulations, course progression paths, and learning achievements. Include sections for course content, instructor profiles, and student success stories. The design should balance technical accuracy with approachable learning concepts, using animations and visualizations to explain complex quantum principles."
      }
    ],
    health: [
      {
        short: "Design a telemedicine platform's consultation booking interface.",
        detailed: `# Project Overview
HealthConnect is a telemedicine platform that connects patients with healthcare providers for virtual consultations.

# Client Background
A healthcare technology company focused on making medical care more accessible through digital solutions.

# Objectives
- Streamline the appointment booking process
- Build trust through professional design
- Ensure accessibility for all users

# Target Audience
- Patients of all ages
- Healthcare providers
- Medical practices
- Clinics and hospitals

# Key Requirements
- Intuitive appointment scheduling
- Secure video consultation interface
- Medical history management
- Prescription tracking
- Follow-up scheduling
- Multi-device support

# Brand Guidelines
- Color scheme: Healing greens, calming blues
- Typography: Clear, accessible fonts
- Tone: Trustworthy, caring, and professional

# Design Resources
- UI Inspiration: zocdoc.com, doctolib.fr, oscar.com
- Design System: Carbon Design (carbondesignsystem.com)
- Healthcare Icons: healthicons.org
- Accessibility: w3.org/WAI/ARIA/apg/
- Medical Illustrations: smartdraw.com/medical-illustration/`
      },
      {
        short: "Design a patient portal for managing medical records and appointments.",
        detailed: "Develop a comprehensive patient portal for MediTrack, allowing users to access their medical records, schedule appointments, and track health metrics. The interface should include sections for test results, medication schedules, appointment history, and secure messaging with healthcare providers. Focus on clear information hierarchy and intuitive navigation while ensuring privacy and data security are visually communicated."
      }
    ],
    education: [
      {
        short: "Design an online learning platform's course catalog interface.",
        detailed: "Create an engaging course catalog interface for EduHub, showcasing diverse educational content across multiple disciplines. The design should feature intuitive course filtering, progress tracking, and personalized recommendations. Include interactive course previews, instructor profiles, and student reviews. Use a clean, organized layout that encourages exploration while maintaining clear categorization of subjects and difficulty levels."
      },
      {
        short: "Design a virtual classroom environment for remote learning.",
        detailed: "Design an immersive virtual classroom interface for LearnSpace, facilitating real-time interaction between students and teachers. Include features for live video discussions, collaborative whiteboards, assignment submission, and progress tracking. The design should create an engaging learning environment with clear visual hierarchy for different interaction tools and content types."
      }
    ],
    finance: [
      {
        short: "Design a cryptocurrency trading platform's main interface.",
        detailed: "Create a sophisticated trading interface for CryptoTrade, featuring real-time market data, trading charts, and portfolio management. Include advanced trading tools, market analysis, and customizable dashboards. The design should balance complex functionality with user-friendly navigation, using clear visual hierarchy to display critical market information and trading options."
      },
      {
        short: "Design a personal finance management dashboard.",
        detailed: "Design an intuitive dashboard for FinanceFlow, helping users track expenses, investments, and financial goals. Include interactive budget visualizations, expense categorization, and investment portfolio analysis. The interface should make complex financial data accessible through clear charts, graphs, and actionable insights, while maintaining a professional and trustworthy appearance."
      }
    ]
  },
  mobile: {
    tech: [
      {
        short: "Design a mobile app for managing smart home devices.",
        detailed: "Create a user-friendly mobile interface for SmartHome Hub, allowing users to control and monitor their connected devices. Include features for device automation, energy monitoring, and security alerts. The design should emphasize quick access to common controls while providing detailed device management and automation scheduling capabilities."
      },
      {
        short: "Design a mobile IDE for coding on the go.",
        detailed: "Design an innovative mobile coding environment for CodePocket, enabling developers to write and test code on their smartphones. Include features like syntax highlighting, code completion, git integration, and project management. The interface should optimize screen space while maintaining essential development tools and keyboard accessibility."
      }
    ],
    health: [
      {
        short: "Design a fitness tracking app with AI-powered coaching.",
        detailed: "Create an engaging fitness app interface for FitAI, featuring personalized workout plans and real-time exercise tracking. Include features for workout visualization, progress tracking, and AI-powered form correction. The design should motivate users while providing clear exercise instructions and performance metrics."
      },
      {
        short: "Design a mental wellness app for meditation and mood tracking.",
        detailed: "Design a calming interface for MindSpace, helping users practice meditation and track their mental well-being. Include features for guided meditation, mood journaling, and progress visualization. The design should create a peaceful, distraction-free environment while maintaining intuitive navigation and clear session controls."
      }
    ],
    education: [
      {
        short: "Design a language learning app with speech recognition.",
        detailed: "Create an engaging mobile interface for LingoPro, featuring interactive language lessons and real-time pronunciation feedback. Include features for vocabulary practice, conversation scenarios, and progress tracking. The design should make learning fun and accessible while providing clear feedback and progression metrics."
      },
      {
        short: "Design a mobile app for collaborative student projects.",
        detailed: "Design a collaborative learning platform for TeamLearn, enabling students to work together on academic projects. Include features for document sharing, task management, and group discussions. The interface should facilitate easy collaboration while maintaining clear project organization and deadline tracking."
      }
    ],
    finance: [
      {
        short: "Design a mobile banking app with budget tracking features.",
        detailed: "Create a secure and intuitive mobile banking interface for SmartBank, combining traditional banking services with advanced budget management. Include features for transaction categorization, spending analysis, and financial goal setting. The design should prioritize security while making financial management accessible and engaging."
      },
      {
        short: "Design an investment portfolio management app.",
        detailed: "Design a comprehensive investment app for WealthWise, helping users manage and analyze their investment portfolios. Include features for stock tracking, portfolio analysis, and market news. The interface should present complex financial data clearly while providing easy access to trading functions and investment insights."
      }
    ]
  },
  branding: {
    tech: [
      {
        short: "Design a brand identity for a blockchain security company.",
        detailed: "Create a modern brand identity for CryptoGuard, a blockchain security firm. Develop a logo, color scheme, typography, and visual elements that convey trust, innovation, and technical expertise. Include guidelines for digital and print applications, ensuring the brand maintains consistency across various platforms while remaining adaptable for different use cases."
      },
      {
        short: "Design branding for an AI research laboratory.",
        detailed: "Design a sophisticated brand identity for NeuralLab, an artificial intelligence research institution. Create a visual system that reflects cutting-edge technology while maintaining academic credibility. Include logo variations, color palettes, and application guidelines for scientific publications and digital platforms."
      }
    ],
    health: [
      {
        short: "Design branding for a digital health monitoring platform.",
        detailed: "Create a trustworthy brand identity for HealthPulse, a digital health monitoring service. Develop a visual system that combines medical professionalism with modern technology. Include logo design, color schemes, and guidelines for app interfaces, marketing materials, and medical documentation."
      },
      {
        short: "Design a brand identity for a wellness product line.",
        detailed: "Design a holistic brand identity for NatureWell, a premium wellness product line. Create a visual system that emphasizes natural ingredients and scientific backing. Include packaging design guidelines, marketing materials, and digital presence recommendations."
      }
    ],
    education: [
      {
        short: "Design branding for an online STEM education platform.",
        detailed: "Create an engaging brand identity for STEMSpark, making science and technology education exciting for young learners. Develop a visual system that balances educational credibility with youth appeal. Include logo variations, mascot design, and guidelines for educational materials and digital platforms."
      },
      {
        short: "Design a brand identity for a professional development platform.",
        detailed: "Design a sophisticated brand identity for CareerLift, a professional skills development platform. Create a visual system that conveys professionalism and growth. Include guidelines for course materials, certificates, and marketing collateral."
      }
    ],
    finance: [
      {
        short: "Design branding for a fintech startup focused on sustainable investing.",
        detailed: "Create a modern brand identity for GreenVest, a sustainable investment platform. Develop a visual system that combines financial professionalism with environmental responsibility. Include logo design, investment report templates, and digital platform guidelines."
      },
      {
        short: "Design a brand identity for a cryptocurrency exchange.",
        detailed: "Design a trustworthy brand identity for CryptoHub, a secure cryptocurrency exchange. Create a visual system that conveys security and innovation. Include guidelines for trading platform interfaces, marketing materials, and security documentation."
      }
    ]
  },
  ui: {
    tech: [
      {
        short: "Design a dark mode interface for a code editor.",
        detailed: "Create a sophisticated dark mode UI for CodePro, emphasizing code readability and reduced eye strain. Design the color scheme, typography, and interactive elements to support long coding sessions. Include guidelines for syntax highlighting, tool panels, and status indicators."
      },
      {
        short: "Design a UI system for a cloud deployment platform.",
        detailed: "Design a comprehensive UI system for CloudDeploy, streamlining cloud infrastructure management. Create components for deployment workflows, monitoring dashboards, and configuration panels. Include guidelines for data visualization, state management, and error handling."
      }
    ],
    health: [
      {
        short: "Design a UI kit for medical imaging applications.",
        detailed: "Create a specialized UI kit for MediView, focusing on medical image analysis and reporting. Design components for image manipulation, measurement tools, and report generation. Include guidelines for accessibility, color coding, and critical information display."
      },
      {
        short: "Design a UI system for patient monitoring dashboards.",
        detailed: "Design an intuitive UI system for VitalTrack, enabling real-time patient monitoring. Create components for vital signs display, alert management, and patient data review. Include guidelines for critical information hierarchy and color coding."
      }
    ],
    education: [
      {
        short: "Design a UI kit for interactive learning modules.",
        detailed: "Create an engaging UI kit for EduPlay, supporting interactive educational content. Design components for quizzes, progress tracking, and content navigation. Include guidelines for accessibility, engagement indicators, and feedback systems."
      },
      {
        short: "Design a UI system for educational assessment tools.",
        detailed: "Design a comprehensive UI system for GradeWise, facilitating student assessment and feedback. Create components for grading interfaces, feedback tools, and progress tracking. Include guidelines for data visualization and accessibility."
      }
    ],
    finance: [
      {
        short: "Design a UI kit for financial analytics dashboards.",
        detailed: "Create a professional UI kit for FinanceView, supporting complex financial data analysis. Design components for data visualization, filtering tools, and report generation. Include guidelines for number formatting, chart types, and alert indicators."
      },
      {
        short: "Design a UI system for investment portfolio tracking.",
        detailed: "Design an intuitive UI system for PortfolioTrack, enabling detailed investment analysis. Create components for portfolio visualization, performance metrics, and trading interfaces. Include guidelines for risk indicators and market data display."
      }
    ]
  }
} 