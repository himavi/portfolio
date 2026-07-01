import { Reveal } from "@/components/motion/reveal";
import { Section } from "@/components/section";

const roles = [
  {
    role: "Software Engineering Intern",
    org: "IIT Jammu",
    period: "May 2025 – Jul 2025",
    points: [
      "Built a MERN stack Lost & Found platform adopted by 500+ students, enabling real-time item reporting, search, and claim tracking.",
      "Improved frontend responsiveness by 40% using React.js and Tailwind CSS; developed 12+ RESTful APIs secured with JWT authentication.",
      "Modeled 5+ MongoDB collections, integrated image uploads via Cloudinary, and automated email notifications achieving a 95% delivery rate.",
      "Collaborated with IIT Jammu mentors and managed version control and production deployment using Git.",
    ],
  },
];

export function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Experience">
      <ol className="relative space-y-10 border-l border-border pl-6">
        {roles.map((role, index) => (
          <li key={`${role.role}-${role.period}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[27px] h-2.5 w-2.5 rounded-full border border-accent bg-background"
            />
            <Reveal delay={index * 0.05}>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-display text-lg font-semibold text-fg">
                  {role.role}{" "}
                  <span className="text-muted">· {role.org}</span>
                </h3>
                <p className="font-mono text-xs tracking-wide text-muted">
                  {role.period}
                </p>
              </div>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-muted marker:text-accent">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
