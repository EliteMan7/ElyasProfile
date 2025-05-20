import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our language context
type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
});

// Hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Define translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Hi, I\'m',
    'hero.subtitle': 'Product Manager',
    'hero.description': 'Committed to Driving Product Growth and Innovation',
    'hero.cta.projects': 'View Projects',
    'hero.cta.contact': 'Get In Touch',
    'hero.name': 'Elyas Ahmed',
    
    // About
    'about.title': 'About Me',
    'about.skills': 'Skills',
    'about.interests': 'In my free time, I like to:',
    'about.bio.education': 'I graduated from UC Berkeley with a B.S. in Electrical Engineering and Computer Science (EECS), where I developed a strong foundation for my career in product management.',
    'about.bio.career': 'As a product manager with a technical background, I bridge the gap between business strategy and technical execution. I excel at defining product vision, conducting user research, and guiding cross-functional teams to deliver impactful solutions that solve real customer problems.',
    'about.category.product': 'Product Management',
    'about.category.technical': 'Technical Skills',
    'about.category.leadership': 'Leadership',
    'about.interests.running': 'Running & Fitness',
    'about.interests.hiking': 'Nature Hikes',
    'about.interests.food': 'Great Food',
    'about.interests.trends': 'Global Trends',
    'about.interests.games': 'Story-Driven Games',
    
    // Skill names
    'skills.product.strategy': 'Product Strategy',
    'skills.product.research': 'User Research',
    'skills.product.roadmapping': 'Roadmapping',
    'skills.product.agile': 'Agile/Scrum',
    'skills.technical.python': 'Python',
    'skills.technical.ai': 'AI/ML Development',
    'skills.technical.data': 'Data Analysis',
    'skills.technical.ux': 'UX Design',
    'skills.leadership.team': 'Team Management',
    'skills.leadership.stakeholder': 'Stakeholder Communication',
    'skills.leadership.planning': 'Project Planning',
    'skills.leadership.strategic': 'Strategic Thinking',
    
    // Projects
    'projects.title': 'My Projects',
    'projects.subtitle': 'Here are some of my recent projects that showcase my skills in product management, user research, and technical leadership.',
    'projects.cta': 'Discuss a Project',
    'projects.goToProject': 'Go to project {project}',
    
    // Project 1: Qubed
    'projects.qubed.title': 'Qubed – Course Insights & AI Teaching Assistant',
    'projects.qubed.description': 'Led product development for this AI-powered analytics platform that helps professors not just grade faster—but teach smarter, with personalized feedback and error trend analysis. Conducted user research to identify key pain points and opportunities.',
    
    // Project 2: PropertyX
    'projects.propertyx.title': 'PropertyX – Real Estate Productivity App',
    'projects.propertyx.description': 'Prototyped a concept real estate platform targeting 1.5M+ agents across the U.S. Designed and prototyped tools to help real estate professionals effectively manage properties, track sales and rentals, and gain actionable insights aligned with strategic business goals. Created interactive prototype for both desktop and mobile platforms.',
    
    // Project 3: Typing
    'projects.typing.title': 'Typing Speed Measurement',
    'projects.typing.description': 'Product managed the development of a typing speed measurement program with an autocorrect algorithm. Defined requirements for accurately calculating correctness percentage, words per minute (WPM), and elapsed time. Led implementation of a real-time spelling correction feature that improved user satisfaction scores by 27%.',
    
    // Project 4: ML Research
    'projects.ml_research.title': 'ML Research – AGU First Author',
    'projects.ml_research.description': 'Optimized 15+ neural networks using Keras, TensorFlow, and other ML techniques, achieving a 30% increase in model accuracy and 20% improvement in computational efficiency leveraging data extraction and interpretation. As the first author, presented research findings at the AGU conference to 25,000+ participants from 100+ countries, showcasing the strategic impact and innovation of our project.',
    
    // Project 5: BYOW
    'projects.byow.title': 'Build Your Own World – Game Project',
    'projects.byow.description': 'Led the design and development of an immersive world-building game that enables players to craft and explore personalized virtual environments. Engineered advanced procedural terrain generation algorithms and intuitive user interfaces to create a seamless player experience. Leveraged object-oriented programming principles to build extensible game mechanics while implementing effective project management practices—establishing clear milestones, optimizing resource allocation, and ensuring on-time delivery. The result was a highly engaging interactive experience that showcases both technical expertise and creative vision.',
    
    // Project 6: Scheme
    'projects.scheme.title': 'Scheme Interpreter',
    'projects.scheme.description': "Led the development of a Python-based interpreter for the Scheme language with robust parsing and evaluation capabilities. Defined product requirements, created the project plan, and coordinated the team's efforts toward successful delivery.",
    
    // Project 7: Cats
    'projects.cats.title': 'Cats – Image Classification',
    'projects.cats.description': "Managed the development of a machine learning project focused on accurate cat breed identification using convolutional neural networks. Led the team in implementing transfer learning techniques that achieved 92% classification accuracy while reducing training time by 40%.",
    
    // Project 8: Ants
    'projects.ants.title': 'Ants vs. Bees – Tower Defense Game',
    'projects.ants.description': 'Managed the product development cycle for this resource-balancing tower defense game. Created user stories, defined acceptance criteria, and facilitated sprint planning and retrospectives to ensure on-time delivery of a quality product.',
    
    // Common Tags
    'tags.product_strategy': 'Product Strategy',
    'tags.user_research': 'User Research',
    'tags.ml': 'ML',
    'tags.ai': 'AI',
    'tags.ml_platform': 'ML Platform',
    'tags.product_prototyping': 'Product Prototyping',
    'tags.ux_design': 'UX Design',
    'tags.real_estate': 'Real Estate Tech',
    'tags.product_development': 'Product Development',
    'tags.algorithm': 'Algorithm Development',
    'tags.project_planning': 'Project Planning',
    'tags.research': 'Research',
    'tags.team_leadership': 'Team Leadership',
    'tags.game_design': 'Game Design',
    'tags.oop': 'Object-Oriented Programming',
    'tags.ui_development': 'UI Development',
    'tags.project_management': 'Project Management',
    'tags.technical_leadership': 'Technical Leadership',
    'tags.planning': 'Planning',
    'tags.ml_ai': 'ML/AI',
    'tags.computer_vision': 'Computer Vision',
    'tags.product_leadership': 'Product Leadership',
    'tags.product_lifecycle': 'Product Lifecycle',
    'tags.agile': 'Agile Methodologies',
    'tags.requirements': 'Requirements',
    
    // Contact
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Feel free to reach out if you\'re looking for a product manager, have a question, or just want to connect.',
    'contact.connect': 'Let\'s Connect',
    'contact.location': 'Currently based in Berkeley, California. Open to remote and hybrid opportunities worldwide.',
    'contact.email': 'Email',
    'contact.location.label': 'Location',
    'contact.location.value': 'Berkeley, California',
    'contact.social': 'Social Media',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.form.success': 'Your message has been sent successfully. I\'ll get back to you soon!',
    'contact.form.error': 'There was an error sending your message. Please try again or contact me directly via email.',
    
    // Virtual Business Card
    'contact.vcard.toggle': 'Virtual Business Card',
    'contact.vcard.download': 'Add to Contacts',
    'contact.vcard.instruction': 'Scan the QR code or click the button to add me to your contacts',
    'contact.vcard.tap_to_flip': 'Tap to flip',
    'contact.vcard.scan_title': 'Scan QR Code to Add Contact',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.graduate': 'UC Berkeley EECS Graduate 🐻',
    'footer.description': 'Committed to Driving Product Growth and Innovation',
    'footer.quicklinks': 'Quick Links',
    'footer.social': 'Social Media',
    'footer.touch': 'Get in Touch',
    'footer.touch.description': 'Feel free to reach out if you have any questions or just want to connect.',
    
    // Weather
    'weather.current': 'Current',
    'weather.weather': 'Weather',
    'weather.refresh': 'Refresh weather data',
    'weather.liveData': 'Live data based on your current location',
    'weather.tryAgain': 'Try Again',
    'weather.feelsLike': 'Feels Like',
    'weather.humidity': 'Humidity',
    'weather.wind': 'Wind',
    'weather.dataBy': 'Weather data by',
    'weather.unknownLocation': 'Unknown Location',
    'weather.error.fetch': 'Could not retrieve weather data. Please try again.',
    'weather.error.location': 'Unable to get your location. Please allow location access in your browser settings.',
    'weather.error.unsupported': 'Geolocation is not supported by your browser.',
    
    // Scroll
    'scroll.toTop': 'Scroll to top',
    
    // Language Toggle
    'language.switchTo': 'Switch to Arabic',
    
    // Confetti
    'confetti.celebrate': 'Celebrate!',
    
    // Fortune Cookie
    'fortune.title': 'Fortune Cookie',
    'fortune.subtitle': 'Click the cookie to reveal your tech fortune',
    'fortune.cookie': 'Fortune Cookie',
    'fortune.clickToOpen': 'Click to reveal your fortune',
    'fortune.getAnother': 'Get another fortune',
    'fortune.tryYourLuck': 'Try your luck',
    'fortune.luckNumber': 'Your lucky number is',
    'fortune.revealDestiny': 'Reveal Your Destiny',
    'fortune.revealAnother': 'Reveal Another Fortune',
  },
  ar: {
    // Header
    'nav.home': 'الرئيسية',
    'nav.about': 'نبذة عني',
    'nav.projects': 'المشاريع',
    'nav.contact': 'اتصل بي',
    
    // Hero
    'hero.title': 'أهلاً، أنا',
    'hero.subtitle': 'مدير المنتجات',
    'hero.description': 'ملتزم بدفع نمو المنتج والابتكار',
    'hero.cta.projects': 'عرض المشاريع',
    'hero.cta.contact': 'تواصل معي',
    'hero.name': 'الياس احمد',
    
    // About
    'about.title': 'نبذة عني',
    'about.skills': 'المهارات',
    'about.interests': 'في وقت فراغي، أحب:',
    'about.bio.education': 'تخرجت من جامعة بيركلي بدرجة البكالوريوس في الهندسة الكهربائية وعلوم الحاسوب (EECS)، حيث طورت أساسًا قويًا لمسيرتي المهنية في إدارة المنتجات.',
    'about.bio.career': 'كمدير منتج ذو خلفية تقنية، أنا أجسر الفجوة بين استراتيجية الأعمال والتنفيذ التقني. أتفوق في تحديد رؤية المنتج، وإجراء أبحاث المستخدم، وتوجيه الفرق متعددة التخصصات لتقديم حلول مؤثرة تحل مشاكل العملاء الحقيقية.',
    'about.category.product': 'إدارة المنتجات',
    'about.category.technical': 'المهارات التقنية',
    'about.category.leadership': 'القيادة',
    'about.interests.running': 'الجري واللياقة البدنية',
    'about.interests.hiking': 'المشي في الطبيعة',
    'about.interests.food': 'الطعام الجيد',
    'about.interests.trends': 'الاتجاهات العالمية',
    'about.interests.games': 'ألعاب قائمة على القصص',
    
    // Skill names
    'skills.product.strategy': 'استراتيجية المنتج',
    'skills.product.research': 'أبحاث المستخدم',
    'skills.product.roadmapping': 'خارطة الطريق',
    'skills.product.agile': 'أجايل/سكرم',
    'skills.technical.python': 'بايثون',
    'skills.technical.ai': 'تطوير الذكاء الاصطناعي',
    'skills.technical.data': 'تحليل البيانات',
    'skills.technical.ux': 'تصميم تجربة المستخدم',
    'skills.leadership.team': 'إدارة الفريق',
    'skills.leadership.stakeholder': 'التواصل مع أصحاب المصلحة',
    'skills.leadership.planning': 'تخطيط المشاريع',
    'skills.leadership.strategic': 'التفكير الاستراتيجي',
    
    // Projects
    'projects.title': 'مشاريعي',
    'projects.subtitle': 'هذه بعض مشاريعي الحديثة التي تعرض مهاراتي في إدارة المنتجات، وأبحاث المستخدمين، والقيادة التقنية.',
    'projects.cta': 'ناقش مشروعًا',
    'projects.goToProject': 'انتقل إلى المشروع {project}',
    
    // Project 1: Qubed
    'projects.qubed.title': 'كيوبد - رؤى المقررات ومساعد التدريس بالذكاء الاصطناعي',
    'projects.qubed.description': 'قدت تطوير المنتج لهذه المنصة التحليلية المدعومة بالذكاء الاصطناعي التي تساعد الأساتذة ليس فقط على التصحيح بشكل أسرع - بل على التدريس بشكل أكثر ذكاءً، مع تقديم تغذية راجعة مخصصة وتحليل اتجاهات الأخطاء. أجريت أبحاث المستخدم لتحديد نقاط الألم الرئيسية والفرص.',
    
    // Project 2: PropertyX
    'projects.propertyx.title': 'بروبرتي إكس - تطبيق إنتاجية العقارات',
    'projects.propertyx.description': 'قمت بتصميم نموذج أولي لمنصة عقارات تستهدف أكثر من 1.5 مليون وكيل في الولايات المتحدة. صممت وطورت أدوات لمساعدة محترفي العقارات على إدارة العقارات بفعالية، وتتبع المبيعات والإيجارات، والحصول على رؤى قابلة للتنفيذ تتماشى مع الأهداف الاستراتيجية للأعمال. أنشأت نموذجًا تفاعليًا لمنصات سطح المكتب والهاتف المحمول.',
    
    // Project 3: Typing
    'projects.typing.title': 'قياس سرعة الكتابة',
    'projects.typing.description': 'قمت بإدارة تطوير برنامج قياس سرعة الكتابة مع خوارزمية التصحيح التلقائي. حددت متطلبات حساب نسبة الصحة والكلمات في الدقيقة (WPM) والوقت المنقضي بدقة. قدت تنفيذ ميزة تصحيح الإملاء في الوقت الفعلي التي حسنت درجات رضا المستخدم بنسبة 27٪.',
    
    // Project 4: ML Research
    'projects.ml_research.title': 'بحث تعلم الآلة - المؤلف الأول في مؤتمر AGU',
    'projects.ml_research.description': 'قمت بتحسين أكثر من 15 شبكة عصبية باستخدام Keras وTensorFlow وتقنيات تعلم الآلة الأخرى، مما أدى إلى زيادة بنسبة 30٪ في دقة النموذج وتحسين بنسبة 20٪ في الكفاءة الحسابية من خلال الاستفادة من استخراج البيانات وتفسيرها. بصفتي المؤلف الأول، قدمت نتائج البحث في مؤتمر AGU لأكثر من 25,000 مشارك من أكثر من 100 دولة، مما يظهر التأثير الاستراتيجي والابتكار في مشروعنا.',
    
    // Project 5: BYOW
    'projects.byow.title': 'ابنِ عالمك الخاص - مشروع لعبة',
    'projects.byow.description': 'قدت تصميم وتطوير لعبة لبناء عالم غامر تمكن اللاعبين من إنشاء واستكشاف بيئات افتراضية مخصصة. طورت خوارزميات متقدمة لتوليد التضاريس وواجهات مستخدم بديهية لإنشاء تجربة لاعب سلسة. استفدت من مبادئ البرمجة الموجهة للكائنات لبناء آليات لعب قابلة للتوسيع مع تنفيذ ممارسات فعالة لإدارة المشاريع - وضع معالم واضحة، وتحسين تخصيص الموارد، وضمان التسليم في الوقت المحدد. كانت النتيجة تجربة تفاعلية جذابة للغاية تظهر كلاً من الخبرة التقنية والرؤية الإبداعية.',
    
    // Project 6: Scheme
    'projects.scheme.title': 'مفسر سكيم',
    'projects.scheme.description': 'قدت تطوير مفسر قائم على Python للغة Scheme مع قدرات قوية للتحليل والتقييم. حددت متطلبات المنتج، وأنشأت خطة المشروع، ونسقت جهود الفريق نحو التسليم الناجح.',
    
    // Project 7: Cats
    'projects.cats.title': 'القطط - تصنيف الصور',
    'projects.cats.description': 'أدرت تطوير مشروع تعلم الآلة يركز على تحديد سلالات القطط بدقة باستخدام الشبكات العصبية التلافيفية. قدت الفريق في تنفيذ تقنيات التعلم بالنقل التي حققت دقة تصنيف بنسبة 92٪ مع تقليل وقت التدريب بنسبة 40%.',
    
    // Project 8: Ants
    'projects.ants.title': 'النمل ضد النحل - لعبة الدفاع عن البرج',
    'projects.ants.description': 'أدرت دورة تطوير المنتج لهذه اللعبة الدفاعية الموازنة للموارد. أنشأت قصص المستخدم، وحددت معايير القبول، وسهلت تخطيط السباق والمراجعات الاسترجاعية لضمان تسليم منتج عالي الجودة في الوقت المحدد.',
    
    // Common Tags
    'tags.product_strategy': 'استراتيجية المنتج',
    'tags.user_research': 'أبحاث المستخدم',
    'tags.ml': 'تعلم الآلة',
    'tags.ai': 'الذكاء الاصطناعي',
    'tags.ml_platform': 'منصة تعلم الآلة',
    'tags.product_prototyping': 'نماذج أولية للمنتج',
    'tags.ux_design': 'تصميم تجربة المستخدم',
    'tags.real_estate': 'تقنية العقارات',
    'tags.product_development': 'تطوير المنتج',
    'tags.algorithm': 'تطوير الخوارزميات',
    'tags.project_planning': 'تخطيط المشاريع',
    'tags.research': 'البحث',
    'tags.team_leadership': 'قيادة الفريق',
    'tags.game_design': 'تصميم الألعاب',
    'tags.oop': 'البرمجة الموجهة للكائنات',
    'tags.ui_development': 'تطوير واجهة المستخدم',
    'tags.project_management': 'إدارة المشاريع',
    'tags.technical_leadership': 'القيادة التقنية',
    'tags.planning': 'التخطيط',
    'tags.ml_ai': 'تعلم الآلة/الذكاء الاصطناعي',
    'tags.computer_vision': 'رؤية الحاسوب',
    'tags.product_leadership': 'قيادة المنتج',
    'tags.product_lifecycle': 'دورة حياة المنتج',
    'tags.agile': 'منهجيات أجايل',
    'tags.requirements': 'المتطلبات',
    
    // Contact
    'contact.title': 'تواصل معي',
    'contact.subtitle': 'لا تتردد في التواصل إذا كنت تبحث عن مدير منتج، لديك سؤال، أو ترغب فقط في التواصل.',
    'contact.connect': 'لنتواصل',
    'contact.location': 'أقيم حاليًا في بيركلي، كاليفورنيا. منفتح على فرص العمل عن بعد والهجين في جميع أنحاء العالم.',
    'contact.email': 'البريد الإلكتروني',
    'contact.location.label': 'الموقع',
    'contact.location.value': 'بيركلي، كاليفورنيا',
    'contact.social': 'وسائل التواصل الاجتماعي',
    'contact.form.name': 'اسمك',
    'contact.form.email': 'بريدك الإلكتروني',
    'contact.form.message': 'رسالتك',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.form.success': 'تم إرسال رسالتك بنجاح. سأرد عليك قريبًا!',
    'contact.form.error': 'حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى أو الاتصال بي مباشرة عبر البريد الإلكتروني.',
    
    // Virtual Business Card
    'contact.vcard.toggle': 'بطاقة عمل افتراضية',
    'contact.vcard.download': 'إضافة إلى جهات الاتصال',
    'contact.vcard.instruction': 'امسح رمز QR أو انقر على الزر لإضافتي إلى جهات الاتصال الخاصة بك',
    'contact.vcard.tap_to_flip': 'انقر للتحويل',
    'contact.vcard.scan_title': 'امسح رمز QR لإضافة جهة اتصال',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.graduate': 'خريج EECS من جامعة بيركلي 🐻',
    'footer.description': 'ملتزم بدفع نمو المنتج والابتكار',
    'footer.quicklinks': 'روابط سريعة',
    'footer.social': 'وسائل التواصل الاجتماعي',
    'footer.touch': 'تواصل معي',
    'footer.touch.description': 'لا تتردد في التواصل إذا كان لديك أي أسئلة أو تريد فقط التواصل.',
    
    // Weather
    'weather.current': 'الطقس',
    'weather.weather': 'الحالي',
    'weather.refresh': 'تحديث بيانات الطقس',
    'weather.liveData': 'بيانات حية بناءً على موقعك الحالي',
    'weather.tryAgain': 'حاول مرة أخرى',
    'weather.feelsLike': 'الشعور',
    'weather.humidity': 'الرطوبة',
    'weather.wind': 'الرياح',
    'weather.dataBy': 'بيانات الطقس بواسطة',
    'weather.unknownLocation': 'موقع غير معروف',
    'weather.error.fetch': 'تعذر استرداد بيانات الطقس. يرجى المحاولة مرة أخرى.',
    'weather.error.location': 'غير قادر على الحصول على موقعك. يرجى السماح بالوصول إلى الموقع في إعدادات المتصفح الخاص بك.',
    'weather.error.unsupported': 'خدمة تحديد الموقع غير مدعومة في متصفحك.',
    
    // Scroll
    'scroll.toTop': 'انتقل إلى الأعلى',
    
    // Language Toggle
    'language.switchTo': 'التبديل إلى الإنجليزية',
    
    // Confetti
    'confetti.celebrate': 'احتفل!',
    
    // Fortune Cookie
    'fortune.title': 'بسكويت الحظ',
    'fortune.subtitle': 'انقر على البسكويت للكشف عن حظك التقني',
    'fortune.cookie': 'بسكويت الحظ',
    'fortune.clickToOpen': 'انقر للكشف عن حظك',
    'fortune.getAnother': 'احصل على حظ آخر',
    'fortune.tryYourLuck': 'جرب حظك',
    'fortune.luckNumber': 'رقم حظك هو',
    'fortune.revealDestiny': 'اكشف مصيرك',
    'fortune.revealAnother': 'اكشف عن حظ آخر',
  }
};

// LanguageProvider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language preference from localStorage
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language');
      return savedLanguage === 'ar' ? 'ar' : 'en';
    }
    return 'en';
  });
  
  // Function to translate text with parameter support
  const translate = (key: string, params?: Record<string, any>): string => {
    let text = translations[language][key] || key;
    
    // If parameters are provided, replace placeholders
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        text = text.replace(`{${paramKey}}`, paramValue.toString());
      });
    }
    
    return text;
  };
  
  useEffect(() => {
    // Save language preference to localStorage when it changes
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
    
    // Apply RTL direction class to the body when language changes
    if (language === 'ar') {
      document.documentElement.lang = 'ar';
      document.documentElement.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
  }, [language]);
  
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'en' ? 'ar' : 'en');
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 