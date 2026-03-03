import type { FAQItem } from '@/types/chat'

export const FAQ_DATA: FAQItem[] = [
  // Services
  {
    id: 'services-1',
    question: 'What services do you offer?',
    answer: 'We develop digital solutions for architecture and engineering firms to modernize their workflows. Our services include:\n\n• CAD to BIM conversion\n• Structured BIM-compatible data creation\n• Workflow automation for construction\n• Digital construction process optimization\n• Data consistency management\n\nWe help firms maintain efficiency and project accuracy while transitioning to modern digital workflows.',
    keywords: ['services', 'what do you do', 'offer', 'provide', 'solutions', 'help'],
    category: 'Services',
    relatedQuestions: ['What is CAD to BIM?', 'How long does a project take?']
  },
  {
    id: 'services-2',
    question: 'What is CAD to BIM conversion?',
    answer: 'CAD to BIM conversion transforms traditional 2D CAD drawings into intelligent 3D Building Information Models (BIM).\n\nWhat we do:\n• Convert legacy CAD files to BIM-compatible formats\n• Create structured, parametric 3D models\n• Add intelligent data to building elements\n• Ensure accuracy and consistency\n• Enable better collaboration and visualization\n\nThis allows architecture and engineering firms to work with modern digital workflows while preserving their existing project data.',
    keywords: ['cad to bim', 'cad2bim', 'conversion', 'transform', 'convert drawings', 'bim modeling'],
    category: 'Services'
  },
  {
    id: 'services-3',
    question: 'What is BIM and why is it important?',
    answer: 'BIM (Building Information Modeling) is a digital representation of physical and functional characteristics of a building.\n\nKey benefits:\n• 3D visualization for better planning\n• Clash detection before construction\n• Improved collaboration across teams\n• Accurate cost estimation\n• Better project coordination\n• Lifecycle facility management\n\nModern construction projects increasingly require BIM for efficiency and accuracy.',
    keywords: ['bim', 'building information modeling', 'what is bim', 'bim benefits', '3d modeling'],
    category: 'Services'
  },
  {
    id: 'services-4',
    question: 'What file formats do you work with?',
    answer: 'We work with various CAD and BIM file formats:\n\n**Input formats:**\n• AutoCAD (.dwg, .dxf)\n• MicroStation (.dgn)\n• Other 2D CAD formats\n\n**Output formats:**\n• Revit (.rvt)\n• IFC (Industry Foundation Classes)\n• Other BIM-compatible formats\n\nWe ensure data accuracy and compatibility throughout the conversion process.',
    keywords: ['file formats', 'dwg', 'revit', 'autocad', 'ifc', 'formats supported', 'file types'],
    category: 'Services'
  },
  {
    id: 'services-5',
    question: 'Who are your typical clients?',
    answer: 'We serve architecture, engineering, and construction professionals:\n\n• Architectural firms\n• Engineering consultancies\n• Construction companies\n• MEP (Mechanical, Electrical, Plumbing) contractors\n• Facility management teams\n• Real estate developers\n\nAnyone working on building projects who needs to transition from CAD to BIM workflows.',
    keywords: ['clients', 'who', 'industries', 'sector', 'architecture', 'engineering', 'construction'],
    category: 'Services'
  },

  // Pricing & Consultation
  {
    id: 'pricing-1',
    question: 'How much do you charge?',
    answer: 'Our pricing is project-based and depends on:\n\n• Scope and complexity\n• Timeline requirements\n• Level of customization\n• Ongoing support needs\n\nWe offer a FREE 30-minute consultation to discuss your needs and provide a custom quote. Book a consultation to get started!',
    keywords: ['price', 'cost', 'how much', 'pricing', 'charge', 'fee', 'expensive', 'affordable'],
    category: 'Pricing',
    relatedQuestions: ['How do I book a consultation?', 'Do you offer packages?']
  },
  {
    id: 'pricing-2',
    question: 'Do you offer packages or only custom solutions?',
    answer: 'We primarily offer custom solutions tailored to your business needs. However, we can discuss package options during your consultation based on common use cases in your industry.\n\nEvery business is unique, so we prefer to understand your specific challenges first.',
    keywords: ['packages', 'plans', 'custom', 'standard', 'ready-made'],
    category: 'Pricing'
  },

  // Consultation & Booking
  {
    id: 'booking-1',
    question: 'How do I book a consultation?',
    answer: 'Booking a consultation is easy!\n\n1. Click on the "Book Consultation" tab in the Contact section\n2. Choose your preferred date and time\n3. Fill in your details and what you\'d like to discuss\n4. You\'ll receive a confirmation email\n\nAvailability:\n• Weekdays: 5:00 PM - 10:00 PM\n• Weekends: 9:00 AM - 5:00 PM\n\nMinimum 48 hours advance booking required.',
    keywords: ['book', 'schedule', 'appointment', 'consultation', 'meeting', 'call', 'talk'],
    category: 'Booking',
    relatedQuestions: ['What are your working hours?', 'Is the consultation free?']
  },
  {
    id: 'booking-2',
    question: 'Is the consultation free?',
    answer: 'Yes! The initial 30-minute consultation is completely FREE.\n\nDuring this call, we\'ll:\n• Understand your business challenges\n• Discuss potential automation opportunities\n• Provide initial recommendations\n• Give you a rough timeline and quote\n\nNo commitment required!',
    keywords: ['free consultation', 'cost consultation', 'free call', 'charge consultation'],
    category: 'Booking'
  },
  {
    id: 'booking-3',
    question: 'What happens during the consultation?',
    answer: 'During your 30-minute consultation:\n\n1. **Discovery** - We learn about your business and current processes\n2. **Analysis** - We identify automation opportunities\n3. **Recommendations** - We suggest practical solutions\n4. **Q&A** - You ask any questions\n5. **Next Steps** - We outline the project scope and timeline\n\nCome prepared with specific challenges or processes you\'d like to automate!',
    keywords: ['consultation process', 'what happens', 'consultation call', 'expect'],
    category: 'Booking'
  },

  // Working Hours & Contact
  {
    id: 'contact-1',
    question: 'What are your working hours?',
    answer: 'Our consultation hours are:\n\n📅 **Weekdays (Mon-Fri):**\n5:00 PM - 10:00 PM\n\n📅 **Weekends (Sat-Sun):**\n9:00 AM - 5:00 PM\n\n⏰ All times are in Malaysia Time (UTC+8)\n\nFor urgent inquiries, email us at samiragele010@gmail.com',
    keywords: ['hours', 'time', 'when', 'available', 'open', 'timing', 'schedule'],
    category: 'Contact'
  },
  {
    id: 'contact-2',
    question: 'How can I contact you?',
    answer: 'You can reach us through:\n\n📧 **Email:** samiragele010@gmail.com\n💬 **Contact Form:** Fill out the form on our website\n📅 **Book Consultation:** Schedule a call directly\n\nWe typically respond within 24-48 hours during business days.',
    keywords: ['contact', 'reach', 'email', 'phone', 'message', 'get in touch'],
    category: 'Contact'
  },
  {
    id: 'contact-3',
    question: 'Where are you located?',
    answer: 'We\'re based in Malaysia and primarily serve Malaysian SMEs.\n\nWe work remotely and can serve clients throughout Malaysia. All consultations are conducted online for your convenience.',
    keywords: ['location', 'where', 'office', 'address', 'based', 'malaysia'],
    category: 'Contact'
  },

  // Project & Timeline
  {
    id: 'project-1',
    question: 'How long does a project take?',
    answer: 'Project timelines vary based on complexity:\n\n• **Simple automation:** 2-4 weeks\n• **Medium projects:** 1-2 months\n• **Complex systems:** 2-4 months\n\nDuring your consultation, we\'ll provide a specific timeline based on your requirements.\n\nWe prioritize quality and thorough testing over rushing.',
    keywords: ['timeline', 'how long', 'duration', 'time', 'quick', 'fast'],
    category: 'Projects'
  },
  {
    id: 'project-2',
    question: 'Do you provide ongoing support?',
    answer: 'Yes! We offer:\n\n• **Post-launch support** - Bug fixes and adjustments\n• **Maintenance packages** - Regular updates and monitoring\n• **Training** - For your team to use the system\n• **Updates** - Feature additions as your business grows\n\nSupport options and pricing are discussed during the project proposal.',
    keywords: ['support', 'maintenance', 'after', 'ongoing', 'training', 'help'],
    category: 'Projects'
  },

  // Process
  {
    id: 'process-1',
    question: 'What is your process?',
    answer: 'Our typical process:\n\n1. **Free Consultation** - Understand your needs\n2. **Proposal** - Detailed scope, timeline, and quote\n3. **Agreement** - Sign off on the plan\n4. **Development** - Build and test the solution\n5. **Review** - Get your feedback\n6. **Launch** - Deploy and train your team\n7. **Support** - Ongoing maintenance\n\nWe keep you involved at every step!',
    keywords: ['process', 'how it works', 'steps', 'workflow', 'procedure'],
    category: 'Process'
  },

  // Technology
  {
    id: 'tech-1',
    question: 'What technologies do you use?',
    answer: 'We use modern, proven technologies including:\n\n• AI & Machine Learning tools\n• Workflow automation platforms\n• Custom development (Python, JavaScript, etc.)\n• Cloud services (AWS, Google Cloud)\n• Integration APIs\n\nWe choose the best tools for YOUR specific needs - not what\'s trendy.',
    keywords: ['technology', 'tech stack', 'tools', 'software', 'platform'],
    category: 'Technology'
  }
]

export const QUICK_ACTIONS = [
  { id: 'qa-1', label: '🏗️ CAD to BIM', value: 'What is CAD to BIM conversion?' },
  { id: 'qa-2', label: '💰 Pricing', value: 'How much do you charge?' },
  { id: 'qa-3', label: '📅 Book Consultation', value: 'How do I book a consultation?' },
  { id: 'qa-4', label: '📁 File Formats', value: 'What file formats do you work with?' },
]

export const WELCOME_MESSAGE = `Hi there! 👋 I'm your virtual assistant.

I can help you with:
• CAD to BIM conversion services
• BIM modeling and workflows
• Pricing and project timelines
• Booking consultations
• File formats and technical questions

How can I help you today?`

export const FALLBACK_RESPONSES = [
  "Hmm, I'm not sure about that one. 🤔\n\nI can help with:\n• Our services (automation, AI, integration)\n• Pricing and packages\n• Booking consultations\n• Working hours\n\nOr feel free to book a free consultation to discuss your specific question!",

  "Good question! I don't have a specific answer for that yet.\n\nYou can:\n• Ask about our services, pricing, or booking\n• Email us at samiragele010@gmail.com\n• Book a free 30-min consultation\n\nWhat else can I help with?"
]
