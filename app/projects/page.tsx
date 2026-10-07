import type { Metadata } from "next";
import { CTA, PageHead } from "@/components/PageHead";
import { ProjectJar } from "@/components/ProjectJar";
import { projects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Open-source tools and products from Quillmoth: lantern, cocoon, Nilavu, mothball and wick.",
};

export default function ProjectsPage() {
  const released = projects.filter((p) => p.status === "released").length;
  return (
    <>
      <PageHead
        eyebrow="open source · products"
        title="Projects"
        lede="Things we made because we needed them. Most are free; one or two are growing into products."
        labels={["field jar", `${projects.length} specimens`, `${released} released`, "MIT licensed"]}
      />

      <section className="wrap intro-split">
        <p className="eyebrow">the stuff nobody asked for</p>
        <div>
          <h2>We can&apos;t keep a good tool in a drawer.</h2>
          <p>
            If we build something for a client project and it would help other people, we clean it up and release it. The
            ones people keep using become products.
          </p>
        </div>
      </section>

      <section className="wrap" aria-label="Open-source projects">
        <ProjectJar projects={projects} />
      </section>

      <CTA eyebrow="have a problem worth solving?" title="Let's build it." />
    </>
  );
}
