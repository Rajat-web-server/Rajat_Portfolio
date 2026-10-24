import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SiGithub} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { GlassCard } from "@/components/glass/glass-card";
import { ContactForm } from "@/components/contact/contact-form";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch.",
};

const linkClass =
  "flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground";

export default function ContactPage() {
  const { email, github, linkedin } = siteConfig.socials;

  return (
    <div className="space-y-6">
      <GlassCard className="space-y-2 p-8">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="text-muted-foreground">
          Have a project or a question? Send me a message.
        </p>
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-[1fr_16rem]">
        <GlassCard className="relative p-8">
          <ContactForm />
        </GlassCard>

        <GlassCard className="h-fit space-y-4">
          <h2 className="font-semibold">Elsewhere</h2>
          <a href={`mailto:${email}`} className={linkClass}>
            <Mail className="size-4" /> Email
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <SiGithub className="size-4" /> GitHub
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <FaLinkedin className="size-4" /> LinkedIn
          </a>
        </GlassCard>
      </div>
    </div>
  );
}