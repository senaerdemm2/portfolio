"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Database,
  BarChart3,
  Code2,
  FileSpreadsheet,
  Brain,
  TrendingUp,
  Github,
  Linkedin,
  Mail,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Award,
  Target,
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = ["Tech Stack", "About", "Experience", "Skills", "Projects", "Certifications", "Contact"] as const;

const TECH_STACK = [
  { name: "Python", icon: "🐍", category: "Language" },
  { name: "SQL", icon: "🗃️", category: "Language" },
  { name: "DAX", icon: "📊", category: "Language" },
  { name: "Power BI", icon: "📈", category: "Visualization" },
  { name: "Excel", icon: "📗", category: "Tool" },
  { name: "Pandas", icon: "🐻", category: "Library" },
  { name: "NumPy", icon: "🔢", category: "Library" },
  { name: "SciPy", icon: "🔬", category: "Library" },
  { name: "Scikit-Learn", icon: "🤖", category: "Library" },
  { name: "Matplotlib", icon: "📉", category: "Visualization" },
  { name: "Seaborn", icon: "🎨", category: "Visualization" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "SQL Server", icon: "🗄️", category: "Database" },
  { name: "Power Query", icon: "🔄", category: "Tool" },
  { name: "Git", icon: "📦", category: "Tool" },
];

const SKILL_CATEGORIES = [
  {
    title: "Programming & Query Languages",
    skills: [
      { name: "Python (Pandas, NumPy, SciPy, Scikit-Learn)", level: 90 },
      { name: "SQL (PostgreSQL, SQL Server)", level: 92 },
      { name: "DAX (Power BI)", level: 80 },
    ],
  },
  {
    title: "Data Visualization & BI",
    skills: [
      { name: "Power BI", level: 88 },
      { name: "Excel (Pivot Tables, Power Query, VBA)", level: 85 },
      { name: "Matplotlib / Seaborn", level: 82 },
    ],
  },
  {
    title: "Analytics & Methods",
    skills: [
      { name: "Statistical Analysis & Hypothesis Testing", level: 85 },
      { name: "Exploratory Data Analysis (EDA)", level: 90 },
      { name: "KPI Analysis & Business Intelligence", level: 84 },
    ],
  },
];

const PROJECTS = [
    {
    title: "IT Support Ticket Analysis — Automated Dashboard",
    description:
      "Analyzed IT support tickets using SQL and built an automated weekly dashboard report with Power BI and Power Automate. Turned raw ticket data into actionable insights for the support team.",
    tech: ["SQL", "Power BI", "Power Automate"],
    highlights: ["Automated weekly reporting", "SQL analysis", "Power BI dashboard"],
    github: "https://github.com/senaerdemm2/it-support-ticket-analysis",
    icon: Target,
    color: "from-emerald-500/20 to-teal-500/20",
    images: ["/dashboards/it_support_ticket_dashboard.png"],
  },
  {
    title: "Student Support Programs — What Actually Works?",
    description:
      "Analyzed 1,000 student records across 16 behavioral features. Ran 9 statistical hypothesis tests (SciPy) and built a predictive model (Scikit-Learn, R² = 0.897) to quantify what drives exam scores. Delivered findings through an interactive Power BI dashboard.",
    tech: ["Python", "Pandas", "SciPy", "Scikit-Learn", "Power BI"],
    highlights: ["R² = 0.897 predictive model", "9 hypothesis tests", "Interactive Power BI dashboard"],
    github: "https://github.com/senaerdemm2/student-habits-academic-performance-analysis_",
    icon: Target,
    color: "from-emerald-500/20 to-teal-500/20",
    images: ["/dashboards/student_dashboard.png"],
  },
  {
    title: "Olist E-Commerce Dashboard — SQL + Power BI",
    description:
      "Analyzed ~99K orders and BRL 15.4M in revenue from the Brazilian Olist marketplace (2016-2018). Built a 2-page executive dashboard answering 6 concrete business questions covering geographic concentration, customer retention, delivery SLA, and seasonal trends.",
    tech: ["PostgreSQL", "SQL (CTE, Window Functions)", "Power BI", "DAX"],
    highlights: ["~99K orders analyzed", "BRL 15.4M revenue", "2-page executive dashboard"],
    github: "https://github.com/senaerdemm2/olist-ecommerce-analysis",
    icon: BarChart3,
    color: "from-cyan-500/20 to-blue-500/20",
    images: ["/dashboards/olist_page1.png", "/dashboards/olist_page2.png"],
  },
  {
    title: "Remote Work Health Impact — EDA",
    description:
      "Comprehensive exploratory data analysis on post-pandemic remote work health impact (2025) with statistical validation. Investigated correlations between remote work patterns and employee wellbeing metrics.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    highlights: ["Statistical validation", "2025 dataset", "Health & wellbeing focus"],
    github: "https://github.com/senaerdemm2/remote-work-health-analysis",
    icon: Brain,
    color: "from-rose-500/20 to-pink-500/20",
    images: [],
  },

  {
    title: "Global Superstore — Power BI Dashboard",
    description:
      "End-to-end Power BI dashboard analyzing global superstore sales, profitability, and regional performance across multiple markets. Features 5 interactive pages: Overview, Product Analysis, Region Analysis, Customer Analysis, and Drillthrough.",
    tech: ["Power BI", "DAX", "Power Query"],
    highlights: ["5 interactive pages", "Multi-market analysis", "Executive dashboard"],
    github: "https://github.com/senaerdemm2/Global-Superstore-Power-BI-Project",
    icon: Database,
    color: "from-violet-500/20 to-purple-500/20",
    images: [
      "/dashboards/global_overview.png",
      "/dashboards/global_product.png",
      "/dashboards/global_region.png",
      "/dashboards/global_customer.png",
      "/dashboards/global_drillthrough.png",
    ],
  },
 
  {
    title: "Power BI Sales Dashboard",
    description:
      "Dynamic sales dashboard built with Power BI, featuring interactive KPIs, trend analysis, and drill-down capabilities for tracking business performance metrics.",
    tech: ["Power BI", "DAX", "SQL"],
    highlights: ["Interactive KPIs", "Trend analysis", "Drill-down reports"],
    github: "https://github.com/senaerdemm2/powerBI_sales_dashboard",
    icon: BarChart3,
    color: "from-sky-500/20 to-indigo-500/20",
    images: [],
  },
   {
    title: "FAST-LI Search Data Analysis",
    description:
      "Explored and analyzed the FAST-LI search dataset using Jupyter Notebooks. Performed data exploration, preprocessing, and visualization to uncover patterns and insights from the search data.",
    tech: ["Python", "Jupyter Notebook", "Pandas", "Matplotlib"],
    highlights: ["Jupyter Notebook", "Data exploration", "Visualization"],
    github: "https://github.com/senaerdemm2/fastli-search-data",
    icon: TrendingUp,
    color: "from-amber-500/20 to-orange-500/20",
    images: [],
  },
];

const CERTIFICATIONS = [
  {
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    date: "Jul 2026",
    credentialId: "1586C7F75F01",
  },
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    date: "Jul 2026",
    credentialId: "4BC02786182F",
  },
  {
    title: "SQL (Basic)",
    issuer: "HackerRank",
    date: "Jul 2026",
    credentialId: "194DEE78A8D1",
  },
  {
    title: "B356-357 Data Analysis Certificate",
    issuer: "TechPro Education",
    date: "Nov 2025",
    credentialId: "4634541267SE",
  },
];

const STATS = [
  { value: 6, label: "Projects", suffix: "" },
  { value: 4, label: "Certifications", suffix: "" },
  { value: 99, label: "K+ Rows Analyzed", suffix: "" },
  { value: 5, label: "Core Tools", suffix: "+" },
];

/* ------------------------------------------------------------------ */
/*  ANIMATED COUNTER                                                   */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD IMAGE CAROUSEL                                           */
/* ------------------------------------------------------------------ */

function DashboardCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Thumbnail strip */}
      <div className="mt-5 relative">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, i) => (
            <button
              key={img}
              onClick={() => { setCurrent(i); setLightbox(true); }}
              className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:border-primary/50 ${
                i === current && !lightbox ? "border-primary" : "border-border/50"
              }`}
            >
              <img
                src={img}
                alt={`Dashboard ${i + 1}`}
                className="w-48 h-28 sm:w-56 sm:h-32 object-cover object-top"
              />
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground/60 mt-2">
          Click to enlarge
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
              onClick={() => setLightbox(false)}
            >
              <XCircle className="h-8 w-8" />
            </button>

            {/* Nav arrows */}
            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10"
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                >
                  <ChevronLeft className="h-10 w-10" />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white z-10"
                  onClick={(e) => { e.stopPropagation(); next(); }}
                >
                  <ChevronRight className="h-10 w-10" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm">
              {current + 1} / {images.length}
            </div>

            {/* Image */}
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="max-w-[90vw] max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[current]}
                alt={`Dashboard ${current + 1}`}
                className="max-w-full max-h-[85vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  SECTION WRAPPER                                                    */
/* ------------------------------------------------------------------ */

function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="text-lg font-bold tracking-tight">
          <span className="text-primary">SE</span>
          <span className="text-muted-foreground font-light ml-1 text-sm hidden sm:inline">Sena Erdem</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <a href="https://github.com/senaerdemm2" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Github className="h-4 w-4" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/sena-erdem-a64b91345/" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Linkedin className="h-4 w-4" />
            </Button>
          </a>
          <a href="#contact">
            <Button size="sm" className="rounded-full px-5">
              Hire Me
            </Button>
          </a>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
        >
          <ul className="flex flex-col px-4 py-4 gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                >
                  {item}
                </a>
              </li>
            ))}
            <li className="flex gap-2 mt-3 pt-3 border-t border-border">
              <a href="https://github.com/senaerdemm2" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/sena-erdem-a64b91345/" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-xs font-medium tracking-wide uppercase"
          >
            <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
            Open to Opportunities
          </Badge>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border bg-secondary">
            <img
              src="/profile.jpg"
              alt="Sena Erdem"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          Hi, I{"'"}m{" "}
          <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Sena Erdem
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
                    Junior Data Analyst in{" "}
          <span className="text-foreground font-medium">Warsaw, Poland</span>.{" "}
          I{"'"}m passionate about making sense of data and helping businesses see the full picture with{" "}
          <span className="text-primary font-medium">Python, SQL, and Power BI</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="#projects">
            <Button size="lg" className="rounded-full px-8 h-12 text-sm font-semibold">
              View My Projects
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="https://www.linkedin.com/in/sena-erdem-a64b91345/" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 h-12 text-sm font-semibold"
            >
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn Profile
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  TECH STACK (GitHub README Style)                                   */
/* ------------------------------------------------------------------ */

function TechStack() {
  const categories = Array.from(new Set(TECH_STACK.map((t) => t.category)));

  return (
    <Section id="tech-stack">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-primary rounded-full" />
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
          Tech Stack
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Tools & Technologies
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-10 leading-relaxed">
        The tools, languages, and libraries I use daily to analyze data and build dashboards.
      </p>

      <div className="space-y-6">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
          >
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
              {cat}
            </h3>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.filter((t) => t.category === cat).map((tech, ti) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: ci * 0.1 + ti * 0.04 }}
                  whileHover={{ y: -2, scale: 1.05 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card/60 hover:border-primary/30 hover:bg-card transition-all duration-200 cursor-default"
                >
                  <span className="text-base">{tech.icon}</span>
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  EXPERIENCE                                                         */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <Section id="experience">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-primary rounded-full" />
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
          Experience
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Professional Experience
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
        Real-world data analytics experience gained through a project-focused internship.
      </p>

      <div className="max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-border bg-card/50 p-6 sm:p-8 hover:border-primary/20 transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
            <div>
              <h3 className="text-lg font-bold">Data Analyst Intern</h3>
              <div className="text-primary font-medium text-sm">GLP Software</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-medium">08/2025 &ndash; 01/2026</div>
              <div className="text-xs text-muted-foreground">Warsaw, Poland</div>
            </div>
          </div>

          <ul className="space-y-3">
            {[
              "Completed a structured internship focused on end-to-end data analysis, including data collection, data cleaning, exploratory data analysis (EDA), and data visualization",
              "Performed data preprocessing and cleaning using Python (Pandas, NumPy) to ensure data quality and consistency",
              "Conducted exploratory data analysis (EDA) to identify trends, correlations, and key performance drivers across datasets",
              "Developed interactive dashboards and visualizations using Power BI, Matplotlib, and Seaborn to communicate insights to stakeholders",
              "Applied data modeling and DAX calculations in Power BI to enable KPI tracking, filtering, and dynamic reporting",
              "Delivered actionable insights and recommendations to support data-driven decision-making",
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
              >
                <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-primary/60" />
                {item}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mt-6 pt-5 border-t border-border">
            {["Python", "Pandas", "NumPy", "Power BI", "DAX", "Matplotlib", "Seaborn"].map((t) => (
              <Badge key={t} variant="secondary" className="text-xs font-normal">
                {t}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

function About() {
  return (
    <Section id="about">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-primary rounded-full" />
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
          About Me
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
        Bridging the Gap Between{" "}
        <span className="text-primary">Data</span> and{" "}
        <span className="text-primary">Decisions</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p>
            I{"'"}m a Computer Engineering graduate with a passion for uncovering
            stories hidden in data. My journey into data analytics began with a
            simple curiosity: how can numbers guide better business decisions?
            That question has since driven every project I{"'"}ve built.
          </p>
          <p>
            I specialize in end-to-end data analytics workflows — from extracting
            and cleaning raw data with SQL and Python, through exploratory analysis
            and statistical testing, to building interactive dashboards in Power BI
            that non-technical stakeholders can actually use.
          </p>
          <p>
            Whether it{"'"}s identifying which student support programs deliver real
            ROI, analyzing e-commerce revenue patterns, or evaluating Google Ads
            campaign performance, I bring a rigorous, hypothesis-driven approach
            to every dataset I touch.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Code2, label: "Python", desc: "Pandas, NumPy, SciPy, Scikit-Learn" },
              { icon: Database, label: "SQL", desc: "PostgreSQL, SQL Server, CTEs, Window Fns" },
              { icon: BarChart3, label: "Power BI", desc: "DAX, Power Query, Dashboards" },
              { icon: FileSpreadsheet, label: "Excel", desc: "Pivot Tables, Power Query, XLOOKUP" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-card/50 p-4 hover:border-primary/30 transition-colors"
              >
                <item.icon className="h-5 w-5 text-primary mb-2" />
                <div className="font-semibold text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILLS                                                             */
/* ------------------------------------------------------------------ */

function Skills() {
  return (
    <Section id="skills">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-primary rounded-full" />
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
          Skills
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Proficiency Levels
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
        A comprehensive set of tools and methodologies I use to transform raw data
        into clear, actionable business insights.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {SKILL_CATEGORIES.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: ci * 0.15 }}
            className="rounded-2xl border border-border bg-card/50 p-6 hover:border-primary/20 transition-colors"
          >
            <h3 className="font-semibold text-sm mb-6 text-foreground/90">
              {cat.title}
            </h3>
            <div className="space-y-5">
              {cat.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">{skill.name}</span>
                    <span className="text-primary font-semibold tabular-nums">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 bg-secondary" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */

function Projects() {
  return (
    <Section id="projects">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-primary rounded-full" />
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
          Projects
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Featured Work
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
        Each project follows a rigorous, end-to-end analytics workflow — from data
        collection and cleaning through statistical analysis to interactive visualization.
      </p>

      <div className="grid gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group rounded-2xl border border-border bg-card/50 hover:border-primary/20 transition-all duration-300 overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                <div
                  className={`shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center border border-border/50`}
                >
                  <project.icon className="h-5 w-5 text-foreground" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dashboard screenshots */}
              {project.images.length > 0 && (
                <DashboardCarousel images={project.images} />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  CERTIFICATIONS                                                     */
/* ------------------------------------------------------------------ */

function Certifications() {
  return (
    <Section id="certifications">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-primary rounded-full" />
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
          Certifications
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Credentials
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
        Continuously validating and expanding my technical skills through
        industry-recognized certifications.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {CERTIFICATIONS.map((cert, i) => (
          <motion.div
            key={cert.credentialId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group rounded-xl border border-border bg-card/50 p-5 hover:border-primary/20 transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{cert.issuer}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>{cert.date}</span>
                </div>
                <div className="text-[11px] text-muted-foreground/60 mt-1.5 font-mono">
                  ID: {cert.credentialId}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <Section id="contact">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-1 bg-primary rounded-full" />
        <span className="text-primary text-sm font-semibold uppercase tracking-wider">
          Contact
        </span>
      </div>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Let{"'"}s Connect
      </h2>
      <p className="text-muted-foreground max-w-2xl mb-12 leading-relaxed">
        I{"'"}m actively seeking Junior Data Analyst positions. Whether you have an
        opportunity, a question, or just want to say hello — I{"'"}d love to hear from
        you.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 max-w-2xl">
        <a
          href="https://www.linkedin.com/in/sena-erdem-a64b91345/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 p-6 hover:border-primary/20 hover:bg-card/80 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Linkedin className="h-5 w-5 text-primary" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm">LinkedIn</div>
            <div className="text-xs text-muted-foreground mt-1">Connect with me</div>
          </div>
        </a>

        <a
          href="https://github.com/senaerdemm2"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 p-6 hover:border-primary/20 hover:bg-card/80 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Github className="h-5 w-5 text-primary" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm">GitHub</div>
            <div className="text-xs text-muted-foreground mt-1">View my code</div>
          </div>
        </a>

        <a
          href="mailto:sena.erdem.pl@gmail.com"
          className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card/50 p-6 hover:border-primary/20 hover:bg-card/80 transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <div className="text-center">
            <div className="font-semibold text-sm">Email</div>
            <div className="text-xs text-muted-foreground mt-1">sena.erdem.pl@gmail.com</div>
          </div>
        </a>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-border py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Sena Erdem. Built with Next.js & Tailwind CSS.
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/senaerdemm2" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/in/sena-erdem-a64b91345/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Hero />
        <TechStack />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
