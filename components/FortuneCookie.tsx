import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface FortuneCookieProps {
  setCursorVariant?: (variant: string) => void;
}

const FortuneCookie: React.FC<FortuneCookieProps> = ({ setCursorVariant }) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [fortune, setFortune] = useState('');
  const [displayFortune, setDisplayFortune] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [cookieRotation, setCookieRotation] = useState(0);
  const [bounce, setBounce] = useState(false);
  const [emojis, setEmojis] = useState<string[]>([]);
  const [crumbs, setCrumbs] = useState<{x: number, y: number, size: number, delay: number}[]>([]);
  const [shake, setShake] = useState(false);

  // Collection of fortunes in both languages
  const fortunes = {
    en: [
      "Your next project will be a great success. Trust your inner 10x developer!",
      "A new coding opportunity awaits you this month. No, it's not another todo list app.",
      "Your debugging skills will soon be tested by a bug hiding in a semicolon.",
      "An unexpected collaboration will lead to innovation... and perhaps pizza.",
      "The bug you've been hunting is in the code you never thought to check. It's always in the last place you look.",
      "Your code today will impress someone important. Don't forget to remove the console.logs.",
      "A creative solution is just around the corner. So is coffee. Coincidence?",
      "The path to clean code begins with a single refactor and ends with 'it works on my machine'.",
      "Your persistence will pay off with an elegant solution that no one else will understand.",
      "A new technology you learn this year will change your career path. Until it becomes deprecated next year.",
      "Code written with passion today is legacy code you'll curse tomorrow.",
      "The project you've been avoiding will bring unexpected joy... and unexpected merge conflicts.",
      "A mentor will appear when you need guidance most. They will introduce you to Stack Overflow.",
      "Your next pull request will be approved without changes. (This fortune has a 0.01% chance of being accurate)",
      "Your ability to explain complex concepts will open new doors. Your ability to type with your eyes closed will impress no one.",
      "A seemingly impossible bug will have a simple fix. Just turn it off and on again.",
      "Take a break soon - your best ideas come when resting. Your worst bugs too, unfortunately.",
      "Your next side project will attract positive attention. And also feature requests you'll never complete.",
      "Help someone with their code today and both will benefit. Mostly them.",
      "Your attention to detail will prevent a future crisis. Your tendency to procrastinate may cause one."
    ],
    ar: [
      "مشروعك القادم سيكون ناجحًا للغاية. ثق بمطور العشرة أضعاف بداخلك!",
      "فرصة برمجية جديدة تنتظرك هذا الشهر. لا، ليست تطبيق قائمة مهام آخر.",
      "سيتم اختبار مهاراتك في إصلاح الأخطاء قريبًا بواسطة خطأ مختبئ في فاصلة منقوطة.",
      "تعاون غير متوقع سيؤدي إلى الابتكار... وربما البيتزا.",
      "الخطأ الذي تبحث عنه موجود في الكود الذي لم تفكر في التحقق منه أبدًا. إنه دائمًا في آخر مكان تنظر إليه.",
      "الكود الذي تكتبه اليوم سيثير إعجاب شخص مهم. لا تنس إزالة سجلات وحدة التحكم.",
      "الحل الإبداعي على بعد خطوة واحدة. كذلك القهوة. هل هي صدفة؟",
      "طريق الشيفرة النظيفة يبدأ بإعادة هيكلة واحدة وينتهي بـ 'يعمل على جهازي'.",
      "مثابرتك ستؤتي ثمارها بحل أنيق لن يفهمه أحد آخر.",
      "تقنية جديدة تتعلمها هذا العام ستغير مسار حياتك المهنية. حتى تصبح قديمة العام المقبل.",
      "الشيفرة المكتوبة بشغف اليوم هي شيفرة قديمة ستلعنها غدًا.",
      "المشروع الذي كنت تتجنبه سيجلب لك سعادة غير متوقعة... وتعارضات دمج غير متوقعة.",
      "سيظهر مرشد عندما تحتاج إلى التوجيه. سيعرفك على Stack Overflow.",
      "طلب السحب التالي الخاص بك سيتم الموافقة عليه بدون تغييرات. (هذا التنبؤ لديه فرصة 0.01٪ ليكون دقيقًا)",
      "قدرتك على شرح المفاهيم المعقدة ستفتح أبوابًا جديدة. قدرتك على الكتابة وعيناك مغلقتان لن تثير إعجاب أحد.",
      "خطأ يبدو مستحيل الحل سيكون له حل بسيط. فقط أطفئه وأعد تشغيله.",
      "خذ استراحة قريبًا - أفضل أفكارك تأتي عند الراحة. وللأسف أسوأ الأخطاء أيضًا.",
      "مشروعك الجانبي القادم سيجذب انتباهًا إيجابيًا. وأيضًا طلبات ميزات لن تكملها أبدًا.",
      "ساعد شخصًا في كوده اليوم وسيستفيد كلاكما. معظمهم هم.",
      "اهتمامك بالتفاصيل سيمنع أزمة مستقبلية. ميلك إلى التسويف قد يسبب واحدة."
    ]
  };

  // Reset fortune when language changes
  useEffect(() => {
    setIsOpen(false);
    setFortune('');
    setDisplayFortune('');
    setCharIndex(0);
    setIsRevealing(false);
    setCookieRotation(0);
    setBounce(false);
    setEmojis([]);
    setCrumbs([]);
    setShake(false);
  }, [language]);

  // Type writer effect for the fortune
  useEffect(() => {
    if (isRevealing && charIndex < fortune.length) {
      const timer = setTimeout(() => {
        setDisplayFortune(fortune.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        
        // Randomly add emoji burst on certain characters
        if (charIndex % 20 === 0 && charIndex > 0) {
          addEmoji();
        }
      }, 40); // Speed of typing
      return () => clearTimeout(timer);
    }
  }, [charIndex, fortune, isRevealing]);

  // Remove emojis after they animate
  useEffect(() => {
    if (emojis.length > 0) {
      const timer = setTimeout(() => {
        setEmojis([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [emojis]);

  const cookieEmojis = ["🍪", "🔮", "✨", "🧙‍♂️", "🤖", "💻", "🚀", "🔥", "💡", "🎮", "🧠", "🔍", "🎯", "🏆", "💎", "⚡", "💫", "🌟"];
  
  const addEmoji = () => {
    const newEmojis = [];
    for (let i = 0; i < 12; i++) {
      const randomEmoji = cookieEmojis[Math.floor(Math.random() * cookieEmojis.length)];
      newEmojis.push(randomEmoji);
    }
    setEmojis(newEmojis);
  };

  const generateCrumbs = () => {
    const newCrumbs = [];
    for (let i = 0; i < 30; i++) {
      newCrumbs.push({
        x: (Math.random() * 300 - 150) * (Math.random() > 0.5 ? 1 : -1),
        y: (Math.random() * 300 - 150) * (Math.random() > 0.5 ? 1 : -1),
        size: Math.random() * 5 + 1,
        delay: Math.random() * 0.3
      });
    }
    setCrumbs(newCrumbs);
    
    // Clear crumbs after animation
    setTimeout(() => {
      setCrumbs([]);
    }, 1500);
  };

  const handleClick = () => {
    // Apply shake animation
    setShake(true);
    setTimeout(() => setShake(false), 600);
    
    // Generate random rotation for cookie
    const newRotation = Math.random() * 60 - 30;
    setCookieRotation(newRotation);
    
    if (isOpen) {
      // Close the cookie
      setIsOpen(false);
      setIsRevealing(false);
      setDisplayFortune('');
      setCharIndex(0);
      setBounce(true);
      // Add subtle bounce effect on close
      setTimeout(() => setBounce(false), 600);
      
      // Add a small emoji burst when closing
      addEmoji();
    } else {
      // Open the cookie and select random fortune
      const currentLanguageFortunes = fortunes[language as keyof typeof fortunes];
      const randomIndex = Math.floor(Math.random() * currentLanguageFortunes.length);
      setFortune(currentLanguageFortunes[randomIndex]);
      setIsOpen(true);
      setBounce(true);
      
      // More dramatic bounce on open
      setTimeout(() => setBounce(false), 600);
      
      // Add emoji burst
      addEmoji();
      
      // Generate cookie crumbs
      generateCrumbs();
      
      setTimeout(() => {
        setIsRevealing(true);
      }, 800); // Delay before starting to type
    }
  };

  // Generate sparkles for the cookie
  const renderSparkles = () => {
    return Array.from({ length: 12 }).map((_, i) => (
      <div
        key={`sparkle-${i}`}
        className="sparkle"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 4 + 3}px`,
          height: `${Math.random() * 4 + 3}px`,
          animationDelay: `${Math.random() * 3}s`,
          opacity: Math.random() * 0.7 + 0.3
        }}
      />
    ));
  };

  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Background with animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-10 w-60 h-60 bg-gradient-to-r from-amber-200 to-amber-400/40 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-l from-amber-300 to-orange-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-gradient-to-t from-amber-100 to-orange-300/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Animated emoji burst */}
        <AnimatePresence>
          {emojis.map((emoji, index) => (
            <motion.div
              key={`emoji-${index}-${Date.now()}`}
              className="absolute text-3xl"
              initial={{ 
                opacity: 1, 
                scale: 0,
                x: '50%',
                y: '50%',
                top: '50%',
                left: '50%',
              }}
              animate={{ 
                opacity: 0,
                scale: 3,
                x: `calc(50% + ${Math.random() * 300 - 150}px)`,
                y: `calc(50% + ${Math.random() * 300 - 150}px)`,
                rotate: Math.random() * 360
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {emoji}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Cookie crumbs */}
        <AnimatePresence>
          {crumbs.map((crumb, index) => (
            <motion.div
              key={`crumb-${index}`}
              className="cookie-crumb"
              style={{ 
                '--tx': `${crumb.x}px`, 
                '--ty': `${crumb.y}px`, 
                '--r': `${Math.random() * 360}deg`,
                width: `${crumb.size}px`,
                height: `${crumb.size}px`,
                top: '50%',
                left: '50%',
                backgroundColor: [
                  'rgba(180, 83, 9, 0.8)',
                  'rgba(217, 119, 6, 0.7)',
                  'rgba(245, 158, 11, 0.6)'
                ][Math.floor(Math.random() * 3)],
                borderRadius: Math.random() > 0.7 ? '50%' : '2px'
              } as React.CSSProperties}
              initial={{ 
                opacity: 1, 
                x: 0, 
                y: 0, 
                rotate: 0,
                scale: 1
              }}
              animate={{ 
                opacity: 0, 
                x: crumb.x, 
                y: crumb.y,
                rotate: Math.random() * 360,
                scale: Math.random() * 0.5 + 0.5
              }}
              transition={{ 
                duration: 0.8, 
                delay: crumb.delay,
                ease: 'easeOut' 
              }}
            />
          ))}
        </AnimatePresence>
        
        {/* Confetti effect when opened */}
        <AnimatePresence>
          {isOpen && (
            <>
              {Array.from({ length: 40 }).map((_, i) => (
                <motion.div
                  key={`confetti-${i}`}
                  className="confetti"
                  style={{
                    width: `${Math.random() * 8 + 5}px`,
                    height: `${Math.random() * 8 + 5}px`,
                    backgroundColor: [
                      '#FCD34D', '#F59E0B', '#FBBF24', 
                      '#D97706', '#F43F5E', '#10B981', 
                      '#60A5FA', '#8B5CF6'
                    ][Math.floor(Math.random() * 8)],
                    top: '50%',
                    left: `${Math.random() * 80 + 10}%`,
                    borderRadius: Math.random() > 0.5 ? '50%' : 
                                  Math.random() > 0.5 ? '4px' : '0',
                    opacity: Math.random() * 0.8 + 0.2,
                    zIndex: 20
                  }}
                  initial={{ y: 0, rotate: 0, opacity: 1, scale: 0 }}
                  animate={{ 
                    y: 300 + Math.random() * 200, 
                    rotate: Math.random() * 720 - 360,
                    opacity: 0,
                    scale: Math.random() * 2 + 1
                  }}
                  transition={{ 
                    duration: 1.5 + Math.random(),
                    delay: Math.random() * 0.3,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center mb-8">
        <motion.h2 
          className="text-3xl font-bold section-heading inline-block mb-2 animate-pulse-slow"
          whileHover={{ scale: 1.03 }}
        >
          {t('fortune.title')}
        </motion.h2>
        <motion.p 
          className="text-text/80 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          {t('fortune.subtitle')}
        </motion.p>
      </div>

      {/* 3D scene wrapper */}
      <div className="flex justify-center my-10 relative perspective">
        <motion.div
          className={`relative cursor-pointer animate-float preserve-3d ${shake ? 'shake-cookie' : ''}`}
          whileHover={{ scale: 1.05, rotateY: cookieRotation/2 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            y: bounce ? [0, -15, 0] : 0,
            rotateY: cookieRotation
          }}
          transition={{ 
            y: { type: 'spring', stiffness: 300, damping: 10 }, 
            rotateY: { type: 'spring', stiffness: 100, damping: 10 }
          }}
          onClick={handleClick}
          onMouseEnter={() => setCursorVariant && setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant && setCursorVariant('default')}
        >
          {/* Main cookie container - replace with mystical fortune element */}
          <motion.div
            className={`w-80 h-56 rounded-3xl flex items-center justify-center relative overflow-hidden mystical-fortune preserve-3d ${isOpen ? 'fortune-open' : ''}`}
            animate={isOpen ? { 
              scale: 1.2,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              rotateX: 5
            } : { 
              scale: 1,
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              rotateX: 0
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            {/* Mystical layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/90 via-amber-300/80 to-amber-400/90 rounded-3xl transform -translate-z-1"></div>
            <div className="absolute inset-1 bg-gradient-to-tr from-amber-100/90 via-amber-200/80 to-amber-300/70 rounded-3xl transform -translate-z-0.5 border border-white/30"></div>
            
            {/* Animated energy ribbon */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={`ribbon-${i}`}
                  className="absolute inset-x-0 h-12 bg-gradient-to-r from-amber-100/30 via-amber-300/50 to-amber-100/30"
                  style={{ top: `${25 + i * 25}%` }}
                  animate={{
                    x: ['-100%', '100%']
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 5 + i * 2,
                    ease: 'linear',
                    repeatType: 'loop'
                  }}
                />
              ))}
            </div>
          
            {/* Sparkles */}
            {renderSparkles()}
            
            {/* Mystical symbols instead of cookie texture */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div 
                  key={`symbol-${i}`}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 80 + 10}%`, 
                    left: `${Math.random() * 80 + 10}%`,
                    opacity: 0.2 + Math.random() * 0.4,
                    color: 'rgba(180, 83, 9, 0.6)'
                  }}
                  initial={{ scale: 0.8, rotate: 0 }}
                  animate={{ 
                    scale: isOpen ? [0.8, 1.1, 0.9] : [0.8, 1, 0.8], 
                    rotate: Math.random() > 0.5 ? [0, 360] : [0, -360]
                  }}
                  transition={{ 
                    scale: {
                      repeat: Infinity, 
                      duration: 3 + Math.random() * 2,
                      repeatType: 'reverse'
                    },
                    rotate: {
                      repeat: Infinity,
                      duration: 20 + Math.random() * 10,
                      ease: 'linear'
                    }
                  }}
                >
                  {['✧', '✦', '⋆', '⊹', '✴', '✳', '∗', '★', '☆', '✯', '✩'][Math.floor(Math.random() * 11)]}
                </motion.div>
              ))}
            </div>

            {/* Top mystical portal */}
            <motion.div 
              className="portal top absolute inset-0 top-0 h-1/2 overflow-hidden rounded-t-3xl"
              style={{
                backgroundImage: 'linear-gradient(to bottom, rgba(251, 191, 36, 0.7), rgba(245, 158, 11, 0.6))',
                boxShadow: isOpen ? '0 -5px 15px rgba(0,0,0,0.1) inset' : 'none',
                transformStyle: 'preserve-3d'
              }}
              animate={isOpen ? { 
                rotateX: 60, 
                y: -30,
                opacity: 0.8,
                z: 10
              } : { 
                rotateX: 0, 
                y: 0,
                opacity: 1,
                z: 0
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              {/* Mystical runes for top half */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-200/40 to-amber-400/30"
                  animate={{
                    rotate: [0, 360],
                    scale: isOpen ? [1, 0.8] : [0.9, 1.1]
                  }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 20,
                      ease: 'linear'
                    },
                    scale: {
                      repeat: Infinity,
                      duration: 4,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }
                  }}
                >
                  {/* Inner circle with symbols */}
                  <motion.div
                    className="absolute inset-4 rounded-full border border-amber-600/20 flex items-center justify-center"
                    animate={{ rotate: [360, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 25,
                      ease: 'linear'
                    }}
                  >
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.div
                        key={`rune-top-${i}`}
                        className="absolute text-amber-800/40 text-xs"
                        style={{
                          transform: `rotate(${i * 45}deg) translateY(-30px)`
                        }}
                      >
                        {['✧', '⋆', '✴', '∗', '★', '☆', '✯'][i % 7]}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Bottom mystical portal */}
            <motion.div 
              className="portal bottom absolute inset-0 bottom-0 h-1/2 top-1/2 overflow-hidden rounded-b-3xl"
              style={{
                backgroundImage: 'linear-gradient(to top, rgba(217, 119, 6, 0.7), rgba(251, 191, 36, 0.6))',
                boxShadow: isOpen ? '0 5px 15px rgba(0,0,0,0.1) inset' : 'none',
                transformStyle: 'preserve-3d'
              }}
              animate={isOpen ? { 
                rotateX: -60, 
                y: 30,
                opacity: 0.8,
                z: 10
              } : { 
                rotateX: 0, 
                y: 0,
                opacity: 1,
                z: 0
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              {/* Mystical runes for bottom half */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <motion.div
                  className="w-40 h-40 rounded-full bg-gradient-to-tl from-amber-500/30 to-amber-300/40"
                  animate={{
                    rotate: [360, 0],
                    scale: isOpen ? [1, 0.8] : [0.9, 1.1]
                  }}
                  transition={{
                    rotate: {
                      repeat: Infinity,
                      duration: 15,
                      ease: 'linear'
                    },
                    scale: {
                      repeat: Infinity,
                      duration: 3,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }
                  }}
                >
                  {/* Inner circle with symbols */}
                  <motion.div
                    className="absolute inset-4 rounded-full border border-amber-700/20 flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      repeat: Infinity,
                      duration: 20,
                      ease: 'linear'
                    }}
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <motion.div
                        key={`rune-bottom-${i}`}
                        className="absolute text-amber-900/40 text-xs"
                        style={{
                          transform: `rotate(${i * 60}deg) translateY(-30px)`
                        }}
                      >
                        {['✦', '⊹', '✳', '★', '✩', '✯'][i % 6]}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Cookie front message */}
            {!isOpen && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: isOpen ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center px-8 py-6 bg-gradient-to-br from-amber-100/90 to-amber-300/80 backdrop-blur-sm rounded-3xl shadow-inner border-2 border-amber-200/50">
                  <motion.div 
                    className="text-amber-800 text-lg font-medium"
                    initial={{ y: 0 }}
                    animate={{ y: [0, -3, 0] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      repeatType: 'loop',
                      ease: "easeInOut"
                    }}
                  >
                    {t('fortune.clickToOpen')}
                  </motion.div>
                  <div className="mt-2 flex justify-center gap-2">
                    {['✨', '🔮', '✨'].map((emoji, i) => (
                      <motion.span 
                        key={`hint-emoji-${i}`}
                        className="inline-block" 
                        initial={{ scale: 1 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, i % 2 === 0 ? 5 : -5, 0],
                          y: [0, -2, 0]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5, 
                          delay: i * 0.3,
                          repeatType: 'loop',
                          ease: "easeInOut"
                        }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Fortune paper - same as before */}
            <AnimatePresence>
              {isOpen && (
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center z-20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    className="paper-bg paper-scroll rainbow-edge relative w-5/6 h-4/5 flex items-center justify-center rounded-lg overflow-hidden p-4 shadow-lg paper-tear"
                    initial={{ y: 20, opacity: 0, rotateX: 30 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: 'translateZ(20px)'
                    }}
                  >
                    <div className="absolute -inset-0.5 bg-white/40 backdrop-blur-sm rounded-lg z-[-1]"></div>
                    
                    {/* Fortune quote - with mystical symbols around it */}
                    <div className="relative w-full h-full flex items-center justify-center">
                      <motion.div 
                        className="text-center italic text-md text-gray-700 font-medium overflow-hidden max-w-[250px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-amber-500 text-2xl">✦</span>
                        <span>{displayFortune}</span>
                        <span className={charIndex >= fortune.length ? 'opacity-100 text-amber-500 text-2xl' : 'opacity-0'}>✦</span>
                        {charIndex < fortune.length && (
                          <span className="inline-block w-1 h-4 bg-amber-500 ml-1 animate-blink"></span>
                        )}
                      </motion.div>
                      
                      {/* Decorative corners */}
                      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
                        <motion.div
                          key={`corner-${i}`}
                          className={`absolute ${
                            corner === 'top-left' ? 'top-1 left-1' :
                            corner === 'top-right' ? 'top-1 right-1' :
                            corner === 'bottom-left' ? 'bottom-1 left-1' :
                            'bottom-1 right-1'
                          } text-amber-600/60 text-xs`}
                          animate={{ 
                            rotate: i % 2 === 0 ? [0, 360] : [0, -360],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            rotate: {
                              repeat: Infinity,
                              duration: 15,
                              ease: 'linear'
                            },
                            scale: {
                              repeat: Infinity,
                              duration: 2,
                              repeatType: 'reverse',
                              ease: 'easeInOut'
                            }
                          }}
                        >
                          ✧
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Energy lines instead of cookie crack */}
            <motion.div 
              className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-amber-100/0 via-amber-500/60 to-amber-100/0 z-10"
              animate={{ 
                scaleX: isOpen ? [1, 1.2, 1.1] : 1, 
                opacity: isOpen ? [0.4, 0.8, 0.6] : 0.4,
                y: isOpen ? [0, 2, 1] : 0
              }}
              transition={{ 
                duration: 0.8, 
                times: [0, 0.5, 1],
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-amber-100/0 via-amber-500/60 to-amber-100/0 z-10"
              animate={{ 
                scaleY: isOpen ? [1, 1.2, 1.1] : 1, 
                opacity: isOpen ? [0.4, 0.8, 0.6] : 0.4,
                x: isOpen ? [0, 2, 1] : 0
              }}
              transition={{ 
                duration: 0.8, 
                times: [0, 0.5, 1],
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          
          {/* Light reflection effect */}
          <div className="absolute inset-0 rounded-[40%] opacity-20 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none"></div>
        </motion.div>
      </div>

      {/* Button with updated text and style */}
      <div className="text-center mt-8">
        <motion.button
          className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl relative overflow-hidden group"
          onClick={handleClick}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95, y: 2 }}
          onMouseEnter={() => setCursorVariant && setCursorVariant('button')}
          onMouseLeave={() => setCursorVariant && setCursorVariant('default')}
        >
          {/* Magical shimmer effect */}
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full"
            animate={{ translateX: ["0%", "200%"] }}
            transition={{ 
              repeat: Infinity, 
              duration: 2, 
              ease: "easeInOut", 
              repeatDelay: 1
            }}
          />
          
          {/* Button text with icons */}
          <span className="flex items-center justify-center gap-2">
            <span className="text-sm">
              {isOpen ? "✧" : "✦"}
            </span>
            <span>
              {isOpen ? t('fortune.revealAnother') : t('fortune.revealDestiny')}
            </span>
            <span className="text-sm">
              {isOpen ? "✧" : "✦"}
            </span>
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export default FortuneCookie; 