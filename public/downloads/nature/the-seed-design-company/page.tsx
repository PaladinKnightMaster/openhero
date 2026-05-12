"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const navItems = [
  { id: "home", label: "Home" },
  { id: "participation", label: "Participation" },
  { id: "rules", label: "Rules" },
  { id: "projects", label: "Projects" },
];

const participationCards = [
  {
    icon: "solar:users-group-rounded-bold-duotone",
    title: "Teams of 2 to 4",
    text: "Gather your friends or find teammates in our community platform. Collaboration is key to building an impactful project.",
  },
  {
    icon: "solar:diploma-bold-duotone",
    title: "All Skill Levels",
    text: "Whether you're a freshman writing your first line of code or a senior architecting complex systems, there's a place for you here.",
  },
  {
    icon: "solar:rocket-bold-duotone",
    title: "Expert Mentorship",
    text: "Get stuck? Don't worry. Industry professionals will be available throughout the event to guide you and review your code.",
  },
];

const timeline = [
  {
    week: "Week 1",
    title: "Ideation & Team Formation",
    text: "Meet your peers, form a team, and brainstorm ideas. Submit your project proposal and get it approved by the mentors.",
    side: "left",
    accent: true,
  },
  {
    week: "Week 2",
    title: "Development Phase",
    text: "Turn caffeine into code. Build the core features of your application, attend technical workshops, and consult with mentors.",
    side: "right",
    accent: false,
  },
  {
    week: "Week 3",
    title: "Refinement & Pitch",
    text: "Polish your UI, fix bugs, and prepare your pitch deck. Present your final product to the judges on Demo Day.",
    side: "left",
    accent: false,
  },
];

const projects = [
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    alt: "Project 1",
    tags: ["AI", "Healthcare"],
    title: "MedAssist AI",
    text: "An intelligent diagnostic assistant helping rural doctors analyze symptoms and recommend preliminary treatments using machine learning.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    alt: "Project 2",
    tags: ["Fintech", "Web3"],
    title: "AgriPay Network",
    text: "A decentralized payment infrastructure designed specifically for local farmers to secure direct transactions without intermediaries.",
  },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const updateHighlight = () => {
    if (typeof window === "undefined") return;

    const desktopContainer = document.querySelector<HTMLElement>(".desktop-nav");
    const desktopEl = document.querySelector<HTMLElement>(
      `.nav-link[data-id="${activeSection}"]`
    );
    const desktopMask = document.getElementById("desktopMaskEl");

    if (desktopContainer && desktopEl && desktopMask) {
      const cRect = desktopContainer.getBoundingClientRect();
      const eRect = desktopEl.getBoundingClientRect();
      desktopMask.style.left = `${eRect.left - cRect.left}px`;
      desktopMask.style.top = `${eRect.top - cRect.top}px`;
      desktopMask.style.width = `${eRect.width}px`;
      desktopMask.style.height = `${eRect.height}px`;
      desktopMask.style.borderRadius = "9999px";
      desktopMask.style.opacity = "1";
    }

    const mobileContainer = document.querySelector<HTMLElement>(".mobile-nav");
    const mobileEl = document.querySelector<HTMLElement>(
      `.mobile-link[data-id="${activeSection}"]`
    );
    const mobileMask = document.getElementById("mobileMaskEl");

    if (mobileContainer && mobileEl && mobileMask && isMobileOpen) {
      const cRect = mobileContainer.getBoundingClientRect();
      const eRect = mobileEl.getBoundingClientRect();
      mobileMask.style.left = `${eRect.left - cRect.left}px`;
      mobileMask.style.top = `${eRect.top - cRect.top}px`;
      mobileMask.style.width = `${eRect.width}px`;
      mobileMask.style.height = `${eRect.height}px`;
      mobileMask.style.borderRadius = "14px";
      mobileMask.style.opacity = "1";
    }
  };

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection?.target?.id) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll<HTMLElement>(".section-block").forEach((el) => {
      sectionObserver.observe(el);
    });

    document.querySelectorAll<HTMLElement>(".reveal-on-scroll").forEach((el) => {
      revealObserver.observe(el);
    });

    const handleScroll = () => {
      document.body.style.setProperty("--scroll", String(window.scrollY));
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateHighlight);

    handleScroll();
    setTimeout(updateHighlight, 100);

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHighlight);
    };
  }, []);

  useEffect(() => {
    updateHighlight();
  }, [activeSection, isMobileOpen]);

  return (
    <>
      <main className="antialiased selection:bg-yellow-400/30 selection:text-yellow-200">
        <nav className="nav-anim fixed top-8 inset-x-0 z-50 flex flex-col px-4 md:px-8 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center justify-between relative">
            <a href="#home" className="flex items-center cursor-pointer shrink-0 z-20">
              <span className="font-bold text-lg pt-1 tracking-tight text-white flex items-center gap-2">
                <Icon icon="solar:code-square-bold-duotone" className="text-[var(--accent)] text-2xl" />
                UNAMBA <span className="text-[var(--accent)] font-medium">Hackathon</span>
              </span>
            </a>

            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 w-auto">
              <div className="desktop-nav relative flex p-1.5 items-center justify-center space-x-1 text-sm rounded-full border border-white/10 bg-black/50 backdrop-blur-md overflow-hidden">
                <div
                  id="desktopMaskEl"
                  className="absolute bg-white/10 -z-10 transition-all duration-300 ease-out opacity-0"
                />
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    data-id={item.id}
                    className={
                      activeSection === item.id
                        ? "nav-link cursor-pointer px-4 py-2 rounded-full transition-colors duration-300 relative z-10 text-white font-medium border border-white/20 bg-white/10"
                        : "nav-link cursor-pointer px-4 py-2 rounded-full transition-colors duration-300 relative z-10 text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                    }
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end w-[180px] shrink-0 z-20">
              <a
                href="https://github.com/CristianOlivera1/openhero"
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center justify-center px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-all duration-300 text-sm gap-2 hover:scale-105"
              >
                <span>Join Now</span>
                <Icon icon="line-md:github-loop" className="text-[18px]" />
              </a>

              <button
                type="button"
                onClick={() => setIsMobileOpen((prev) => !prev)}
                className="md:hidden flex items-center justify-center p-2 text-white/80 hover:text-white bg-black/40 backdrop-blur-md border border-white/10 rounded-xl z-20 transition-colors"
              >
                <Icon icon={isMobileOpen ? "line-md:close" : "line-md:menu"} className="text-2xl" />
              </button>
            </div>
          </div>

          <div
            className={`mobile-nav md:hidden mt-4 w-full relative rounded-2xl border border-white/10 shadow-2xl overflow-hidden absolute top-full left-0 transition-all duration-200 ease-out ${
              isMobileOpen ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
            }`}
          >
            <div
              id="mobileMaskEl"
              className="absolute inset-0 bg-white/10 backdrop-blur-2xl rounded-2xl -z-10 transition-all duration-300 ease-out opacity-0"
            />
            <div className="p-5 flex flex-col space-y-2 relative z-10 bg-black/90 backdrop-blur-2xl">
              <div className="px-4 py-2 mb-2 flex items-center gap-2">
                <Icon icon="solar:code-square-bold-duotone" className="text-[var(--accent)] text-2xl" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  UNAMBA <span className="text-[var(--accent)] font-medium">Hackathon</span>
                </h2>
              </div>

              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  data-id={item.id}
                  onClick={() => setIsMobileOpen(false)}
                  className={
                    activeSection === item.id
                      ? "mobile-link px-4 py-3 rounded-xl text-sm transition-all duration-300 bg-white/10 text-white font-semibold border border-white/10 shadow-sm"
                      : "mobile-link px-4 py-3 rounded-xl text-sm transition-all duration-300 text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }
                >
                  {item.label}
                </a>
              ))}

              <div className="pt-6 mt-4 border-t border-white/10 w-full">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center w-full px-4 py-3 bg-white text-black rounded-xl font-medium hover:bg-white/90 transition-colors text-sm gap-2"
                >
                  <span>Register with GitHub</span>
                  <Icon icon="line-md:github-loop" className="text-[18px]" />
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-black text-white">
          <div
            id="home"
            className="section-block p-2 md:p-4 h-[95vh] md:h-screen flex items-center justify-center relative w-full"
            style={{ scrollMarginTop: "120px" }}
          >
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-[var(--surface)] border border-white/5 noise">
              <video
                autoPlay
                loop
                muted
                playsInline
                poster="/images/nature/your-poster.avif"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-80"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 10%, transparent 100%)",
                  maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>

              <div
                className="absolute inset-0 pointer-events-none mix-blend-screen opacity-30"
                style={{
                  background:
                    "linear-gradient(130deg, transparent 40%, transparent 60%, #00aa17b6 100%)",
                }}
              />

              <div className="absolute bottom-0 inset-x-0 p-6 md:p-16 z-20 flex flex-col lg:flex-row justify-between lg:items-end gap-10">
                <div className="hero-text-1 max-w-4xl">
                  <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] mb-6 tracking-tight text-white">
                    Empowering the talent <br />
                    <span className="text-white/60">of our region.</span>
                  </h1>
                </div>

                <div className="hero-text-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-12 w-full lg:w-auto">
                  <div className="text-lg font-normal text-zinc-400 max-w-sm leading-relaxed">
                    Develop your project and showcase your skills to the world in{" "}
                    <span className="relative inline-block whitespace-nowrap text-white font-medium ml-1">
                      just 3 weeks.
                      <svg
                        viewBox="0 0 187 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="svg-underline absolute -bottom-1 left-0 w-full pointer-events-none"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M2 7.85498C2 7.85498 63 2.81649 112 1.97674C161 1.137 185.5 4.91586 185.5 4.91586"
                          stroke="#FACC15"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            id="participation"
            className="section-block min-h-screen w-full flex flex-col items-center justify-center py-32 px-6 relative"
            style={{ scrollMarginTop: "120px" }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="max-w-6xl w-full relative z-10">
              <div className="text-center mb-20 reveal-on-scroll">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
                  Who can participate?
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                  Join a community of builders, designers, and innovators. Build the future, regardless of your current skill level.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {participationCards.map((card, index) => (
                  <div
                    key={card.title}
                    className={`glass-card hover-glow rounded-3xl p-8 transition-all duration-300 reveal-on-scroll ${
                      index === 0 ? "reveal-left delay-1" : index === 1 ? "delay-2" : "reveal-right delay-3"
                    }`}
                  >
                    <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-[var(--accent)]">
                      <Icon icon={card.icon} className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="rules"
            className="section-block min-h-screen w-full flex flex-col items-center justify-center py-32 px-6 relative border-t border-white/5 bg-[#050505]"
            style={{ scrollMarginTop: "120px" }}
          >
            <div className="max-w-4xl w-full relative z-10">
              <div className="text-center mb-20 reveal-on-scroll">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
                  Event Timeline
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                  Three weeks of intense building, learning, and shipping. Here is how the event is structured.
                </p>
              </div>

              <div className="relative border-l border-white/10 ml-4 md:ml-0 md:mx-auto space-y-12 pb-12">
                {timeline.map((item, index) => (
                  <div
                    key={item.week}
                    className={`relative pl-8 md:pl-0 md:w-1/2 md:pr-12 ${
                      item.side === "left"
                        ? "md:text-right md:ml-auto md:-left-[50%]"
                        : "md:ml-auto md:pl-12"
                    } reveal-on-scroll ${item.side === "left" ? "reveal-left" : "reveal-right"} delay-${index + 1}`}
                  >
                    <div
                      className={`absolute w-4 h-4 rounded-full bg-black border-2 ${
                        item.accent ? "border-[var(--accent)] shadow-[0_0_10px_rgba(250,204,21,0.5)]" : "border-white/30"
                      } left-[-8px] md:${item.side === "left" ? "right-[-8px] md:left-auto" : "left-[-8px]"} top-1`}
                    />
                    <span
                      className={`font-mono text-sm tracking-widest uppercase mb-2 block ${
                        item.accent ? "text-[var(--accent)]" : "text-white/50"
                      }`}
                    >
                      {item.week}
                    </span>
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            id="projects"
            className="section-block min-h-screen w-full flex flex-col items-center justify-center py-32 px-6 relative border-t border-white/5"
            style={{ scrollMarginTop: "120px" }}
          >
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="max-w-6xl w-full relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 reveal-on-scroll">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 gradient-text">
                    Previous Projects
                  </h2>
                  <p className="text-zinc-400 text-lg max-w-xl">
                    Take a look at what teams have built in past editions. Incredible ideas brought to life in record time.
                  </p>
                </div>

                <a href="#" className="text-[var(--accent)] hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                  View All Projects
                  <Icon icon="solar:arrow-right-linear" className="text-lg" />
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className={`group relative rounded-3xl overflow-hidden bg-[var(--surface)] border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer reveal-on-scroll reveal-zoom delay-${
                      index + 1
                    }`}
                  >
                    <div className="aspect-video bg-[#111] relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.alt}
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-zinc-400 text-sm max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 delay-100">
                        {project.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-black pt-16 pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16 reveal-on-scroll">
            <div className="max-w-xs">
              <a href="#home" className="flex items-center gap-2 mb-4">
                <Icon icon="solar:code-square-bold-duotone" className="text-[var(--accent)] text-3xl" />
                <span className="font-bold text-xl tracking-tight text-white">
                  UNAMBA <span className="text-[var(--accent)]">Hack</span>
                </span>
              </a>

              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                Empowering the next generation of builders in the Apurímac region through technology, collaboration, and innovation.
              </p>

              <div className="flex items-center gap-4 text-zinc-400">
                <a href="#" className="hover:text-white transition-colors">
                  <Icon icon="mdi:twitter" className="text-xl" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Icon icon="mdi:github" className="text-xl" />
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  <Icon icon="mdi:discord" className="text-xl" />
                </a>
              </div>
            </div>

            <div className="flex gap-16">
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">
                      Starter Kits
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">
                      Mentorship Program
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[var(--accent)] transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
                <ul className="space-y-3 text-sm text-zinc-500">
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Terms of Service
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white transition-colors">
                      Code of Conduct
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600 reveal-on-scroll delay-1">
            <p>&copy; 2026 UNAMBA Hackathon. All rights reserved.</p>
            <p className="flex items-center gap-1">
              Designed with <Icon icon="solar:heart-bold" className="text-zinc-400" /> for the community.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --accent: #facc15;
          --background: #000000;
          --surface: #0a0a0a;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          color: white;
          background: var(--background);
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            "Helvetica Neue", Arial, sans-serif;
        }

        @keyframes slideDownFade {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes drawPath {
          from {
            stroke-dashoffset: 200;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }

        @keyframes floating {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0 rgba(250, 204, 21, 0);
          }
          50% {
            box-shadow: 0 0 40px rgba(250, 204, 21, 0.12);
          }
          100% {
            box-shadow: 0 0 0 rgba(250, 204, 21, 0);
          }
        }

        @keyframes shine {
          from {
            transform: translateX(-120%);
          }
          to {
            transform: translateX(120%);
          }
        }

        .nav-anim {
          animation: slideDownFade 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-text-1 {
          opacity: 0;
          animation: slideUpFade 0.8s ease forwards 0.2s;
        }

        .hero-text-2 {
          opacity: 0;
          animation: slideUpFade 0.8s ease forwards 0.4s;
        }

        .svg-underline path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: drawPath 1.5s cubic-bezier(0.33, 1, 0.68, 1) forwards 0.5s;
        }

        .glass-card {
          background: linear-gradient(180deg, rgba(24, 24, 27, 0.65) 0%, rgba(24, 24, 27, 0.2) 100%);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 20%, rgba(255, 255, 255, 0.08), transparent 80%);
          transform: translateX(-120%);
          pointer-events: none;
        }

        .glass-card:hover::before {
          animation: shine 1.4s ease;
        }

        .hover-glow:hover {
          border-color: rgba(250, 204, 21, 0.45);
          transform: translateY(-10px);
          box-shadow: 0 20px 60px rgba(250, 204, 21, 0.08);
        }

        .gradient-text {
          background: linear-gradient(to right, #fff, #71717a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(56px) scale(0.98);
          filter: blur(10px);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.9s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity, filter;
        }

        .reveal-on-scroll.active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .reveal-left {
          transform: translateX(-80px) translateY(24px);
        }

        .reveal-right {
          transform: translateX(80px) translateY(24px);
        }

        .reveal-zoom {
          transform: scale(0.92);
        }

        .reveal-left.active,
        .reveal-right.active,
        .reveal-zoom.active {
          transform: translateX(0) translateY(0) scale(1);
        }

        .delay-1 {
          transition-delay: 0.08s;
        }

        .delay-2 {
          transition-delay: 0.16s;
        }

        .delay-3 {
          transition-delay: 0.24s;
        }

        .delay-4 {
          transition-delay: 0.32s;
        }

        .float-soft {
          animation: floating 6s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }

        .noise::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px);
          background-size: 18px 18px;
          opacity: 0.2;
          pointer-events: none;
        }
      `}</style>
    </>
  );
}