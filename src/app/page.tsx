import { Hero } from "@/components/Hero";
import { Mail, Send, ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { client } from "@/sanity/lib/client";

export default async function Home() {
  const projects = await client.fetch(`*[_type == "project"]{
    _id,
    title,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    description,
    techStack,
    githubLink,
    liveLink
  }`);

  return (
    <div className="flex flex-col gap-32 pb-20">
      <Hero />

      {/* Portfolio Grid placeholder */}
      <section id="work" className="scroll-mt-24">
        <h2 className="text-3xl tracking-tight mb-12 font-semibold">
          Selected Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project: any) => (
            <div
              key={project._id}
              className="group flex flex-col glass rounded-3xl overflow-hidden hover:bg-white/5 transition-all"
            >
              <div className="relative aspect-video w-full overflow-hidden border-b border-white/5">
                {project.imageUrl && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex flex-col p-6 sm:p-8 flex-grow">
                <h3 className="text-2xl font-medium mb-3">{project.title}</h3>
                {project.description && (
                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                )}

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack?.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium rounded-full border border-white/10 bg-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:text-white text-muted-foreground transition-colors"
                      >
                        <FaGithub className="w-4 h-4" /> Source
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-sm font-medium hover:text-white text-muted-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="scroll-mt-24 glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-3xl relative z-10">
          <h2 className="text-3xl tracking-tight mb-6 font-semibold">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-balance">
            I am a Frontend Engineer with over 5 years of professional
            experience building dynamic, performant, and highly scalable user
            interfaces. I specialize in modern web architectures, robust state
            management, and crafting premium user experiences.
          </p>
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "React.js",
                "Next.js",
                "TypeScript",
                "Redux",
                "Zustand",
                "GraphQL",
                "Hasura",
                "Supabase",
                "Tailwind CSS",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium shadow-sm hover:bg-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="scroll-mt-24 text-center max-w-2xl mx-auto"
      >
        <h2 className="text-4xl tracking-tight mb-6 font-semibold">
          Let's Connect
        </h2>
        <p className="text-muted-foreground mb-10 text-lg">
          I'm always open to discussing new opportunities, creative projects, or
          collaboration. Feel free to reach out through any of these platforms!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:alfiansafrudin436@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3.5 rounded-full glass hover:bg-white/10 hover:scale-105 transition-all"
          >
            <Mail className="w-5 h-5" />
            <span className="text-sm font-medium">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/alfian-safrudin/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3.5 rounded-full glass hover:bg-white/10 hover:scale-105 transition-all"
          >
            <FaLinkedin className="w-5 h-5" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="https://t.me/alfiansafrudin"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3.5 rounded-full glass hover:bg-white/10 hover:scale-105 transition-all"
          >
            <Send className="w-5 h-5" />
            <span className="text-sm font-medium">Telegram</span>
          </a>
          <a
            href="https://github.com/alfiansafrudin436"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-6 py-3.5 rounded-full glass hover:bg-white/10 hover:scale-105 transition-all"
          >
            <FaGithub className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </section>
    </div>
  );
}
