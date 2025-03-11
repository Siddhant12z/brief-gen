interface Brief {
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
        detailed: `# CodeAI: Intelligent Code Review Platform

## Project Vision
Create a landing page for CodeAI, a revolutionary code review platform that uses artificial intelligence to enhance code quality and team collaboration. The client is a tech startup seeking to attract both enterprise development teams and individual developers.

The design should showcase the platform's AI capabilities and real-time collaboration features while driving sign-ups for the free trial. Position CodeAI as a cutting-edge development tool that stands out in the competitive market.

## Audience & Requirements
The target audience includes software development teams, engineering managers, individual developers, and tech companies of all sizes. They need a modern, technically sophisticated design with interactive feature demonstrations, clear pricing tables, testimonials, and a prominent signup form.

## Brand Direction
The visual identity should use deep blues, electric purples, and crisp whites with modern, technical sans-serif fonts. The tone should be professional, innovative, and trustworthy to appeal to technical users while being accessible to decision-makers.`
      },
      {
        detailed: `# CloudMetrics: Cloud Resource Monitoring Dashboard

## Project Vision
Design a comprehensive dashboard for CloudMetrics, a cloud resource monitoring platform that helps teams track and optimize their infrastructure. The client is an established cloud services provider expanding their product line with this new monitoring solution.

The interface should create an intuitive experience for complex data visualization, enable quick identification of system issues, and facilitate cost optimization decisions through clear metrics and insights.

## Audience & Requirements
The dashboard will be used by DevOps engineers, system administrators, cloud architects, and IT managers. It needs real-time data visualization, customizable widgets, alert configuration systems, resource usage trends, cost analytics, and performance metrics.

## Brand Direction
Use a professional color scheme of navy, teal, and cloud gray with clear, legible fonts optimized for data readability. The visual language should feel technical, reliable, and efficient to build trust with the technically sophisticated user base.`
      }
    ],
    health: [
      {
        detailed: `# HealthConnect: Telemedicine Consultation Platform

## Project Vision
Design a telemedicine platform's consultation booking interface for HealthConnect, connecting patients with healthcare providers for virtual consultations. The client is a healthcare technology company focused on making medical care more accessible through digital solutions.

The interface should streamline the appointment booking process, build trust through professional design, and ensure accessibility for all users regardless of age or technical ability.

## Audience & Requirements
The platform will serve patients of all ages, healthcare providers, medical practices, and healthcare facilities. Key features include intuitive appointment scheduling, secure video consultation interfaces, medical history management, prescription tracking, and follow-up scheduling.

## Brand Direction
The design should use healing greens and calming blues with clear, accessible fonts. The visual language should feel trustworthy, caring, and professional to reassure patients and convey medical expertise.`
      },
      {
        detailed: `# MediTrack: Patient Health Portal

## Project Vision
Create a comprehensive patient portal for MediTrack, allowing users to access their medical records, schedule appointments, and track health metrics. The client is a healthcare technology provider focused on improving patient engagement and access to medical information.

The interface should simplify access to personal medical records, streamline appointment scheduling, and improve patient engagement with their healthcare journey through intuitive design and clear information architecture.

## Audience & Requirements
The portal will be used by patients of all ages and technical abilities, healthcare providers, and medical administrators. Key features include secure medical records access, appointment scheduling, medication tracking, test results viewing, and secure messaging with providers.

## Brand Direction
Use professional blues and calming greens with highly readable, accessible fonts. The design should convey a trustworthy, clear, and supportive tone that makes patients feel comfortable while ensuring medical information is presented with appropriate seriousness.`
      }
    ],
    education: [
      {
        detailed: `# EduHub: Learning Catalog Interface

## Project Vision
Design an online learning platform's course catalog interface for EduHub, offering diverse educational content across multiple disciplines. The client is an educational technology company looking to expand its market share in the online learning space.

The interface should create an engaging course discovery experience, facilitate easy selection and enrollment, and showcase instructor expertise to encourage prospective students to register.

## Audience & Requirements
The platform will serve students of all ages, professional learners, educators, and educational institutions. Key features include intuitive course categorization, detailed previews, instructor profiles, student reviews, progress tracking, and personalized recommendations.

## Brand Direction
Use energetic oranges and focused blues with clean, readable fonts. The visual language should feel inspiring, accessible, and professional to motivate learning while maintaining educational credibility.`
      },
      {
        detailed: `# LearnSpace: Virtual Classroom Environment

## Project Vision
Create an immersive virtual classroom interface for LearnSpace, facilitating real-time interaction between students and teachers. The client is an educational technology startup focused on improving remote learning experiences through better digital tools.

The design should create an engaging virtual learning environment, support real-time collaboration between participants, and facilitate effective knowledge transfer through intuitive tools and clear information hierarchy.

## Audience & Requirements
The platform will serve K-12 students, higher education students, teachers, and educational institutions. Key features include live video discussion capabilities, interactive whiteboard functionality, document sharing, assignment submission, progress tracking, and in-class communication tools.

## Brand Direction
Use engaging blues and focused purples with clear, friendly fonts. The design should convey a supportive, engaging, and focused atmosphere that promotes learning while minimizing distractions.`
      }
    ],
    finance: [
      {
        detailed: `# CryptoTrade: Trading Platform Interface

## Project Vision
Design a sophisticated trading interface for CryptoTrade, featuring real-time market data, trading charts, and portfolio management. The client is a fintech company expanding into the cryptocurrency market with a focus on security and user experience.

The interface should create an intuitive trading experience, display complex market data clearly, and build trust through professional design that balances functionality with accessibility.

## Audience & Requirements
The platform will be used by novice crypto investors, experienced traders, financial professionals, and investment firms. Key features include real-time market data visualization, trading charts, portfolio management tools, market analysis features, order execution, and security elements.

## Brand Direction
Use professional blues with strategic alert accents and clear, precise fonts for data presentation. The design should feel professional, trustworthy, and precise to build confidence in users making financial transactions.`
      },
      {
        detailed: `# FinanceFlow: Personal Finance Dashboard

## Project Vision
Create an intuitive dashboard for FinanceFlow, helping users track expenses, investments, and financial goals. The client is a fintech startup focused on improving financial literacy and personal money management through accessible tools.

The interface should simplify financial data visualization, promote better spending habits, and facilitate goal setting through clear metrics and actionable insights that make complex financial information approachable.

## Audience & Requirements
The dashboard will serve young professionals, budget-conscious consumers, financial planners, and small business owners. Key features include expense tracking and categorization, budget visualization, goal setting, portfolio tracking, bill payment reminders, and financial insights.

## Brand Direction
Use trustworthy blues and growth greens with clean, precise fonts. The design should convey a supportive, instructive, and encouraging tone that empowers users to take control of their finances without feeling intimidated.`
      }
    ]
  },
  mobile: {
    tech: [
      {
        detailed: `# SmartHome Hub: Connected Device Control

## Project Vision
Design a mobile app for SmartHome Hub, allowing users to control and monitor their connected devices. The client is an IoT company expanding their product ecosystem with a unified control application for smart home management.

The interface should create a user-friendly device control experience, simplify home automation setup, and visualize energy usage patterns through intuitive layouts and clear information hierarchy.

## Audience & Requirements
The app will be used by smart home enthusiasts, homeowners, tech-savvy consumers, and property managers. Key features include a device control dashboard, automation routines creator, energy monitoring, security alerts, device grouping, and quick action access.

## Brand Direction
Use tech-focused purples with subtle accents and modern, clean fonts. The design should feel helpful, sophisticated, and reliable to build trust with users managing their home systems.`
      },
      {
        detailed: `# CodePocket: Mobile Development Environment

## Project Vision
Create an innovative mobile IDE for CodePocket, enabling developers to write and test code on their smartphones. The client is a developer tools company focused on creating mobile-first solutions for programmers who need flexibility.

The interface should optimize the coding experience for mobile screens while maintaining essential development functionality and ensuring keyboard accessibility for efficient code entry.

## Audience & Requirements
The app will serve professional developers, computer science students, hobbyist programmers, and tech educators. Key features include a code editor with syntax highlighting, project file management, git integration, compiler functionality, debugging tools, and code snippets.

## Brand Direction
Use dark mode with syntax highlighting colors and monospace coding fonts. The design should feel professional, efficient, and innovative to appeal to developers who value both functionality and modern aesthetics.`
      }
    ],
    health: [
      {
        detailed: `# FitAI: Intelligent Fitness Companion

## Project Vision
Design a fitness tracking app with AI-powered coaching for FitAI, featuring personalized workout plans and real-time exercise tracking. The client is a health tech startup combining fitness expertise with machine learning for personalized guidance.

The interface should create an engaging fitness tracking experience, visualize progress effectively, and provide intuitive exercise guidance that motivates users to maintain their fitness routine.

## Audience & Requirements
The app will serve fitness enthusiasts, gym-goers, home workout practitioners, and personal trainers. Key features include workout planning, exercise form tracking, progress visualization, AI feedback, goal setting, and social sharing capabilities.

## Brand Direction
Use energetic reds and focused blues with dynamic, motivational fonts. The design should feel encouraging, motivational, and expert to inspire users while conveying fitness authority.`
      },
      {
        detailed: `# MindSpace: Mental Wellness Application

## Project Vision
Create a calming interface for MindSpace, helping users practice meditation and track their mental well-being. The client is a wellness company focused on improving mental health through technology and mindfulness practices.

The interface should create a peaceful digital environment, facilitate daily meditation practice, and help users track emotional wellbeing through intuitive controls and distraction-free design.

## Audience & Requirements
The app will serve mindfulness practitioners, stress management seekers, mental health conscious users, and wellness enthusiasts. Key features include guided meditation interfaces, mood tracking, journal entries, progress visualization, customizable sessions, and mindfulness reminders.

## Brand Direction
Use calming blues and serene greens with gentle, approachable fonts. The design should convey a peaceful, supportive, and grounding atmosphere that helps users disconnect from stress and focus on mental wellness.`
      }
    ],
    education: [
      {
        detailed: `# LingoPro: Language Learning Application

## Project Vision
Design a language learning app with speech recognition for LingoPro, providing interactive lessons and real-time pronunciation feedback. The client is an education technology company specializing in language acquisition through interactive methods.

The interface should create an engaging learning experience, provide immediate pronunciation feedback, and track progress effectively to keep users motivated in their language journey.

## Audience & Requirements
The app will serve language learners of all levels, international travelers, students, and professional development seekers. Key features include interactive lessons, speech recognition, vocabulary practice, conversation scenarios, progress tracking, and achievements.

## Brand Direction
Use bright, international colors with clear, friendly fonts. The design should feel encouraging, multicultural, and engaging to create a positive, motivating learning environment.`
      },
      {
        detailed: `# TeamLearn: Collaborative Student Platform

## Project Vision
Create a mobile app for TeamLearn, enabling students to work together on academic projects and assignments. The client is an education technology startup focused on improving collaborative learning experiences through better digital tools.

The interface should facilitate student collaboration, streamline group project management, and support various learning activities through intuitive organization and clear communication channels.

## Audience & Requirements
The app will serve high school students, college students, educators, and academic institutions. Key features include project management, document sharing, task assignment, group discussions, deadline tracking, and file version control.

## Brand Direction
Use collaborative purples and focused blues with clear, academic fonts. The design should convey a supportive, organized, and collaborative atmosphere that promotes productive teamwork while maintaining educational seriousness.`
      }
    ],
    finance: [
      {
        detailed: `# SmartBank: Mobile Banking & Budgeting

## Project Vision
Design a mobile banking app for SmartBank, combining traditional banking services with advanced budget management. The client is a digital bank focused on helping customers improve their financial habits through accessible technology.

The interface should create a secure banking experience, simplify financial management, and encourage better spending habits through clear visualization and actionable insights.

## Audience & Requirements
The app will serve digital banking customers, budget-conscious consumers, young professionals, and financial planners. Key features include account management, transaction categorization, spending analysis, budget setting, goal tracking, and payment reminders.

## Brand Direction
Use trustworthy blues and secure greens with clean, professional fonts. The design should feel secure, helpful, and straightforward to build confidence while making financial management approachable.`
      },
      {
        detailed: `# WealthWise: Investment Portfolio Tracker

## Project Vision
Create a comprehensive investment app for WealthWise, helping users manage and analyze their investment portfolios. The client is a fintech company specializing in making investment management accessible to retail investors.

The interface should visualize complex investment data clearly, simplify portfolio management, and support informed investment decisions through intuitive tools and clear information hierarchy.

## Audience & Requirements
The app will serve retail investors, investment enthusiasts, financial advisors, and retirement planners. Key features include portfolio dashboard, stock tracking, performance analytics, market news integration, risk assessment, and trade execution.

## Brand Direction
Use professional blues and growth greens with precise, trustworthy fonts. The design should convey a knowledgeable, reliable, and clear tone that builds confidence while making investment information accessible.`
      }
    ]
  },
  branding: {
    tech: [
      {
        detailed: `# CryptoGuard: Blockchain Security Branding

## Project Vision
Create a modern brand identity for CryptoGuard, a blockchain security firm protecting cryptocurrency assets and infrastructure. The client is a cybersecurity startup specializing in blockchain protection for enterprises and crypto projects.

The branding should establish trust through visual identity, communicate technical expertise, and create a memorable presence that positions the company as a leader in this specialized security niche.

## Audience & Requirements
The brand will target cryptocurrency projects, blockchain developers, financial institutions, and enterprise security teams. Key deliverables include a logo system, color palette, typography selection, brand patterns, digital application guidelines, and marketing templates.

## Brand Direction
Consider secure blues and technical violets with modern, precise sans-serif typography. The visual language should feel trustworthy, innovative, and expert to convey security while acknowledging the cutting-edge nature of blockchain technology.`
      },
      {
        detailed: `# NeuralLab: AI Research Identity

## Project Vision
Design a sophisticated brand identity for NeuralLab, an artificial intelligence research institution exploring next-generation AI technologies. The client is a research organization focused on advancing artificial intelligence through interdisciplinary approaches.

The branding should communicate scientific authority, showcase their innovative approach, and appeal to both academic and commercial partners through a balanced visual identity.

## Audience & Requirements
The brand will target academic researchers, AI engineers, corporate R&D departments, and technology investors. Key deliverables include a logo system, visual language, publication templates, digital presence guidelines, presentation materials, and environmental design.

## Brand Direction
Consider intellectual purples and technological blues with typography that balances modern and academic sensibilities. The visual language should feel authoritative, innovative, and precise to establish credibility while conveying technological advancement.`
      }
    ],
    health: [
      {
        detailed: `# HealthPulse: Medical Monitoring Branding

## Project Vision
Create a trustworthy brand identity for HealthPulse, a digital health monitoring service tracking vital patient metrics. The client is a healthcare technology company developing continuous monitoring solutions for patients and providers.

The branding should build trust through professional design, balance medical authority with approachability, and create recognition across digital and physical touchpoints in healthcare settings.

## Audience & Requirements
The brand will target patients with chronic conditions, healthcare providers, medical facilities, and insurance companies. Key deliverables include a logo system, color palette, typography, app interface guidelines, medical documentation templates, and product packaging.

## Brand Direction
Consider healing blues and trustworthy teals with clear, accessible sans-serif typography. The visual language should feel reassuring, professional, and caring to build trust with patients while maintaining medical credibility.`
      },
      {
        detailed: `# NatureWell: Premium Wellness Branding

## Project Vision
Design a holistic brand identity for NatureWell, a premium wellness product line combining natural ingredients with scientific validation. The client is a wellness company creating science-backed natural products for health-conscious consumers.

The branding should communicate premium quality, highlight natural ingredients, and establish scientific credibility through sophisticated visual elements and cohesive application across products.

## Audience & Requirements
The brand will target health-conscious consumers, wellness enthusiasts, holistic health practitioners, and premium retailers. Key deliverables include a logo system, packaging guidelines, product photography style, digital presence guidelines, retail displays, and marketing collateral.

## Brand Direction
Consider natural greens and earthy neutrals with a balanced combination of serif and sans-serif typography. The visual language should feel knowledgeable, premium, and authentic to elevate the products while conveying their natural origins.`
      }
    ],
    education: [
      {
        detailed: `# STEMSpark: Youth Education Branding

## Project Vision
Create an engaging brand identity for STEMSpark, making science, technology, engineering, and math exciting for young learners. The client is an educational company making STEM subjects accessible and appealing to children through interactive learning.

The branding should appeal to young learners while reassuring parents, make STEM subjects appear fun and approachable, and create a cohesive system across various scientific disciplines.

## Audience & Requirements
The brand will target children ages 8-14, parents and caregivers, educators, and educational institutions. Key deliverables include a logo system, mascot character, subject iconography, digital interface guidelines, educational material templates, and marketing collateral.

## Brand Direction
Consider a vibrant rainbow palette with subject-based color coding and friendly, highly readable typography. The visual language should feel enthusiastic, encouraging, and educational to engage young minds while maintaining learning credibility.`
      },
      {
        detailed: `# CareerLift: Professional Development Identity

## Project Vision
Design a sophisticated brand identity for CareerLift, a professional skills development platform offering training and certification. The client is a professional education company focused on career advancement through targeted skills development.

The branding should project professional credibility, communicate career advancement potential, and appeal to both individual professionals and corporate clients seeking development solutions.

## Audience & Requirements
The brand will target career-focused professionals, corporate training departments, HR managers, and industry associations. Key deliverables include a logo system, visual language, certificate designs, digital platform guidelines, course materials, and corporate presentations.

## Brand Direction
Consider professional blues with aspirational accents and clean, authoritative sans-serif typography. The visual language should feel ambitious, professional, and supportive to inspire career advancement while maintaining corporate credibility.`
      }
    ],
    finance: [
      {
        detailed: `# GreenVest: Sustainable Investment Branding

## Project Vision
Create a modern brand identity for GreenVest, a sustainable investment platform focused on environmental responsibility. The client is a fintech company offering investment products focused on environmentally responsible companies and projects.

The branding should communicate financial expertise alongside environmental values, build trust with investors, and differentiate from traditional investment platforms through purposeful visual elements.

## Audience & Requirements
The brand will target environmentally conscious investors, financial advisors, ESG-focused funds, and institutional investors. Key deliverables include a logo system, visual language, investment report templates, digital platform guidelines, marketing collateral, and presentations.

## Brand Direction
Consider financial blues with sustainable greens and clean, trustworthy sans-serif typography. The visual language should feel knowledgeable, transparent, and purposeful to convey financial credibility with environmental commitment.`
      },
      {
        detailed: `# CryptoHub: Cryptocurrency Exchange Branding

## Project Vision
Design a trustworthy brand identity for CryptoHub, a secure cryptocurrency exchange for trading digital assets. The client is a financial technology company creating a secure trading platform for various cryptocurrencies.

The branding should establish trust through visual identity, communicate technical sophistication, and appeal to both novice and experienced traders through balanced design elements.

## Audience & Requirements
The brand will target cryptocurrency investors, blockchain enthusiasts, financial professionals, and institutional traders. Key deliverables include a logo system, visual language, trading platform guidelines, security visualization approach, marketing communication, and digital presence.

## Brand Direction
Consider secure blues with technical accents and precise, modern sans-serif typography. The visual language should feel secure, innovative, and reliable to build trust in a volatile market while conveying technological advancement.`
      }
    ]
  },
  ui: {
    tech: [
      {
        detailed: `# CodePro: Developer Interface System

## Project Vision
Design a dark mode interface for CodePro, a code editor optimized for developer productivity and eye comfort. The client is a developer tools company creating a new programming environment for professional developers.

The UI system should optimize for extended use without eye strain, create a focused coding environment, and support complex functionality with clear interface elements and visual hierarchy.

## Audience & Requirements
The UI will serve professional developers, software engineers, computer science students, and technical teams. Key deliverables include color scheme development, typography optimization, syntax highlighting system, component library, icon system, and state visualization.

## Design Direction
Create a dark background with strategic contrast elements, using monospace fonts for code and clear sans-serif for UI elements. The visual style should be clean and minimal with focus on content, prioritizing readability and efficiency.`
      },
      {
        detailed: `# CloudDeploy: Infrastructure Management UI

## Project Vision
Create a comprehensive UI system for CloudDeploy, streamlining cloud infrastructure management through intuitive interfaces. The client is a cloud services provider creating tools for simplified infrastructure deployment and management.

The UI system should simplify complex technical processes, create consistent interface patterns, and support technical workflows efficiently through thoughtful organization and clear feedback systems.

## Audience & Requirements
The UI will serve DevOps engineers, system administrators, cloud architects, and development teams. Key deliverables include component library development, workflow visualization, status indicators, data visualization patterns, form design system, and navigation architecture.

## Design Direction
Use a professional color scheme with clear status indicators and highly readable typography for complex information. The visual style should be structured and logical with clear hierarchy to support technical decision-making.`
      }
    ],
    health: [
      {
        detailed: `# MediView: Medical Imaging Interface

## Project Vision
Create a specialized UI kit for MediView, focusing on medical image analysis and reporting for diagnostic accuracy. The client is a healthcare technology company developing diagnostic tools for medical imaging professionals.

The UI system should support precise medical analysis, create intuitive measurement tools, and facilitate clear medical reporting through considerate interface design and information hierarchy.

## Audience & Requirements
The UI will serve radiologists, medical specialists, imaging technicians, and healthcare facilities. Key deliverables include image viewing controls, measurement tool interfaces, analysis visualization components, reporting templates, patient data display, and workflow navigation.

## Design Direction
Use a neutral color scheme with clear diagnostic indicators and highly readable typography for critical information. The visual style should be clean and precise with focus on imaging, prioritizing accuracy and clinical utility.`
      },
      {
        detailed: `# VitalTrack: Patient Monitoring Interface

## Project Vision
Design an intuitive UI system for VitalTrack, enabling real-time patient monitoring in clinical settings. The client is a medical technology company developing monitoring solutions for healthcare environments.

The UI system should support quick recognition of patient status, create clear data visualization patterns, and design for high-stakes environments where information clarity is critical for patient care.

## Audience & Requirements
The UI will serve nurses and clinicians, physicians, hospital staff, and remote monitoring teams. Key deliverables include vital sign display components, alert visualization system, patient information architecture, timeline tools, status indicators, and quick action components.

## Design Direction
Use a clinical color scheme with clear status indicators and highly readable typography viewable at various distances. The visual style should be clean and information-focused with clear hierarchy that supports urgent decision-making.`
      }
    ],
    education: [
      {
        detailed: `# EduPlay: Learning Interaction System

## Project Vision
Create an engaging UI kit for EduPlay, supporting interactive educational content across various subjects. The client is an educational technology company creating interactive learning modules for diverse educational contexts.

The UI system should create engaging learning interfaces, support various content types, and design for learner engagement through intuitive interactions and clear feedback mechanisms.

## Audience & Requirements
The UI will serve students of various ages, educators, content creators, and educational institutions. Key deliverables include interactive exercise components, content presentation patterns, progress visualization, feedback tools, achievement indicators, and navigation patterns.

## Design Direction
Use an engaging color scheme with subject-based color coding and highly readable typography for learning content. The visual style should be friendly and clear with appropriate engagement elements that support educational goals without distraction.`
      },
      {
        detailed: `# GradeWise: Educational Assessment Interface

## Project Vision
Design a comprehensive UI system for GradeWise, facilitating student assessment and feedback for educators. The client is an education technology company creating tools for student assessment and performance tracking.

The UI system should streamline the assessment process, create clear feedback mechanisms, and support detailed performance analysis through intuitive grading tools and visualization systems.

## Audience & Requirements
The UI will serve teachers and professors, educational administrators, students, and parents. Key deliverables include grading interface components, feedback tools, performance visualization patterns, assessment templates, reporting components, and analytics dashboards.

## Design Direction
Use a professional color scheme with clear performance indicators and clean, readable typography for data and comments. The visual style should be structured and informative with clear data hierarchy that supports educational evaluation.`
      }
    ],
    finance: [
      {
        detailed: `# FinanceView: Financial Analytics System

## Project Vision
Create a professional UI kit for FinanceView, supporting complex financial data analysis and reporting. The client is a financial technology company creating tools for investment analysis and reporting.

The UI system should visualize complex financial data clearly, create consistent reporting patterns, and support detailed analysis workflows through considerate information design and interactive components.

## Audience & Requirements
The UI will serve financial analysts, investment managers, corporate finance teams, and financial advisors. Key deliverables include chart and graph components, data table patterns, filtering interfaces, report templates, notification systems, and dashboard layouts.

## Design Direction
Use a professional color scheme with clear data indicators and precise, readable typography for numerical data. The visual style should be clean and data-focused with clear hierarchy that supports financial decision-making.`
      },
      {
        detailed: `# PortfolioTrack: Investment Management Interface

## Project Vision
Design an intuitive UI system for PortfolioTrack, enabling detailed investment analysis and portfolio management. The client is a financial technology company creating tools for investment portfolio optimization.

The UI system should simplify complex investment data, create clear performance visualization, and support investment decision-making through thoughtful information architecture and interactive tools.

## Audience & Requirements
The UI will serve individual investors, financial advisors, portfolio managers, and wealth management firms. Key deliverables include portfolio visualization components, performance metric displays, risk indicators, asset allocation tools, transaction interfaces, and market data visualization.

## Design Direction
Use a trustworthy color scheme with clear performance indicators and highly readable typography for financial data. The visual style should be clean and precise with focus on data clarity to support confident investment decisions.`
      }
    ]
  }
} 