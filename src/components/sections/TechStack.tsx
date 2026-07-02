import HeadlineReveal from "@/components/motion/HeadlineReveal";

interface ToolItem {
  name: string;
  desc: string;
}

interface StackCategory {
  name: string;
  tools: ToolItem[];
}

const categories: StackCategory[] = [
  {
    name: "Machine Learning",
    tools: [
      { name: "PyTorch", desc: "Model architecture & training" },
      { name: "Scikit-Learn", desc: "Feature prep & tabular pipelines" },
      { name: "MLflow", desc: "Model tracking & registry" },
      { name: "Weights & Biases", desc: "Training run observability" },
      { name: "SHAP / LIME", desc: "Model explanation calculations" },
    ],
  },
  {
    name: "Computer Vision",
    tools: [
      { name: "YOLOv8 / v10", desc: "Object detection models" },
      { name: "OpenCV", desc: "Image manipulation & streams" },
      { name: "DeepSORT", desc: "Multi-object ID tracking" },
      { name: "Detectron2", desc: "Pixel instance segmentation" },
      { name: "Supervision", desc: "Computer vision helper utilities" },
    ],
  },
  {
    name: "LLMs",
    tools: [
      { name: "LangChain", desc: "RAG & LLM chain orchestrations" },
      { name: "OpenAI API", desc: "Context modeling & embeddings" },
      { name: "Hugging Face", desc: "Transformers fine-tuning" },
      { name: "FAISS / Pinecone", desc: "High-scale vector retrievals" },
      { name: "Ollama", desc: "Local model serving integrations" },
    ],
  },
  {
    name: "Backend",
    tools: [
      { name: "Python / FastAPI", desc: "Main asynchronous API layer" },
      { name: "Node.js", desc: "Distributed event worker services" },
      { name: "PostgreSQL", desc: "Primary relational storage" },
      { name: "Redis", desc: "High-speed caching & queue logs" },
      { name: "Docker", desc: "Containerized environments" },
    ],
  },
  {
    name: "Frontend",
    tools: [
      { name: "Next.js 15", desc: "Server side rendering & frameworks" },
      { name: "TypeScript", desc: "Type-safe interface logic" },
      { name: "Tailwind CSS", desc: "Utility-first design styling" },
      { name: "Framer Motion", desc: "Premium animation layers" },
      { name: "Streamlit", desc: "ML prototype application UIs" },
    ],
  },
  {
    name: "Cloud",
    tools: [
      { name: "AWS / GCP", desc: "GPU compute & storage servers" },
      { name: "Vercel", desc: "Frontend server deployments" },
      { name: "GitHub Actions", desc: "Automated CI/CD workflows" },
      { name: "Nginx", desc: "Reverse proxy & static route host" },
      { name: "Linux / Bash", desc: "Core systems administration" },
    ],
  },
];

export default function TechStack() {
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

        <div className="grid grid-cols-1 border-t hairline lg:grid-cols-2">
          {categories.map((category) => (
            <section
              key={category.name}
              className="border-b hairline py-9 lg:odd:border-r lg:odd:pr-10 lg:even:pl-10 lg:[border-color:var(--color-line)]"
            >
              <h3 className="font-[var(--font-text-stack)] text-xl font-semibold leading-tight tracking-normal text-[var(--color-text)]">
                {category.name}
              </h3>

              <div className="mt-7">
                {category.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="grid grid-cols-12 gap-4 border-t hairline py-4"
                  >
                    <div className="col-span-5">
                      <p className="text-sm font-semibold leading-snug text-[var(--color-text)]">
                        {tool.name}
                      </p>
                    </div>
                    <div className="col-span-7">
                      <p className="text-sm leading-snug text-muted">
                        {tool.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
