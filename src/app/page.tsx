"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  ExternalLink,
  Download,
  ArrowRight,
  Database,
  BarChart3,
  Code2,
  FileSpreadsheet,
  GitBranch,
  Server,
  Table2,
  Sparkles,
  Calendar,
  GraduationCap,
  Award,
  Briefcase,
  FolderGit2,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
  Layers,
  ChevronDown,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
// Profile data (single source of truth)
// ─────────────────────────────────────────────────────────────
const PROFILE = {
  name: "Sena Erdem",
  role: "Junior Data Analyst | BI Analyst",
  tagline: "SQL · Power BI · DAX · Python · Power Automate",
  email: "sena.erdem.pl@gmail.com",
  phone: "+48 792 624 121",
  location: "Kraków, Poland",
  linkedin: "https://www.linkedin.com/in/sena-erdem-a64b91345/",
  github: "https://github.com/senaerdemm2",
  githubDisplay: "github.com/senaerdemm2",
  portfolio: "https://senaerdemm.vercel.app/",
  cvPath: "/Sena_Erdem_CV.pdf",
  summary:
    "Computer Engineering graduate (April 2026) with 6 months of Data Analyst / BI internship experience at GLP Software. Specialised in end-to-end data analysis workflows: extracting and validating data in SQL, performing EDA in Python (Pandas, NumPy), modelling KPIs in Power BI with DAX, and delivering insights through interactive dashboards.",
  availability: "Available immediately — open to Junior Data Analyst, BI Analyst, and Reporting Analyst roles in Poland and remote.",
};

const STATS = [
  { label: "Projects", value: "3", suffix: "end-to-end", icon: FolderGit2 },
  { label: "Certifications", value: "4", suffix: "credentials", icon: Award },
  { label: "Rows analysed", value: "100K+", suffix: "across projects", icon: Database },
  { label: "Core tools", value: "8", suffix: "in daily stack", icon: Layers },
];

const TECH_STACK = [
  { name: "Python", category: "Languages", icon: Code2 },
  { name: "SQL", category: "Languages", icon: Database },
  { name: "DAX", category: "Languages", icon: BarChart3 },
  { name: "Power BI", category: "BI & Viz", icon: BarChart3 },
  { name: "Tableau", category: "BI & Viz", icon: BarChart3 },
  { name: "Power Query", category: "BI & Viz", icon: Table2 },
  { name: "Power Automate", category: "BI & Viz", icon: Sparkles },
  { name: "PostgreSQL", category: "Data", icon: Server },
  { name: "Pandas", category: "Data", icon: Database },
  { name: "NumPy", category: "Data", icon: Database },
  { name: "Excel", category: "Tools", icon: FileSpreadsheet },
  { name: "Git", category: "Tools", icon: GitBranch },
];

const EXPERIENCE = {
  role: "Data Analyst Intern (Remote)",
  company: "GLP Software",
  dates: "Aug 2025 — Jan 2026",
  location: "Warsaw, Poland (Remote)",
  achievements: [
    "Completed a remote, project-based internship focused on building 3 end-to-end data analysis portfolios under GLP Software sponsorship (the projects below were the deliverables): SQL, Power BI (DAX), Python (Pandas, NumPy), and reporting automation, covering 99K orders, 5K IT tickets, and 3,157 survey responses.",
    "Applied the full data analysis lifecycle: data collection, cleaning, EDA, KPI modelling, and visualisation; self-directed scope, dataset selection, and methodology for each deliverable.",
    "Developed interactive Power BI dashboards with DAX measures, drill-through filters, and dynamic KPI toggles; documented all pipelines on GitHub for reproducibility.",
  ],
};

const PROJECTS = [
  {
    title: "IT Support Ticket Analysis & Automated Weekly Reporting",
    description:
      "End-to-end weekly reporting pipeline: PostgreSQL → Power Query → Power BI star schema → automated KPI email via Power Automate.",
    metrics: [
      { value: "82.1%", label: "SLA compliance surfaced" },
      { value: "16.9h", label: "avg resolution time" },
      { value: "5,000", label: "tickets processed" },
    ],
    stack: ["PostgreSQL", "Power Query", "Power BI (DAX)", "Power Automate"],
    repo: "https://github.com/senaerdemm2/it-support-ticket-analysis",
    featured: true,
    icon: BarChart3,
  },
  {
    title: "Olist E-Commerce Executive Dashboard",
    description:
      "2-page executive Power BI dashboard on 99K orders and BRL 15.4M revenue, answering 6 business questions on revenue concentration, delivery SLA, and category dependency.",
    metrics: [
      { value: "99K", label: "orders analysed" },
      { value: "BRL 15.4M", label: "revenue covered" },
      { value: "37%", label: "SP revenue share flagged" },
    ],
    stack: ["PostgreSQL", "SQL", "Power BI", "DAX"],
    repo: "https://github.com/senaerdemm2/olist-ecommerce-analysis",
    featured: true,
    icon: TrendingUp,
  },
  {
    title: "Remote Work Burnout Risk Segmentation for HR",
    description:
      "EDA on 3,157 survey responses across 6 regions (Remote vs Hybrid vs Onsite) using Python, Pandas, and Plotly. Engineered a composite burnout risk score for employee segmentation.",
    metrics: [
      { value: "3,157", label: "survey responses" },
      { value: "6", label: "regions compared" },
      { value: "1", label: "composite risk score" },
    ],
    stack: ["Python", "Pandas", "Plotly", "EDA"],
    repo: "https://github.com/senaerdemm2/remote-work-health-analysis",
    featured: false,
    icon: Users,
  },
];

const CERTIFICATIONS = [
  {
    title: "Data Analysis Certificate",
    issuer: "TechPro Education",
    issued: "November 2025",
    id: "4634541267SE",
    duration: "5-month / 330-hour bootcamp",
    majors: ["Data Analytics", "Data Engineering", "BI Analytics", "Data Visualization"],
    curriculum: "SQL, Power BI (DAX), Tableau, Python (Pandas/NumPy), EDA, Capstone, Statistics, Git, HTML/CSS, Jira.",
    imageUrl: "/certificates/techpro_data_analysis.jpg",
    verifyUrl: "https://www.techproeducation.com/",
    featured: true,
  },
  {
    title: "HackerRank SQL (Advanced)",
    issuer: "HackerRank",
    issued: "31 July 2026",
    id: "1586C7F75F01",
    duration: "Skill certification",
    majors: ["Advanced Queries", "Window Functions", "Performance Tuning"],
    curriculum: "Advanced SQL assessment covering complex joins, subqueries, window functions, CTEs, aggregations, and query performance optimisation.",
    imageUrl: "/certificates/hackerrank_sql_advanced.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/1586C7F75F01",
    featured: true,
  },
  {
    title: "HackerRank SQL (Intermediate)",
    issuer: "HackerRank",
    issued: "20 July 2026",
    id: "4BC02786182F",
    duration: "Skill certification",
    majors: ["Joins", "Aggregations", "Subqueries"],
    curriculum: "Intermediate SQL assessment covering multi-table joins, GROUP BY, HAVING, subqueries, CASE expressions, and complex aggregations.",
    imageUrl: "/certificates/hackerrank_sql_intermediate.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/4BC02786182F",
    featured: false,
  },
  {
    title: "HackerRank SQL (Basic)",
    issuer: "HackerRank",
    issued: "20 July 2026",
    id: "194DEE78A8D1",
    duration: "Skill certification",
    majors: ["SELECT queries", "Filtering", "Sorting"],
    curriculum: "Foundational SQL assessment covering SELECT, WHERE, ORDER BY, LIMIT, basic aggregations, and simple table operations.",
    imageUrl: "/certificates/hackerrank_sql_basic.jpg",
    verifyUrl: "https://www.hackerrank.com/certificates/194DEE78A8D1",
    featured: false,
  },
];

// ─────────────────────────────────────────────────────────────
// Fixed background: animated gradient orbs + grid
// ─────────────────────────────────────────────────────────────
function TechBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Animated grid - more visible */}
      <div className="absolute inset-0 tech-grid-bg-strong animate-grid-pulse" />

      {/* Dot pattern overlay */}
      <div className="absolute inset-0 tech-dot-bg opacity-60" />

      {/* Glow orbs - distributed across page, more prominent */}
      <div
        className="absolute top-[5%] left-[2%] w-[600px] h-[600px] rounded-full blur-3xl opacity-50 animate-orb-1"
        style={{ background: "radial-gradient(circle, var(--glow-cyan) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-[30%] right-[0%] w-[700px] h-[700px] rounded-full blur-3xl opacity-45 animate-orb-2"
        style={{ background: "radial-gradient(circle, var(--glow-violet) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-[70%] left-[20%] w-[550px] h-[550px] rounded-full blur-3xl opacity-40 animate-orb-3"
        style={{ background: "radial-gradient(circle, var(--glow-blue) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-[110%] right-[15%] w-[600px] h-[600px] rounded-full blur-3xl opacity-40 animate-orb-1"
        style={{ background: "radial-gradient(circle, var(--glow-cyan) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-[150%] left-[5%] w-[650px] h-[650px] rounded-full blur-3xl opacity-40 animate-orb-2"
        style={{ background: "radial-gradient(circle, var(--glow-violet) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-[200%] right-[25%] w-[550px] h-[550px] rounded-full blur-3xl opacity-40 animate-orb-3"
        style={{ background: "radial-gradient(circle, var(--glow-blue) 0%, transparent 60%)" }}
      />

      {/* Subtle scanline effect at top */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        style={{ animation: "scanline 8s linear infinite" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: Hero
// ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32 max-w-5xl">
        <div className="flex flex-col items-start gap-6">
          {/* Name & role */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
              {PROFILE.name}
              <span className="text-primary animate-blink ml-2">|</span>
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary tech-glow-text">
              {PROFILE.role}
            </p>
            <p className="text-base sm:text-lg text-muted-foreground font-mono">
              <span className="text-primary/60">{">"}</span> {PROFILE.tagline}
            </p>
          </div>

          {/* Summary */}
          <p className="max-w-3xl text-base sm:text-lg text-foreground/80 leading-relaxed">
            {PROFILE.summary}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg" className="tech-btn-glow gap-2 animate-pulse-glow">
              <a href="#projects">
                <FolderGit2 className="size-4" />
                View Projects
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="tech-btn-glow gap-2 border-primary/40 hover:border-primary hover:bg-primary/10">
              <a href={PROFILE.cvPath} download>
                <Download className="size-4" />
                Download CV
              </a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="gap-2 hover:text-primary hover:bg-primary/5">
              <a href={`mailto:${PROFILE.email}`}>
                <Mail className="size-4" />
                Hire Me
              </a>
            </Button>
          </div>

          {/* Quick contact strip */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 text-sm text-muted-foreground font-mono">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="size-3.5" />
              {PROFILE.email}
            </a>
            <span className="hidden sm:inline text-border">|</span>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Linkedin className="size-3.5" />
              LinkedIn
            </a>
            <span className="hidden sm:inline text-border">|</span>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Github className="size-3.5" />
              {PROFILE.githubDisplay}
            </a>
            <span className="hidden sm:inline text-border">|</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {PROFILE.location}
            </span>
          </div>

          {/* Scroll hint */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground mt-4 animate-fade-up">
            <ChevronDown className="size-3 animate-bounce" />
            <span className="font-mono">scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: Stats bar
// ─────────────────────────────────────────────────────────────
function StatsBar() {
  return (
    <section className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center sm:flex-row sm:text-left gap-3 group"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_20px_var(--glow-cyan)] transition-all">
                  <Icon className="size-5" />
                </div>
                <div className="space-y-0.5">
                  <div className="text-2xl sm:text-3xl font-bold text-foreground leading-none font-mono">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    <span className="font-medium text-foreground/80">{stat.label}</span>
                    <span className="hidden sm:inline"> · {stat.suffix}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: Tech Stack
// ─────────────────────────────────────────────────────────────
function TechStack() {
  const categories = Array.from(new Set(TECH_STACK.map((t) => t.category)));

  return (
    <section id="tech-stack" className="border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
        <SectionHeading
          eyebrow="Tools & Technologies"
          title="Tech Stack"
          description="The tools, languages, and libraries I use daily to build reporting workflows, dashboards, and analytical datasets."
        />

        <div className="mt-8 space-y-6">
          {categories.map((category) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                <span className="text-primary/60"># </span>
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {TECH_STACK.filter((t) => t.category === category).map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <span
                      key={tool.name}
                      className="tech-badge inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:border-primary hover:shadow-[0_0_15px_var(--glow-cyan)] transition-all cursor-default"
                    >
                      <Icon className="size-3.5 text-primary" />
                      {tool.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: About
// ─────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="border-b border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
        <SectionHeading
          eyebrow="About Me"
          title="Bridging the Gap Between Data and Decisions"
          description="From raw data to stakeholder-ready reports."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card className="tech-card-glow md:col-span-2 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <p className="text-base sm:text-lg text-foreground leading-relaxed">
                I&apos;m a Computer Engineering graduate based in Kraków with 6 months of Data Analyst internship experience at GLP Software in Warsaw. I mainly work with SQL, Power BI, Python, and Excel to deliver data analysis workflows that stakeholders actually use.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                My focus is on the full data analysis lifecycle: extracting and validating data in SQL, performing EDA in Python with Pandas, modelling KPIs in Power BI with DAX, and delivering insights through dashboards that non-technical teams can self-serve from.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                I&apos;m currently looking for <span className="font-semibold text-primary">Junior Data Analyst</span>, <span className="font-semibold text-primary">BI Analyst</span>, and <span className="font-semibold text-primary">Reporting Analyst</span> roles where I can grow, solve real business problems, and contribute to data-driven decisions.
              </p>
            </CardContent>
          </Card>

          <Card className="tech-card-glow bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-foreground font-mono">
                <span className="text-primary/60">{">"}</span> Quick Facts
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <GraduationCap className="size-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Education</div>
                    <div className="text-muted-foreground">B.Sc. Computer Engineering</div>
                    <div className="text-xs text-muted-foreground/70 font-mono">Vistula University · Apr 2026</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Briefcase className="size-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Internship</div>
                    <div className="text-muted-foreground">GLP Software, Warsaw</div>
                    <div className="text-xs text-muted-foreground/70 font-mono">Aug 2025 — Jan 2026</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="size-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Bootcamp</div>
                    <div className="text-muted-foreground">TechPro Education</div>
                    <div className="text-xs text-muted-foreground/70 font-mono">330-hour Data Analysis program</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-muted-foreground">Kraków, Poland</div>
                    <div className="text-xs text-muted-foreground/70 font-mono">Open to remote & relocation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: Experience
// ─────────────────────────────────────────────────────────────
function Experience() {
  const exp = EXPERIENCE;
  return (
    <section id="experience" className="border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
        <SectionHeading
          eyebrow="Professional Experience"
          title="Work"
          description="Real-world data analysis experience gained through a project-focused internship."
        />

        <div className="mt-8">
          <Card className="tech-card-glow bg-card/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{exp.role}</CardTitle>
                  <CardDescription className="text-base">
                    <span className="text-primary/80">{exp.company}</span> · {exp.location}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono shrink-0">
                  <Calendar className="size-3.5" />
                  {exp.dates}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {exp.achievements.map((achievement, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="size-4 text-primary mt-1 shrink-0" />
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                    {achievement}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: Projects
// ─────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" className="border-b border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
        <SectionHeading
          eyebrow="Featured Work"
          title="Projects"
          description="Each project follows an end-to-end data analysis workflow — from data extraction and cleaning through EDA and statistical analysis to interactive visualisation."
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {PROJECTS.map((project) => {
            const Icon = project.icon;
            return (
              <Card
                key={project.title}
                className={`tech-card-glow flex flex-col bg-card/80 backdrop-blur-sm ${
                  project.featured ? "ring-1 ring-primary/30" : ""
                }`}
              >
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Icon className="size-5" />
                    </div>
                    {project.featured && (
                      <Badge variant="default" className="gap-1 text-xs">
                        <Sparkles className="size-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-snug">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-2 rounded-lg bg-background/60 border border-border/40 p-3">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div className="text-base sm:text-lg font-bold text-primary font-mono leading-tight">
                          {metric.value}
                        </div>
                        <div className="text-[10px] sm:text-xs text-muted-foreground leading-tight mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stack badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="tech-badge inline-flex items-center rounded text-xs font-mono text-foreground/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Repo link */}
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline mt-2 font-mono"
                  >
                    <Github className="size-3.5" />
                    View on GitHub
                    <ExternalLink className="size-3" />
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: Certifications
// ─────────────────────────────────────────────────────────────
function Certifications() {
  return (
    <section id="certifications" className="border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Industry-recognised credentials validating my technical training. Click any certificate image to view it full-size."
        />

        <div className="mt-8 space-y-6">
          {CERTIFICATIONS.map((cert) => (
            <CertificationCard key={cert.title} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable: Certification card with image lightbox
// ─────────────────────────────────────────────────────────────
function CertificationCard({ cert }: { cert: typeof CERTIFICATIONS[number] }) {
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <Card
      className={`tech-card-glow bg-card/80 backdrop-blur-sm ${cert.featured ? "ring-1 ring-primary/30" : ""}`}
    >
      <CardContent className="p-0">
        <div className="grid gap-0 md:grid-cols-[280px_1fr]">
          {/* Certificate image — clicking opens lightbox modal */}
          {cert.imageUrl ? (
            <button
              type="button"
              onClick={() => setImageOpen(true)}
              className="block w-full text-left bg-background/40 p-4 md:p-6 border-b md:border-b-0 md:border-r border-border/40 group cursor-pointer"
              aria-label={`View ${cert.title} certificate image full-size`}
            >
              <div className="aspect-[1.4/1] overflow-hidden rounded-md border border-border/60 bg-background shadow-sm transition-all group-hover:shadow-[0_0_25px_var(--glow-cyan)] group-hover:border-primary/40">
                <img
                  src={cert.imageUrl}
                  alt={`${cert.title} - ${cert.issuer}`}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground text-center font-mono inline-flex items-center gap-1 w-full justify-center">
                <ExternalLink className="size-3" />
                click to view full-size
              </p>
            </button>
          ) : (
            <div className="bg-background/40 p-4 md:p-6 border-b md:border-b-0 md:border-r border-border/40 flex items-center justify-center">
              <div className="aspect-[1.4/1] w-full rounded-md border border-dashed border-border/60 flex items-center justify-center bg-muted/20">
                <Award className="size-12 text-muted-foreground/40" />
              </div>
            </div>
          )}

          {/* Certificate details */}
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-lg text-foreground leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-primary/80">{cert.issuer}</p>
                </div>
                {cert.featured && (
                  <Badge variant="default" className="gap-1 text-xs shrink-0">
                    <Award className="size-3" />
                    Verified
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground font-mono">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3" />
                Issued {cert.issued}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3" />
                {cert.duration}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Award className="size-3" />
                ID: {cert.id}
              </span>
            </div>

            {/* Majors */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                <span className="text-primary/60">#</span> Majors
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cert.majors.map((major) => (
                  <span
                    key={major}
                    className="tech-badge inline-flex items-center rounded text-xs"
                  >
                    {major}
                  </span>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground font-mono">
                <span className="text-primary/60">#</span> Curriculum
              </div>
              <p className="text-sm text-foreground/90 leading-relaxed font-mono">
                {cert.curriculum}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {cert.imageUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setImageOpen(true)}
                  className="tech-btn-glow gap-2 border-primary/40 hover:border-primary hover:bg-primary/10 font-mono"
                >
                  <ExternalLink className="size-3.5" />
                  View certificate
                </Button>
              )}
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline font-mono"
              >
                <ExternalLink className="size-3.5" />
                verify on {cert.issuer.toLowerCase().split(" ")[0]}
              </a>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Image lightbox modal */}
      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="max-w-5xl w-full p-2 sm:p-4 bg-card/95 backdrop-blur-md border-primary/30">
          <DialogHeader className="sr-only">
            <DialogTitle>{cert.title} - {cert.issuer}</DialogTitle>
            <DialogDescription>
              Full-size view of the {cert.title} certificate issued by {cert.issuer}.
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <img
              src={cert.imageUrl}
              alt={`${cert.title} - ${cert.issuer} - full certificate`}
              className="w-full h-auto rounded-md border border-border/60"
            />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 pb-1">
              <div className="text-xs text-muted-foreground font-mono">
                <span className="text-primary/80">{cert.issuer}</span>
                {" · "}ID: {cert.id}{" · "}Issued {cert.issued}
              </div>
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline font-mono"
              >
                <ExternalLink className="size-3" />
                verify credential
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: Contact
// ─────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" className="border-b border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 max-w-5xl">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Let's Connect"
          description="I'm actively seeking Junior Data Analyst, BI Analyst, and Reporting Analyst positions. Whether you have an opportunity, a question, or just want to say hello — I'd love to hear from you."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a href={`mailto:${PROFILE.email}`} className="block">
            <Card className="tech-card-glow h-full bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Email</div>
                  <div className="text-sm text-muted-foreground break-all font-mono">{PROFILE.email}</div>
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-primary font-medium font-mono">
                  {">"} send a message
                  <ArrowRight className="size-3" />
                </div>
              </CardContent>
            </Card>
          </a>

          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="tech-card-glow h-full bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Linkedin className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">LinkedIn</div>
                  <div className="text-sm text-muted-foreground font-mono">sena-erdem</div>
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-primary font-medium font-mono">
                  {">"} connect with me
                  <ArrowRight className="size-3" />
                </div>
              </CardContent>
            </Card>
          </a>

          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="block">
            <Card className="tech-card-glow h-full bg-card/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Github className="size-5" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">GitHub</div>
                  <div className="text-sm text-muted-foreground font-mono">{PROFILE.githubDisplay}</div>
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-primary font-medium font-mono">
                  {">"} view my code
                  <ArrowRight className="size-3" />
                </div>
              </CardContent>
            </Card>
          </a>
        </div>

        {/* Secondary contact info */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground font-mono">
          <span className="inline-flex items-center gap-1.5">
            <Phone className="size-3.5" />
            {PROFILE.phone}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5" />
            {PROFILE.location}
          </span>
          <a
            href={PROFILE.cvPath}
            download
            className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Download className="size-3.5" />
            Download CV (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Section: Footer
// ─────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="mt-auto border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="space-y-1 text-center sm:text-left font-mono">
            <div className="font-semibold text-foreground">
              <span className="text-primary/60">{">"}</span> {PROFILE.name}
            </div>
            <div>© {new Date().getFullYear()} · Built with Next.js & Tailwind CSS</div>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Mail className="size-3.5" />
              Email
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Linkedin className="size-3.5" />
              LinkedIn
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <Github className="size-3.5" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// Reusable: Section heading
// ─────────────────────────────────────────────────────────────
function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-2 max-w-3xl">
      <div className="text-xs font-semibold uppercase tracking-wider text-primary font-mono">
        <span className="text-primary/60">{">"}</span> {eyebrow}
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      <Separator className="w-12 h-0.5 bg-primary" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TechBackground />
      <Hero />
      <StatsBar />
      <TechStack />
      <About />
      <Experience />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}
