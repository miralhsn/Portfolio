import HeadlineReveal from "@/components/motion/HeadlineReveal";

interface ToolItem {
  name: string;
  desc: string;
  logo: LogoId;
}

interface StackCategory {
  name: string;
  tools: ToolItem[];
}

type LogoId =
  | "pytorch"
  | "sklearn"
  | "mlflow"
  | "wandb"
  | "shap"
  | "yolo"
  | "opencv"
  | "deepsort"
  | "detectron"
  | "supervision"
  | "langchain"
  | "openai"
  | "huggingface"
  | "faiss"
  | "ollama"
  | "python"
  | "node"
  | "postgres"
  | "redis"
  | "docker"
  | "next"
  | "typescript"
  | "tailwind"
  | "motion"
  | "streamlit"
  | "cloud"
  | "vercel"
  | "github"
  | "nginx"
  | "linux";

const categories: StackCategory[] = [
  {
    name: "Machine Learning",
    tools: [
      { name: "PyTorch", desc: "Model architecture & training", logo: "pytorch" },
      { name: "Scikit-Learn", desc: "Feature prep & tabular pipelines", logo: "sklearn" },
      { name: "MLflow", desc: "Model tracking & registry", logo: "mlflow" },
      { name: "Weights & Biases", desc: "Training run observability", logo: "wandb" },
      { name: "SHAP / LIME", desc: "Model explanation calculations", logo: "shap" },
    ],
  },
  {
    name: "Computer Vision",
    tools: [
      { name: "YOLOv8 / v10", desc: "Object detection models", logo: "yolo" },
      { name: "OpenCV", desc: "Image manipulation & streams", logo: "opencv" },
      { name: "DeepSORT", desc: "Multi-object ID tracking", logo: "deepsort" },
      { name: "Detectron2", desc: "Pixel instance segmentation", logo: "detectron" },
      { name: "Supervision", desc: "Computer vision helper utilities", logo: "supervision" },
    ],
  },
  {
    name: "LLMs",
    tools: [
      { name: "LangChain", desc: "RAG & LLM chain orchestrations", logo: "langchain" },
      { name: "OpenAI API", desc: "Context modeling & embeddings", logo: "openai" },
      { name: "Hugging Face", desc: "Transformers fine-tuning", logo: "huggingface" },
      { name: "FAISS / Pinecone", desc: "High-scale vector retrievals", logo: "faiss" },
      { name: "Ollama", desc: "Local model serving integrations", logo: "ollama" },
    ],
  },
  {
    name: "Backend",
    tools: [
      { name: "Python / FastAPI", desc: "Main asynchronous API layer", logo: "python" },
      { name: "Node.js", desc: "Distributed event worker services", logo: "node" },
      { name: "PostgreSQL", desc: "Primary relational storage", logo: "postgres" },
      { name: "Redis", desc: "High-speed caching & queue logs", logo: "redis" },
      { name: "Docker", desc: "Containerized environments", logo: "docker" },
    ],
  },
  {
    name: "Frontend",
    tools: [
      { name: "Next.js 15", desc: "Server side rendering & frameworks", logo: "next" },
      { name: "TypeScript", desc: "Type-safe interface logic", logo: "typescript" },
      { name: "Tailwind CSS", desc: "Utility-first design styling", logo: "tailwind" },
      { name: "Framer Motion", desc: "Premium animation layers", logo: "motion" },
      { name: "Streamlit", desc: "ML prototype application UIs", logo: "streamlit" },
    ],
  },
  {
    name: "Cloud",
    tools: [
      { name: "AWS / GCP", desc: "GPU compute & storage servers", logo: "cloud" },
      { name: "Vercel", desc: "Frontend server deployments", logo: "vercel" },
      { name: "GitHub Actions", desc: "Automated CI/CD workflows", logo: "github" },
      { name: "Nginx", desc: "Reverse proxy & static route host", logo: "nginx" },
      { name: "Linux / Bash", desc: "Core systems administration", logo: "linux" },
    ],
  },
];

const tools = categories.flatMap((category) =>
  category.tools.map((tool) => ({ ...tool, category: category.name })),
);

function TechLogo({ id }: { id: LogoId }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.65,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (id) {
    case "pytorch":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M22 6c-2 4.2-9 9.6-9 18a9 9 0 0 0 18 0c0-4.5-2.6-7.6-5.2-10.2" />
          <path {...common} d="M26.6 6.8h.1" />
        </svg>
      );
    case "sklearn":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <ellipse {...common} cx="17" cy="20" rx="9" ry="5" transform="rotate(-24 17 20)" />
          <ellipse {...common} cx="24" cy="20" rx="9" ry="5" transform="rotate(24 24 20)" />
          <path {...common} d="M12 27h16" />
        </svg>
      );
    case "mlflow":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M10 28V12l10 8 10-8v16" />
          <path {...common} d="M15 24h10" />
        </svg>
      );
    case "wandb":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="m8 13 4.5 14 5-10 5 10 4.5-14" />
          <path {...common} d="M30 18h2M32 14v8" />
        </svg>
      );
    case "shap":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M10 28h20M12 23h16M15 18h10M18 13h4" />
          <path {...common} d="M10 12v17M30 12v17" />
        </svg>
      );
    case "yolo":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M9 12V9h3M28 9h3v3M31 28v3h-3M12 31H9v-3" />
          <path {...common} d="m13 15 7 7 7-7M20 22v7" />
        </svg>
      );
    case "opencv":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle {...common} cx="20" cy="12" r="5" />
          <circle {...common} cx="13" cy="25" r="5" />
          <circle {...common} cx="27" cy="25" r="5" />
        </svg>
      );
    case "deepsort":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <rect {...common} x="9" y="10" width="9" height="9" />
          <rect {...common} x="22" y="21" width="9" height="9" />
          <path {...common} d="M18 14.5h5M17 19l6 4" />
        </svg>
      );
    case "detectron":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M10 11h20v18H10z" />
          <path {...common} d="M16 25V15h4.4a5 5 0 0 1 0 10H16ZM25 17h4M25 23h4" />
        </svg>
      );
    case "supervision":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M10 15c4-5 16-5 20 0M10 25c4 5 16 5 20 0" />
          <circle {...common} cx="20" cy="20" r="3.5" />
        </svg>
      );
    case "langchain":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M16 13h-2a7 7 0 0 0 0 14h5" />
          <path {...common} d="M24 27h2a7 7 0 0 0 0-14h-5" />
          <path {...common} d="M15 20h10" />
        </svg>
      );
    case "openai":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M20 8a7 7 0 0 1 6 3.4 7 7 0 0 1 5.2 8.8 7 7 0 0 1-3.6 8.4 7 7 0 0 1-9 2.7 7 7 0 0 1-8.8-3.7 7 7 0 0 1-1-9.4A7 7 0 0 1 20 8Z" />
          <path {...common} d="M15 14.5 25 20l-10 5.5M25 14.5 15 20l10 5.5" />
        </svg>
      );
    case "huggingface":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle {...common} cx="20" cy="20" r="11" />
          <path {...common} d="M14 17h.1M26 17h.1M15 24c3 3 7 3 10 0" />
        </svg>
      );
    case "faiss":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M11 29V11h18M11 20h13M11 11l18 18" />
        </svg>
      );
    case "ollama":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M13 29V15a7 7 0 0 1 14 0v14" />
          <path {...common} d="M16 29V18h8v11M16 12l-3-4M24 12l3-4" />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M20 8h6a5 5 0 0 1 5 5v5H17a5 5 0 0 0-5 5v1" />
          <path {...common} d="M20 32h-6a5 5 0 0 1-5-5v-5h14a5 5 0 0 0 5-5v-1" />
          <path {...common} d="M23 12h.1M17 28h.1" />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="m20 7 12 7v12l-12 7-12-7V14l12-7Z" />
          <path {...common} d="M15 25V15l10 10V15" />
        </svg>
      );
    case "postgres":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M13 27c-2-3-3-7-2-11 1-5 5-8 10-7 5 1 8 5 8 10 0 5-2 9-6 12" />
          <path {...common} d="M20 19c3 0 6-2 6-5M17 17h.1M24 17h.1" />
        </svg>
      );
    case "redis":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="m20 9 12 5-12 5-12-5 12-5Z" />
          <path {...common} d="m8 20 12 5 12-5M8 26l12 5 12-5" />
        </svg>
      );
    case "docker":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M8 21h22c0 6-5 10-12 10-6 0-9-3-10-10Z" />
          <path {...common} d="M12 17h4v4h-4zM17 17h4v4h-4zM22 17h4v4h-4zM17 12h4v4h-4zM31 18c2-1 3-1 5 0" />
        </svg>
      );
    case "next":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle {...common} cx="20" cy="20" r="12" />
          <path {...common} d="M15 26V14l11 14V14" />
        </svg>
      );
    case "typescript":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M10 10h20v20H10z" />
          <path {...common} d="M15 16h10M20 16v13M25 26c1.2 1.2 4 1.3 4-1 0-3-5-1.5-5-5 0-2.2 3-2.4 4.6-1.2" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M8 20c3-6 8-8 14-5 3 1.5 5 1.5 8-1" />
          <path {...common} d="M10 27c3-6 8-8 14-5 3 1.5 5 1.5 8-1" />
        </svg>
      );
    case "motion":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M8 28 16 12h8l-8 16M24 28l8-16" />
        </svg>
      );
    case "streamlit":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M12 14h16M10 20h20M12 26h16" />
          <path {...common} d="m22 9-5 22" />
        </svg>
      );
    case "cloud":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M13 27h15a6 6 0 0 0 0-12 9 9 0 0 0-17 4 4 4 0 0 0 2 8Z" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="m20 9 13 22H7L20 9Z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <circle {...common} cx="20" cy="20" r="11" />
          <path {...common} d="M16 28c0-3 2-4 4-4s4 1 4 4M16 13c-2-1-3-1-5-1 0 2 1 4 2 5M24 13c2-1 3-1 5-1 0 2-1 4-2 5" />
        </svg>
      );
    case "nginx":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="m20 7 12 7v12l-12 7-12-7V14l12-7Z" />
          <path {...common} d="M14 26V14l12 12V14" />
        </svg>
      );
    case "linux":
      return (
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <path {...common} d="M14 29c-2-4 0-9 2-13 1-2 1-7 4-7s3 5 4 7c2 4 4 9 2 13" />
          <path {...common} d="M16 29h8M17 17h.1M23 17h.1" />
        </svg>
      );
    default:
      return null;
  }
}

function LogoRail({
  items,
  reverse = false,
}: {
  items: typeof tools;
  reverse?: boolean;
}) {
  const repeated = [...items, ...items];

  return (
    <div className="logo-rail border-y hairline" aria-label="Technology logo slider">
      <div className={`logo-track ${reverse ? "logo-track-reverse" : ""}`}>
        {repeated.map((tool, index) => (
          <div className="logo-item" key={`${tool.name}-${index}`}>
            <span className="logo-mark" aria-hidden="true">
              <TechLogo id={tool.logo} />
            </span>
            <span className="logo-copy">
              <span className="logo-name">{tool.name}</span>
              <span className="logo-meta">{tool.category}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const firstRail = tools.filter((_, index) => index % 2 === 0);
  const secondRail = tools.filter((_, index) => index % 2 === 1);

  return (
    <section
      id="stack"
      className="relative border-b hairline bg-[var(--color-bg)] section-space"
      aria-label="Technology Stack Section"
    >
      <div className="site-shell">
        <div className="editorial-grid mb-14 md:mb-20">
          <div className="col-span-12 md:col-span-4">
            <div className="micro-label">
              03 // TECHNICAL TOOLKIT
            </div>
          </div>
          <div className="col-span-12 md:col-span-8">
            <HeadlineReveal
              lines={[
                <span key="systems">Systems</span>,
                <span key="capability">Capability<span className="text-accent">.</span></span>,
              ]}
            />
          </div>
        </div>

        <div className="space-y-5 overflow-hidden">
          <LogoRail items={firstRail} />
          <LogoRail items={secondRail} reverse />
        </div>

      </div>
    </section>
  );
}
