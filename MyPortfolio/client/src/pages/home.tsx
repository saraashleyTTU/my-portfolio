import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Mail, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Twitter, 
  Code, 
  Server, 
  PenTool, 
  Phone, 
  MapPin, 
  Send,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  category: string;
}

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'tools';
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Projects data
  const projects: Project[] = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store with cart, checkout, and payment integration.",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["React", "Node.js", "Stripe"],
      demoUrl: "#",
      githubUrl: "#",
      category: "Web App"
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description: "Real-time data visualization tool for business intelligence and reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["Vue.js", "D3.js", "Python"],
      demoUrl: "#",
      githubUrl: "#",
      category: "SaaS"
    },
    {
      id: 3,
      title: "Social Network App",
      description: "Community platform with real-time messaging and content sharing features.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["Next.js", "Socket.io", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#",
      category: "Social"
    },
    {
      id: 4,
      title: "Task Manager Pro",
      description: "Intuitive project management tool with drag-and-drop functionality.",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["React", "Firebase", "TypeScript"],
      demoUrl: "#",
      githubUrl: "#",
      category: "Productivity"
    },
    {
      id: 5,
      title: "Modern Blog Platform",
      description: "Content management system with markdown support and SEO optimization.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["Next.js", "MDX", "Prisma"],
      demoUrl: "#",
      githubUrl: "#",
      category: "CMS"
    },
    {
      id: 6,
      title: "Weather Forecast App",
      description: "Beautiful weather application with detailed forecasts and location search.",
      image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      tags: ["React", "Weather API", "Chart.js"],
      demoUrl: "#",
      githubUrl: "#",
      category: "API"
    }
  ];

  // Skills data
  const skills: Skill[] = [
    // Frontend
    { name: "React", category: "frontend" },
    { name: "Vue.js", category: "frontend" },
    { name: "TypeScript", category: "frontend" },
    { name: "Tailwind CSS", category: "frontend" },
    { name: "Next.js", category: "frontend" },
    { name: "HTML5/CSS3", category: "frontend" },
    
    // Backend
    { name: "Node.js", category: "backend" },
    { name: "Express", category: "backend" },
    { name: "Python", category: "backend" },
    { name: "PostgreSQL", category: "backend" },
    { name: "MongoDB", category: "backend" },
    { name: "REST APIs", category: "backend" },
    
    // Tools
    { name: "Figma", category: "tools" },
    { name: "Adobe XD", category: "tools" },
    { name: "Git", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "AWS", category: "tools" },
    { name: "Vercel", category: "tools" }
  ];

  // Navigation sections
  const navigationSections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ];

  // Intersection Observer for section highlighting
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-100px 0px -100px 0px"
      }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observerRef.current?.unobserve(section);
      });
    };
  }, []);

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission - in a real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I'll get back to you soon.",
      });
      
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection('home')}
                className="text-2xl font-bold gradient-text"
                data-testid="logo-button"
              >
                MyPortfolio
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navigationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`nav-link text-foreground hover:text-primary font-medium ${
                      activeSection === section.id ? 'active' : ''
                    }`}
                    data-testid={`nav-${section.id}`}
                  >
                    {section.label}
                  </button>
                ))}
                <Button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary text-primary-foreground hover:opacity-90"
                  data-testid="hire-me-button"
                >
                  Hire Me
                </Button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              data-testid="mobile-menu-button"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`mobile-menu fixed top-0 right-0 h-full w-64 bg-white shadow-2xl md:hidden z-50 ${
            mobileMenuOpen ? 'active' : ''
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="mobile-menu-close"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex flex-col space-y-4 px-6 py-4">
              {navigationSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="mobile-nav-link text-foreground hover:text-primary font-medium text-lg py-2 text-left"
                  data-testid={`mobile-nav-${section.id}`}
                >
                  {section.label}
                </button>
              ))}
              <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-primary text-primary-foreground mt-4"
                data-testid="mobile-hire-me-button"
              >
                Hire Me
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-muted to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <p className="text-accent font-mono text-sm md:text-base mb-4">Hi there, I'm</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="gradient-text">Alex Johnson</span>
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-secondary mb-6">
                Full Stack Developer & Designer
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                I craft beautiful, functional web experiences that bring ideas to life. 
                Specializing in modern JavaScript frameworks, responsive design, and creative problem-solving.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => scrollToSection('projects')}
                  className="bg-primary text-primary-foreground hover:opacity-90"
                  data-testid="view-work-button"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection('contact')}
                  className="border-2"
                  data-testid="get-in-touch-button"
                >
                  Get In Touch
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-6 mt-8">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                  data-testid="social-github"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                  data-testid="social-linkedin"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Twitter"
                  data-testid="social-twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
            <div className="animate-fade-in delay-200 hidden md:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Developer workspace"
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 p-3 rounded-lg">
                      <Code className="text-accent h-8 w-8" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">5+</p>
                      <p className="text-muted-foreground text-sm">Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Passionate about creating exceptional digital experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="About me workspace"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Creative Developer with a Passion for Excellence</h3>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                With over 5 years of experience in web development, I've had the privilege of working with 
                startups, agencies, and established companies to bring their digital visions to life.
              </p>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                My approach combines technical expertise with creative problem-solving. I believe that great 
                design and solid code go hand in hand to create experiences that users love and businesses value.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <div className="text-primary text-4xl font-bold mb-2">50+</div>
                    <p className="text-muted-foreground">Projects Completed</p>
                  </CardContent>
                </Card>
                <Card className="bg-muted">
                  <CardContent className="p-6">
                    <div className="text-accent text-4xl font-bold mb-2">30+</div>
                    <p className="text-muted-foreground">Happy Clients</p>
                  </CardContent>
                </Card>
              </div>
              <Button 
                variant="ghost" 
                className="text-primary p-0 h-auto font-medium hover:bg-transparent"
                data-testid="download-resume-button"
              >
                Download Resume
                <Download className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 md:py-24 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Technologies and tools I work with to bring ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Frontend Development */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Code className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Frontend Development</h3>
                <p className="text-muted-foreground mb-6">Building responsive and interactive user interfaces</p>
                <div className="flex flex-wrap gap-2">
                  {skills.filter(skill => skill.category === 'frontend').map((skill) => (
                    <span
                      key={skill.name}
                      className="skill-tag bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
                      data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Backend Development */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-8">
                <div className="bg-accent/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <Server className="text-accent h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Backend Development</h3>
                <p className="text-muted-foreground mb-6">Creating robust and scalable server-side solutions</p>
                <div className="flex flex-wrap gap-2">
                  {skills.filter(skill => skill.category === 'backend').map((skill) => (
                    <span
                      key={skill.name}
                      className="skill-tag bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
                      data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Design & Tools */}
            <Card className="bg-white shadow-md">
              <CardContent className="p-8">
                <div className="bg-secondary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                  <PenTool className="text-secondary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-4">Design & Tools</h3>
                <p className="text-muted-foreground mb-6">Designing beautiful interfaces and managing workflows</p>
                <div className="flex flex-wrap gap-2">
                  {skills.filter(skill => skill.category === 'tools').map((skill) => (
                    <span
                      key={skill.name}
                      className="skill-tag bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium cursor-pointer"
                      data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              A selection of my recent work across web development and design
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="project-card bg-card rounded-xl overflow-hidden shadow-lg border border-border"
                data-testid={`project-${project.id}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">
                      {project.category}
                    </span>
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-medium">
                      {project.tags[0]}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    <a
                      href={project.demoUrl}
                      className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1"
                      data-testid={`project-${project.id}-demo`}
                    >
                      View Demo <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="text-muted-foreground hover:text-foreground font-medium inline-flex items-center gap-1"
                      data-testid={`project-${project.id}-github`}
                    >
                      GitHub <Github className="h-3 w-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="ghost" 
              className="text-primary hover:bg-transparent font-medium text-lg p-0 h-auto"
              data-testid="view-all-projects-button"
            >
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-gradient-to-br from-muted to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind? Let's work together to bring your ideas to life
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
              <p className="text-muted-foreground text-lg mb-8">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                    <Mail className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <a
                      href="mailto:hello@alexjohnson.dev"
                      className="text-muted-foreground hover:text-primary"
                      data-testid="contact-email"
                    >
                      hello@alexjohnson.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-lg flex-shrink-0">
                    <Phone className="text-accent h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:text-accent"
                      data-testid="contact-phone"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-secondary/10 p-3 rounded-lg flex-shrink-0">
                    <MapPin className="text-secondary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="font-semibold mb-4">Follow Me</h4>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="bg-white border border-border w-12 h-12 rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    data-testid="footer-social-github"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white border border-border w-12 h-12 rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    data-testid="footer-social-linkedin"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-white border border-border w-12 h-12 rounded-lg flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    data-testid="footer-social-twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-white shadow-xl border border-border">
              <CardContent className="p-8">
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-6">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2">
                      Your Name
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      required
                      data-testid="input-name"
                      className="mt-2"
                    />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground mb-2">
                      Email Address
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      required
                      data-testid="input-email"
                      className="mt-2"
                    />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="subject" className="text-sm font-medium text-foreground mb-2">
                      Subject
                    </Label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project Inquiry"
                      required
                      data-testid="input-subject"
                      className="mt-2"
                    />
                  </div>

                  <div className="mb-6">
                    <Label htmlFor="message" className="text-sm font-medium text-foreground mb-2">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project..."
                      required
                      data-testid="textarea-message"
                      className="mt-2 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:opacity-90"
                    data-testid="button-submit"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4 gradient-text">MyPortfolio</h3>
              <p className="text-gray-400 mb-4">
                Full Stack Developer & Designer passionate about creating exceptional digital experiences.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-github"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-linkedin"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  data-testid="footer-twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navigationSections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => scrollToSection(section.id)}
                      className="text-gray-400 hover:text-white transition-colors text-left"
                      data-testid={`footer-nav-${section.id}`}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">Web Development</li>
                <li className="text-gray-400">UI/UX Design</li>
                <li className="text-gray-400">Consulting</li>
                <li className="text-gray-400">Maintenance</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Alex Johnson. All rights reserved. Built with passion and code.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
