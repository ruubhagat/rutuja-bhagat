"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

import Image from "next/image"; 

import { 
  Github, Linkedin, Mail, ArrowUpRight, Code2, Globe, Cpu, 
  Database, MapPin, Award, BookOpen, Instagram, FolderGit2, 
  Menu, X, Building2, GraduationCap 
} from "lucide-react";
import { Cormorant_Garamond } from "next/font/google"; 

// Luxury Font (Used for Headings & Name only)
const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

// --- ANIMATIONS ---
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

// --- TYPES ---
interface NavLinkProps { href: string; children: React.ReactNode; onClick?: () => void; }
interface SectionTitleProps { title: string; }
interface LanguageItemProps { lang: string; level: string; }
interface ContactDetailProps { icon: React.ReactNode; text: string; href?: string; }
interface SkillColumnProps { icon: React.ReactNode; category: string; skills: string[]; }
interface ProjectCardProps { title: string; subtitle: string; stack: string[]; desc: string; github: string; font: string; date?: string; }
interface HonorItemProps { title: string; issuer: string; }
interface CertificationLinkProps { title: string; issuer: string; href: string; }
// UPDATED: Added 'name' prop for form handling
interface AnimatedInputProps { label: string; placeholder: string; isTextArea?: boolean; font: string; name?: string; } 
interface SocialIconProps { icon: React.ReactNode; href: string; }
interface TimelineItemProps { year: string; degree: string; major: string; institution: string; location: string; logoSrc: string; font: string; }
interface ExperienceTimelineItemProps { role: string; company: string; location: string; date: string; desc: string; tags: string[]; logoSrc: string; font: string; }

// --- MENU ANIMATION ---
const menuVariants: Variants = {
  closed: { opacity: 0, x: "100%" },
  open: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
};


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // ADDED: Form Status State
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // ADDED: Form Submit Logic
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/xeoyrpga", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setFormStatus("success");
        (e.target as HTMLFormElement).reset(); 
        setTimeout(() => setFormStatus("idle"), 5000); 
      } else {
        setFormStatus("error");
      }
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <main className={`min-h-screen font-sans overflow-x-hidden selection:bg-[#BFDBFE] selection:text-black`}>
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-white">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#E0F2FE] rounded-full blur-[120px] opacity-40"
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#E0F2FE] rounded-full blur-[100px] opacity-40"
        />
      </div>

      {/* 1. NAVBAR */}
      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-50 bg-white/80 backdrop-blur-md">
        {/* LOGO */}
        <div className={`text-3xl font-bold tracking-wide text-black ${cormorant.className}`}>
          ruu.
        </div>
        
        <div className="hidden md:flex gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-500">
          <NavLink href="#about">About</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#contact">Contact</NavLink>
          <a href="/resume.pdf" target="_blank" className="flex items-center gap-1 text-black border-b border-black pb-0.5 hover:opacity-60 transition-opacity">
            Resume <ArrowUpRight size={10} />
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden text-black p-2" onClick={toggleMenu} aria-label="Toggle Menu">
          <Menu size={24} />
        </button>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button className="absolute top-6 right-6 text-black p-2" onClick={toggleMenu}>
              <X size={28} />
            </button>
            <div className="flex flex-col gap-8 text-center text-xl font-bold tracking-widest uppercase text-gray-800">
              <NavLink href="#about" onClick={toggleMenu}>About</NavLink>
              <NavLink href="#experience" onClick={toggleMenu}>Experience</NavLink>
              <NavLink href="#projects" onClick={toggleMenu}>Projects</NavLink>
              <NavLink href="#skills" onClick={toggleMenu}>Skills</NavLink>
              <NavLink href="#contact" onClick={toggleMenu}>Contact</NavLink>
              <a href="/resume.pdf" target="_blank" className="text-[#93C5FD]" onClick={toggleMenu}>Resume</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-16 flex flex-col items-center justify-center text-center px-4 relative min-h-screen">
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base font-medium tracking-widest uppercase text-gray-400 mb-6"
        >
          Hola, I'm
        </motion.p>

        {/* NAME */}
        <motion.h1 
          className={`text-7xl md:text-9xl text-black mb-8 z-10 leading-none ${cormorant.className}`}
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          style={{ fontWeight: 300 }}
        >
          {Array.from("Rutuja Bhagat").map((letter, i) => (
            <motion.span key={i} variants={letterAnimation} className="inline-block">
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.h1>

        {/* ROLE TITLE */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm md:text-lg font-light text-gray-600 max-w-lg mb-12 leading-relaxed"
        >
          Software Developer • Cloud Enthusiast<br />
          Incoming Intern at <span className="font-medium text-black underline decoration-[#BFDBFE] decoration-2 underline-offset-4">PriceWaterhouseCoopers (PwC)</span>
        </motion.p>

        {/* ARCH WITH PROFILE PICTURE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="relative w-full max-w-sm h-[400px]"
        >
          <div className="absolute inset-0 bg-[#D1E9F6] rounded-t-[500px] overflow-hidden shadow-sm flex flex-col items-center justify-end group">
            <div className="absolute inset-0 z-0">
               <Image 
                 src="/profile.jpg" 
                 alt="Rutuja Bhagat" 
                 fill
                 className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                 onError={(e) => { e.currentTarget.style.display = 'none'; }}
               />
            </div>
            {/* Social Icons */}
            <div className="z-10 mb-8 flex gap-4 p-2 bg-white/40 backdrop-blur-md rounded-full shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <SocialIcon icon={<Github size={20} />} href="https://github.com/ruubhagat" />
              <SocialIcon icon={<Linkedin size={20} />} href="https://linkedin.com/in/ru-bhagat" />
              <SocialIcon icon={<Mail size={20} />} href="mailto:rutuja.bhagat.developer@gmail.com" />
              <SocialIcon icon={<BookOpen size={20} />} href="https://medium.com/@rutujaaa" /> 
              <SocialIcon icon={<Instagram size={20} />} href="https://www.instagram.com/ruu.bhagat/" />
            </div>
          </div>
        </motion.div>
      </section>

{/* 3. ABOUT & EDUCATION */}
      <section id="about" className="py-20 px-6 md:px-20 max-w-6xl mx-auto">
        <SectionTitle title="About Me" />
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Summary & Languages */}
          <div className="space-y-8">
            <motion.div variants={fadeInUp} className={`text-xl md:text-2xl text-gray-800 leading-relaxed font-light ${cormorant.className}`}>
              "Greetings! I'm Rutuja, a passionate Software Developer with a strong focus on building secure, scalable, and cloud-native applications. My expertise lies in backend architecture, full-stack development, and cloud infrastructure."
            </motion.div>
            <motion.p variants={fadeInUp} className="text-gray-500 font-light leading-relaxed">
              I actively explore cybersecurity principles to design resilient systems and enjoy solving real-world problems through clean, efficient code. I thrive in fast-paced environments where innovation, security, and performance come together.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-6">
              <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6">Languages and Proficiency</h4>
              <div className="grid grid-cols-2 gap-4">
                <LanguageItem lang="English" level="Full Professional" />
                <LanguageItem lang="Hindi" level="Full Professional" />
                <LanguageItem lang="Marathi" level="Native / Bilingual" />
                <LanguageItem lang="Kannada" level="Limited Working" />
              </div>
            </motion.div>
          </div>
          
          {/* EDUCATION TIMELINE WITH LOGOS */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-8 flex items-center gap-2">
              <Award size={14} className="text-[#93C5FD]" />
              Academic Journey
            </h4>
            
            {/* Connected Vertical Line Container */}
            <div className="relative border-l-2 border-dashed border-gray-200 ml-5 space-y-12 pb-2">
              <LogoTimelineItem 
                year="2023 — 2026"
                degree="Bachelor of Technology"
                major="Computer Science and Engineering"
                institution="PES University"
                location="Bengaluru, Karnataka, India"
                logoSrc="/pes.png"
                font={cormorant.className}
              />
              <LogoTimelineItem 
                year="2020 — 2023"
                degree="Diploma in Engineering"
                major="Computer Engineering"
                institution="Mumbai Educational Trust, Institute of Technology"
                location="Nashik, Maharashtra, India"
                logoSrc="/metlogo.png"
                font={cormorant.className}
              />
              <LogoTimelineItem 
                year="2009 — 2020"
                degree="Primary and Secondary Education"
                major="MSBSHSE Board"
                institution="St. Xavier's High School"
                location="Shrirampur, Maharashtra, India"
                logoSrc="/schoollogo.png"
                font={cormorant.className}
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

{/* 4. EXPERIENCE WITH LOGOS & CONTINUOUS TIMELINE */}
      <section id="experience" className="py-20 px-6 md:px-20 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto">
          <SectionTitle title="Experience" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="relative border-l-2 border-blue-100 ml-4 md:ml-6 space-y-16 pb-4"
          >
            {/* 1. INCOMING INTERN */}
            <motion.div variants={fadeInUp}>
              <ExperienceTimelineItem 
                role="Incoming Intern"
                company="PwC Acceleration Center India"
                location="Bengaluru, Karnataka"
                date="Feb 2026 - Aug 2026"
                desc="Selected for a highly competitive internship program focusing on enterprise-grade cloud, security, and scalable software solutions. Will be contributing to real-world client projects involving cloud security architecture and automation workflows."
                tags={["Cybersecurity", "Cloud Solutions", "Generative AI"]}
                logoSrc="/pwc.png"
                font={cormorant.className}
              />
            </motion.div>

            {/* 2. LAUNCHPAD TRAINEE */}
            <motion.div variants={fadeInUp}>
              <ExperienceTimelineItem 
                role="Launchpad Trainee"
                company="PwC Acceleration Center India"
                location="Bengaluru, Karnataka"
                date="Feb 2025 - July 2025"
                desc="Successfully completed PwC's Launchpad 3.0 program, gaining hands-on exposure to Python, Java, Cybersecurity, PowerShell, and Prompt Engineering. Demonstrated strong problem-solving and technical proficiency through multiple evaluations and practical labs."
                tags={["Python", "Java", "Cybersecurity", "PowerShell", "Prompt Engineering"]}
                logoSrc="/pwc.png"
                font={cormorant.className}
              />
            </motion.div>
            
            {/* 3. CALIBERS INTERN */}
            <motion.div variants={fadeInUp}>
              <ExperienceTimelineItem 
                role="Summer Intern"
                company="Calibers InfoTech"
                location="Nashik, Maharashtra"
                date="July 2022 - Aug 2022"
                desc="Developed responsive and reusable UI components using React.js, improving application usability and performance. Gained real-world exposure to component-based architecture and modern frontend development practices."
                tags={["APIs", "Web Development"]}
                logoSrc="/calibers.jpg"
                font={cormorant.className}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. PROJECTS SECTION (UPDATED: ANIMATED CARDS) */}
      <section id="projects" className="py-20 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionTitle title="Projects" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <ProjectCard 
              title="QueueCTL"
              subtitle="CLI Tool"
              stack={["Python", "CLI", "Queue Management"]}
              desc="Designed a lightweight command-line tool for real-time monitoring and management of message queues, optimizing queue operations and improving observability."
              github="https://github.com/ruubhagat/queuectl"
              font={cormorant.className}
            />

            <ProjectCard 
              title="WebHook Solution"
              subtitle="Event Architecture"
              stack={["Spring Boot", "Java", "REST APIs"]}
              desc="Built a scalable webhook handling system capable of validating, processing, and routing high-volume event data using a fault-tolerant backend architecture."
              github="https://github.com/ruubhagat/WebHook-Solution"
              font={cormorant.className}
            />

            <ProjectCard 
              title="Smart V2X System"
              subtitle="Simulation"
              stack={["SUMO", "OMNeT++", "Veins"]}
              desc="Developing a simulation-driven V2X system to enhance emergency response efficiency and automate toll collection using vehicular communication frameworks."
              github="#"
              font={cormorant.className}
            />

            <ProjectCard 
              title="Real Estate Management"
              subtitle="Full Stack Application"
              stack={["Spring Boot", "React", "MySQL"]}
              desc="Created a role-based property management platform with secure authentication, smooth multi-user operations, and real-time database integration."
              github="https://github.com/ruubhagat/Real-Estate-Management-System"
              font={cormorant.className}
            />

            <ProjectCard 
              title="Serverless Platform"
              subtitle="Cloud Infrastructure"
              stack={["FastAPI", "Docker", "Streamlit", "Cloud Computing"]}
              desc="Engineered a secure serverless execution platform using containerized environments for isolated code execution and real-time monitoring."
              github="https://github.com/ruubhagat/Serverless-platform"
              font={cormorant.className}
            />
          </motion.div>
        </div>
      </section>

      {/* 6. SKILLS & CERTIFICATIONS */}
      <section id="skills" className="py-20 px-6 md:px-20 bg-[#FDFDFD]">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="Technical Arsenal" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <SkillColumn icon={<Code2 size={24} className="text-[#93C5FD] mb-4" />} category="Languages" skills={["Java", "Python", "MySQL", "JavaScript", "HTML/CSS"]} />
            <SkillColumn icon={<Globe size={24} className="text-[#93C5FD] mb-4" />} category="Frameworks" skills={["Spring Boot", "MERN Stack", "RESTful APIs", "FastAPI", "Next.js", "Three.js"]} />
            <SkillColumn icon={<Cpu size={24} className="text-[#93C5FD] mb-4" />} category="Cloud & AI" skills={["Google Cloud Platform (GCP)", "Amazon Web Services (AWS)", "Large Language Models (LLMs)", "Machine Learning", "Generative AI"]} />
            <SkillColumn icon={<Database size={24} className="text-[#93C5FD] mb-4" />} category="Tools" skills={["Jira", "Git/GitHub", "Docker", "VS Code", "Microsoft Suite"]} />
          </div>

          {/* SPLIT SECTION: HONORS & CERTIFICATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-gray-100 pt-16">
             
             {/* LEFT: HONORS & AWARDS */}
             <div>
               <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#93C5FD] mb-8 flex items-center gap-2">
                 <Award size={16} /> Honors & Awards
               </h4>
               <div className="space-y-6">
                 <HonorItem title="DAC Scholarship" issuer="PES University" />
                 <HonorItem title="Certificate of Selection - Round 1 (Quiz Assessment of Sansad: Youth Indian Parliament)" issuer="Indian Institute of Technology, Kharagpur" />
                 <HonorItem title="Healthiathon" issuer="Green Glitch Club, PES University" />
                 <HonorItem title="District Level Elocution Competition Runner-Up" issuer="St. Xavier's High School" />
               </div>
             </div>

             {/* RIGHT: CERTIFICATIONS (Clickable) */}
             <div>
               <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#93C5FD] mb-8 flex items-center gap-2">
                 <Award size={16} /> Certifications
               </h4>
               <div className="flex flex-col">
                 <CertificationLink 
                   title="Google Cloud Arcade Facilitator" 
                   issuer="Google Cloud Skills Boost" 
                   href="https://www.cloudskillsboost.google/public_profiles/1f0a3e1e-5d2c-4ea5-8444-cb579e47181e" 
                 />
                 <CertificationLink 
                   title="AWS Educate Compute" 
                   issuer="Amazon Web Services" 
                   href="https://www.credly.com/badges/adee0971-fd4c-402b-ac7b-9a88f3cfa1f2/public_url" 
                 />
                 <CertificationLink 
                   title="Machine Learning in Python & R" 
                   issuer="Udemy" 
                   href="https://www.udemy.com/certificate/UC-e4151bd2-acf6-4ee1-abab-3b98257844d8/" 
                 />
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-20 px-6 md:px-20 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionTitle title="Get in Touch" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            
            {/* Contact Info Side */}
            <div className="space-y-8">
              <h2 className={`text-5xl md:text-6xl text-black leading-none ${cormorant.className}`}>
                Let's build something <br/> <span className="italic text-[#93C5FD]">extraordinary.</span>
              </h2>
              <p className="text-gray-500 font-light max-w-sm">
                Open for collaborations and opportunities in Software Development & Cloud Engineering.
              </p>
              
              <div className="space-y-6 pt-8">
                 <ContactDetail icon={<MapPin size={18} />} text="Bengaluru, Karnataka, India." />
                 <ContactDetail icon={<Mail size={18} />} text="rutuja.bhagat.developer@gmail.com" href="mailto:rutuja.bhagat.developer@gmail.com" />
                 <ContactDetail icon={<Linkedin size={18} />} text="LinkedIn" href="https://linkedin.com/in/ru-bhagat" />
                 <ContactDetail icon={<BookOpen size={18} />} text="Medium" href="https://rutujaaa.medium.com/" />
                 <ContactDetail icon={<Instagram size={18} />} text="Instagram" href="https://www.instagram.com/ruu.bhagat/" />
              </div>
            </div>

            {/* Form Side with Logic */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-blue-100/50 border border-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E0F2FE] rounded-full blur-[60px] opacity-60 pointer-events-none"></div>
              
              {/* UPDATED: Form Logic with onSubmit and Name Attributes */}
              <form onSubmit={handleFormSubmit} className="space-y-8 relative z-10">
                <AnimatedInput label="Name" name="name" placeholder="Name" font={cormorant.className} />
                <AnimatedInput label="Email" name="email" placeholder="name@example.com" font={cormorant.className} />
                <AnimatedInput label="Message" name="message" placeholder="Hello Rutuja..." isTextArea font={cormorant.className} />
                
                <button type="submit" className="w-full py-4 bg-black text-white rounded-xl uppercase tracking-widest text-xs font-bold hover:bg-[#93C5FD] hover:text-black transition-all duration-300">
                  {formStatus === "success" ? "Message Sent!" : "Send Message"}
                </button>
                {formStatus === "success" && <p className="text-center text-sm text-green-600 mt-2">Thank you! I will get back to you soon.</p>}
                {formStatus === "error" && <p className="text-center text-sm text-red-600 mt-2">Something went wrong. Please try again.</p>}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-[10px] uppercase tracking-widest text-gray-300 border-t border-gray-100">
        © 2025 Rutuja Bhagat • Bengaluru
      </footer>
    </main>
  );
}

// --- SUB-COMPONENTS ---

function NavLink({ href, children, onClick }: NavLinkProps) {
  return (
    <a href={href} onClick={onClick} className="relative group cursor-pointer text-gray-500 hover:text-black transition-colors">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all group-hover:w-full"></span>
    </a>
  );
}

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <motion.h2 initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-xs font-bold tracking-[0.3em] uppercase text-[#93C5FD] mb-12 flex items-center gap-4">
      <span className="w-8 h-[1px] bg-[#93C5FD]"></span>{title}
    </motion.h2>
  );
}

function LanguageItem({ lang, level }: LanguageItemProps) {
  return (
    <div className="flex flex-col">
      <span className="text-base font-serif text-black">{lang}</span>
      <span className="text-[10px] uppercase tracking-wider text-gray-400">{level}</span>
    </div>
  )
}

function ContactDetail({ icon, text, href }: ContactDetailProps) {
  return (
    <div className="flex items-center gap-4 text-gray-600 hover:text-black transition-colors group">
      <span className="p-2 bg-gray-50 rounded-full group-hover:bg-[#E0F2FE] transition-colors text-[#93C5FD] group-hover:text-blue-500">{icon}</span>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-sm font-medium tracking-wide border-b border-transparent hover:border-black transition-all">{text}</a>
      ) : <span className="text-sm font-medium tracking-wide">{text}</span>}
    </div>
  )
}

function SkillColumn({ icon, category, skills }: SkillColumnProps) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {icon}
      <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-gray-800">{category}</h3>
      <ul className="space-y-2">
        {skills.map((skill: string) => <li key={skill} className="text-gray-500 font-light text-sm">{skill}</li>)}
      </ul>
    </div>
  );
}

function ExperienceCard({ role, company, location, date, desc, tags, font }: ExperienceCardProps) {
  return (
    <div className="group grid grid-cols-1 md:grid-cols-4 gap-4 p-6 hover:bg-white hover:shadow-xl hover:shadow-blue-50/50 rounded-2xl transition-all duration-500 cursor-default border border-transparent hover:border-blue-50/30">
      <div className="text-sm text-gray-400 font-mono pt-1">{date}</div>
      <div className="md:col-span-3">
        <h3 className={`text-2xl text-gray-900 group-hover:text-[#60A5FA] transition-colors mb-1 ${font}`}>{company}</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{role}</p>
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-3">
           <MapPin size={12} className="text-[#93C5FD]" /> {location}
        </div>
        <p className="text-gray-600 font-light leading-relaxed mb-4">{desc}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-400 rounded-full group-hover:bg-[#E0F2FE] group-hover:text-blue-500 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- NEW ANIMATED CARD PROJECT COMPONENT ---
function ProjectCard({ title, subtitle, stack, desc, github, font }: ProjectCardProps) {
  return (
    <motion.div 
      variants={fadeInUp}
      whileHover={{ y: -8 }}
      className="group relative bg-white p-8 rounded-3xl border border-gray-100 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-50/50 transition-all duration-300 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-2xl text-gray-900 group-hover:text-[#60A5FA] transition-colors ${font}`}>
              {title}
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">{subtitle}</p>
          </div>
          <a href={github} target="_blank" className="p-2 bg-gray-50 rounded-full group-hover:bg-[#60A5FA] group-hover:text-white transition-colors">
            <ArrowUpRight size={18} />
          </a>
        </div>
        
        <p className="text-gray-600 font-light leading-relaxed text-sm mb-6">{desc}</p>
      </div>

      <div className="flex flex-wrap gap-2 mt-auto">
        {stack.map((tech: string, i: number) => (
          <span key={i} className="px-3 py-1 bg-blue-50 text-[10px] font-bold uppercase tracking-wider text-blue-400 rounded-full">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function SlimTimelineItem({ year, degree, major, institution, location, font }: SlimTimelineItemProps) {
  return (
    <div className="relative pl-8 group">
      <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-[#93C5FD] border-2 border-white ring-1 ring-blue-100 group-hover:scale-125 transition-transform"></span>
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
        <div className="w-[120px] flex-shrink-0">
          <span className="text-sm font-bold tracking-widest text-[#93C5FD] whitespace-nowrap">
            {year}
          </span>
        </div>
        <div className="flex flex-col">
           <h3 className={`text-2xl text-gray-900 leading-none mb-1 group-hover:text-[#60A5FA] transition-colors ${font}`}>
             {degree}
           </h3>
           <p className="text-sm text-gray-500 italic mb-2">{major}</p>
           <div className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-1">
             {institution}
           </div>
           <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
             <MapPin size={10} className="text-[#93C5FD]" /> {location}
           </div>
        </div>
      </div>
    </div>
  )
}

function HonorItem({ title, issuer }: HonorItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-2 h-1.5 w-1.5 rounded-full bg-blue-300"></div>
      <div>
        <h4 className="text-sm font-semibold tracking-wide text-gray-900">{title}</h4>
        <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1">{issuer}</p>
      </div>
    </div>
  )
}

function CertificationLink({ title, issuer, href }: CertificationLinkProps) {
  const isClickable = href && href !== "#";
  const Content = (
    <div className="flex-1">
      <h4 className={`text-sm font-semibold tracking-wide text-gray-800 ${isClickable ? "group-hover:text-blue-500" : ""} transition-colors`}>{title}</h4>
      <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5">{issuer}</p>
    </div>
  );
  if (!isClickable) return <div className="flex items-center justify-between py-4 border-b border-gray-100 px-3 -mx-3">{Content}</div>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-4 border-b border-gray-100 hover:bg-gray-50/50 px-3 -mx-3 rounded-lg transition-all">
       {Content}<ArrowUpRight size={14} className="text-gray-300 group-hover:text-blue-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
    </a>
  )
}

// UPDATED INPUT COMPONENT TO ACCEPT NAME
function AnimatedInput({ label, name, placeholder, isTextArea, font }: AnimatedInputProps) {
  return (
    <div className="relative group">
      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 block">
        {label}
      </label>
      {isTextArea ? (
        <textarea 
          name={name} // Important for Formspree
          required 
          placeholder={placeholder} 
          rows={4} 
          className={`w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xl outline-none resize-none placeholder-gray-300 text-gray-800 transition-all focus:border-blue-300 focus:bg-white ${font}`} 
        />
      ) : (
        <input 
          type="text" 
          name={name} // Important for Formspree
          required 
          placeholder={placeholder} 
          className={`w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xl outline-none placeholder-gray-300 text-gray-800 transition-all focus:border-blue-300 focus:bg-white ${font}`} 
        />
      )}
    </div>
  );
}

function SocialIcon({ icon, href }: SocialIconProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 bg-white rounded-full text-black hover:scale-110 hover:text-blue-400 transition-all shadow-sm"
    >
      {icon}
    </a>
  );
}

// --- NEW COMPONENT: TIMELINE WITH LOGO FOR EDUCATION ---
// Update interface first:
interface TimelineItemProps {
  year: string; degree: string; major: string; institution: string; location: string; logoSrc: string; font: string;
}

function LogoTimelineItem({ year, degree, major, institution, location, logoSrc, font }: TimelineItemProps) {
  return (
    <div className="relative pl-12 group">
      {/* Symbol on line */}
      <div className="absolute -left-[22px] top-0 h-11 w-11 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center overflow-hidden z-10 group-hover:border-[#93C5FD] transition-colors">
        <Image 
          src={logoSrc} 
          alt={institution} 
          width={40} 
          height={40} 
          className="object-cover"
          // Fallback if image fails (shows a building icon)
          onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }} 
        />
        <GraduationCap size={20} className="text-gray-300 hidden" />
      </div>

      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-12">
        <div className="w-[120px] flex-shrink-0">
          <span className="text-sm font-bold tracking-widest text-[#93C5FD] whitespace-nowrap">{year}</span>
        </div>
        <div className="flex flex-col">
           <h3 className={`text-2xl text-gray-900 leading-none mb-1 group-hover:text-[#60A5FA] transition-colors ${font}`}>{degree}</h3>
           <p className="text-sm text-gray-500 italic mb-2">{major}</p>
           <div className="text-xs font-bold tracking-widest uppercase text-gray-600 mb-1">{institution}</div>
           <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
             <MapPin size={10} className="text-[#93C5FD]" /> {location}
           </div>
        </div>
      </div>
    </div>
  )
}
// --- NEW COMPONENT: CONTINUOUS EXPERIENCE TIMELINE WITH LOGOS ---
interface ExperienceTimelineItemProps {
  role: string; company: string; location: string; date: string; desc: string; tags: string[]; logoSrc: string; font: string;
}

function ExperienceTimelineItem({ role, company, location, date, desc, tags, logoSrc, font }: ExperienceTimelineItemProps) {
  return (
    <div className="relative pl-12 md:pl-16 group">
      {/* Logo Node */}
      <div className="absolute -left-[26px] md:-left-[34px] top-0 h-14 w-14 rounded-full bg-white border-4 border-gray-50 shadow-sm flex items-center justify-center overflow-hidden z-10 group-hover:border-blue-100 transition-all">
         <Image 
           src={logoSrc} 
           alt={company} 
           width={56} 
           height={56} 
           className="object-cover"
           onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling?.classList.remove('hidden'); }}
         />
         <Building2 size={24} className="text-gray-300 hidden" />
      </div>

      <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative">
        {/* Date Badge */}
        <span className="inline-block px-3 py-1 bg-blue-50 text-blue-500 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4">
          {date}
        </span>

        <h3 className={`text-3xl text-gray-900 mb-1 group-hover:text-[#60A5FA] transition-colors ${font}`}>{company}</h3>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-2">{role}</p>
        
        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-4">
           <MapPin size={12} className="text-[#93C5FD]" /> {location}
        </div>

        <p className="text-gray-600 font-light leading-relaxed mb-6 border-l-2 border-gray-100 pl-4">
          {desc}
        </p>

        <div className="flex gap-2 flex-wrap">
          {tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-gray-50 text-[10px] uppercase tracking-wider text-gray-500 rounded-full group-hover:bg-[#E0F2FE] group-hover:text-blue-600 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}