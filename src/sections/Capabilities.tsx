import TextAnimation from "@/components/ui/scroll-text";

type CapabilityPanel = {
  eyebrow: string;
  title: string;
  description: string;
  theme: "dark" | "light";
  image: string;
  items?: string[];
};

const panels: CapabilityPanel[] = [
  {
    eyebrow: "/CAPABILITIES",
    title: "I know what a strong product build actually needs.",
    description:
      "Clear flows, sharp interfaces, stable backend structure, and enough polish that the product feels intentional instead of assembled.",
    theme: "dark",
    image: "/projects/orange-iss.jpg",
  },
  {
    eyebrow: "/LAYER 01",
    title: "FULL-STACK WEB APPS\nMOBILE APPS",
    description:
      "End-to-end systems across web and mobile, built around real usage rather than isolated screens.",
    theme: "light",
    image: "/projects/fiesta.jpg",
    items: [
      "React / Next.js / NestJS / MongoDB",
      "React Native / Maps / QR / API Integration",
    ],
  },
  {
    eyebrow: "/LAYER 02",
    title: "DASHBOARDS & ADMIN\nBACKEND SYSTEMS",
    description:
      "Operational surfaces and structured server logic where reliability matters as much as the interface.",
    theme: "dark",
    image: "/projects/arkan.jpg",
    items: [
      "Role-Based UI / Filters / Workflow Logic",
      "REST APIs / Auth / Databases / Clean Architecture",
    ],
  },
  {
    eyebrow: "/LAYER 03",
    title: "UI/UX INTERFACES\nPRODUCT PROTOTYPES",
    description:
      "Polished interface work and fast product shaping for MVPs, demos, and complete flows.",
    theme: "light",
    image: "/projects/webank.jpg",
    items: [
      "Figma / Motion / Responsive / Interaction Polish",
      "Fast MVPs / Startup Demos / Working Flows",
    ],
  },
  {
    eyebrow: "/FINAL",
    title: "STRUCTURE FIRST.\nPOLISH ON TOP.",
    description:
      "The work is strongest when the product feels clear, the system feels organized, and the interaction details are taken seriously.",
    theme: "dark",
    image: "/projects/tonights-movie.jpg",
  },
];

function GridOverlay({ light = false }: { light?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f22_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f22_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      style={{ opacity: light ? 0.16 : 0.1 }}
    />
  );
}

export function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-[#050504]">
      <article className="relative">
        {panels.map((panel, index) => {
          const isLight = panel.theme === "light";

          return (
            <section
              key={panel.eyebrow}
              className={`sticky top-0 flex h-screen items-center justify-center overflow-hidden ${
                index === 0 ? "" : ""
              }`}
              style={{ zIndex: 20 + index }}
            >
              <div
                className={`relative h-[88vh] w-[94%] overflow-hidden border shadow-[0_40px_160px_rgba(0,0,0,0.32)] md:w-[90%] lg:w-[86%] ${
                  index === 0
                    ? "rounded-[24px]"
                    : "rounded-t-[24px] rounded-b-none"
                } ${
                  isLight
                    ? "border-black/10 bg-[#e9e3d8] text-[#11110f]"
                    : "border-white/10 bg-slate-950 text-[#f7f3ea]"
                }`}
              >
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className={`absolute inset-0 ${
                    isLight
                      ? "bg-[linear-gradient(90deg,rgba(233,227,216,0.92)_0%,rgba(233,227,216,0.86)_36%,rgba(233,227,216,0.92)_100%)]"
                      : "bg-[linear-gradient(90deg,rgba(2,6,23,0.9)_0%,rgba(2,6,23,0.78)_36%,rgba(2,6,23,0.92)_100%)]"
                  }`}
                />
                <div
                  className={`absolute inset-0 ${
                    isLight
                      ? "bg-[linear-gradient(180deg,rgba(233,227,216,0.1)_0%,rgba(233,227,216,0.18)_42%,rgba(233,227,216,0.82)_100%)]"
                      : "bg-[linear-gradient(180deg,rgba(2,6,23,0.14)_0%,rgba(2,6,23,0.22)_42%,rgba(2,6,23,0.84)_100%)]"
                  }`}
                />
                <GridOverlay light={isLight} />

                <div className="relative flex h-full flex-col justify-between px-6 py-8 md:px-10 md:py-10 lg:px-14 lg:py-12">
                  <div className={`flex items-center justify-between border-b pb-4 ${isLight ? "border-black/10" : "border-white/10"}`}>
                    <TextAnimation
                      as="p"
                      text={panel.eyebrow}
                      lineAnime
                      classname={`font-mono text-[10px] uppercase tracking-[0.18em] ${isLight ? "text-black/55" : "text-[#d7ff62]"}`}
                      variants={{
                        hidden: { filter: "blur(6px)", opacity: 0, y: 16 },
                        visible: {
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.2 },
                        },
                      }}
                    />
                    <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${isLight ? "text-black/35" : "text-white/35"}`}>
                      Scroll
                    </span>
                  </div>

                  <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[minmax(0,0.68fr)_minmax(280px,0.32fr)] lg:gap-16">
                    <div>
                      <TextAnimation
                        as="h2"
                        text={panel.title}
                        lineAnime
                        classname={`whitespace-pre-line text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl ${isLight ? "text-[#11110f]" : "text-[#f7f3ea]"}`}
                        variants={{
                          hidden: { filter: "blur(8px)", opacity: 0, y: 24 },
                          visible: {
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.24 },
                          },
                        }}
                      />
                    </div>

                    <div className="space-y-6">
                      <TextAnimation
                        as="p"
                        text={panel.description}
                        lineAnime
                        classname={`text-base leading-8 md:text-lg ${isLight ? "text-black/70" : "text-[#9a9386]"}`}
                        variants={{
                          hidden: { filter: "blur(6px)", opacity: 0, y: 18 },
                          visible: {
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.22 },
                          },
                        }}
                      />

                      {panel.items && (
                        <div className="space-y-3">
                          {panel.items.map((item) => (
                            <div
                              key={item}
                              className={`rounded-[16px] border px-4 py-4 font-mono text-[11px] uppercase tracking-[0.12em] ${
                                isLight
                                  ? "border-black/10 bg-white/40 text-black/65"
                                  : "border-white/10 bg-white/[0.03] text-[#c6bdab]"
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`border-t pt-4 font-mono text-[10px] uppercase tracking-[0.18em] ${isLight ? "border-black/10 text-black/35" : "border-white/10 text-white/35"}`}>
                    Layer {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </article>
    </section>
  );
}
