"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { CaseStudyData } from "@/components/SlideOverCaseStudy";

gsap.registerPlugin(ScrollTrigger);

interface CurvedProjectCarouselProps {
  projects: CaseStudyData[];
  onSelect: (project: CaseStudyData) => void;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function drawWrappedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  let line = "";
  let offsetY = y;

  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    const width = context.measureText(testLine).width;

    if (width > maxWidth && line) {
      context.fillText(line, x, offsetY);
      line = word;
      offsetY += lineHeight;
    } else {
      line = testLine;
    }

    if (index === words.length - 1 && line) {
      context.fillText(line, x, offsetY);
    }
  });

  return offsetY + lineHeight;
}

function createProjectTexture(project: CaseStudyData, index: number) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1360;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  context.fillStyle = "#07080a";
  context.fillRect(0, 0, canvas.width, canvas.height);

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "rgba(216, 209, 194, 0.12)");
  gradient.addColorStop(0.48, "rgba(247, 246, 240, 0.02)");
  gradient.addColorStop(1, "rgba(216, 209, 194, 0.08)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(247, 246, 240, 0.18)";
  context.lineWidth = 2;
  context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

  context.strokeStyle = "rgba(247, 246, 240, 0.08)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(78, 238);
  context.lineTo(canvas.width - 78, 238);
  context.moveTo(78, 1118);
  context.lineTo(canvas.width - 78, 1118);
  context.stroke();

  context.fillStyle = "rgba(247, 246, 240, 0.12)";
  context.font = "400 220px Arial Narrow, Arial, sans-serif";
  context.fillText(String(index + 1).padStart(2, "0"), 66, 204);

  context.fillStyle = "#d8d1c2";
  context.font = "700 31px Arial, sans-serif";
  context.letterSpacing = "5px";
  context.fillText(project.status.toUpperCase(), 74, 316);

  context.fillStyle = "rgba(247, 246, 240, 0.44)";
  context.font = "700 26px Arial, sans-serif";
  context.fillText(project.id.toUpperCase(), 74, 378);

  context.letterSpacing = "0px";
  context.fillStyle = "#f7f6f0";
  context.font = "400 116px Arial Narrow, Arial, sans-serif";
  const titleBottom = drawWrappedText(context, project.name, 70, 540, 880, 108);

  context.fillStyle = "#d8d1c2";
  context.font = "700 37px Arial, sans-serif";
  const taglineBottom = drawWrappedText(context, project.tagline, 76, titleBottom + 46, 844, 48);

  context.fillStyle = "rgba(247, 246, 240, 0.66)";
  context.font = "400 34px Arial, sans-serif";
  const descriptionBottom = drawWrappedText(
    context,
    project.shortDescription,
    76,
    taglineBottom + 84,
    846,
    53,
  );

  context.fillStyle = "rgba(247, 246, 240, 0.44)";
  context.font = "700 25px Arial, sans-serif";
  drawWrappedText(context, project.techStack.join(" / "), 76, Math.max(descriptionBottom + 112, 1060), 850, 38);

  context.fillStyle = "#f7f6f0";
  context.font = "700 30px Arial, sans-serif";
  context.fillText("Case Study", 76, 1236);
  context.textAlign = "right";
  context.fillText("Explore", 1004, 1236);
  context.textAlign = "left";

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}

function ArcGuide() {
  const line = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const radius = 8.2;

    for (let i = -48; i <= 48; i += 1) {
      const angle = i * 0.018;
      points.push(new THREE.Vector3(Math.sin(angle) * radius, -2.72, Math.cos(angle) * radius - radius));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: "#d8d1c2",
      transparent: true,
      opacity: 0.18,
    });

    return new THREE.Line(geometry, material);
  }, []);

  useEffect(() => {
    return () => {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    };
  }, [line]);

  return <primitive object={line} />;
}

function ProjectCardMesh({
  project,
  index,
  total,
  progressRef,
  onSelect,
}: {
  project: CaseStudyData;
  index: number;
  total: number;
  progressRef: React.MutableRefObject<number>;
  onSelect: (project: CaseStudyData) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => createProjectTexture(project, index), [index, project]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame(() => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    const travel = progressRef.current * Math.max(total - 1, 1);
    const signedSlot = index - travel;
    const angle = signedSlot * 0.64;
    const radius = 8.2;
    const centerWeight = 1 - Math.min(Math.abs(angle) / 1.24, 1);
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius - radius;
    const y = -Math.abs(angle) * 0.42;
    const scale = 0.88 + centerWeight * 0.16;

    mesh.position.lerp(new THREE.Vector3(x, y, z), 0.12);
    mesh.rotation.y = THREE.MathUtils.lerp(mesh.rotation.y, -angle * 0.92, 0.12);
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, angle * 0.045, 0.1);
    mesh.scale.setScalar(THREE.MathUtils.lerp(mesh.scale.x, scale, 0.12));
    material.opacity = THREE.MathUtils.lerp(material.opacity, 0.34 + centerWeight * 0.66, 0.12);
  });

  return (
    <mesh
      ref={meshRef}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(project);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.classList.add("project-card-hovering");
      }}
      onPointerOut={() => document.body.classList.remove("project-card-hovering")}
    >
      <planeGeometry args={[3.35, 4.22, 18, 18]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={0.65}
        toneMapped={false}
      />
    </mesh>
  );
}

function CarouselScene({
  projects,
  progressRef,
  onSelect,
}: {
  projects: CaseStudyData[];
  progressRef: React.MutableRefObject<number>;
  onSelect: (project: CaseStudyData) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.32) * 0.018;
  });

  return (
    <group ref={groupRef}>
      <ArcGuide />
      {projects.map((project, index) => (
        <ProjectCardMesh
          key={project.id}
          project={project}
          index={index}
          total={projects.length}
          progressRef={progressRef}
          onSelect={onSelect}
        />
      ))}
    </group>
  );
}

function ReducedMotionProjects({ projects, onSelect }: CurvedProjectCarouselProps) {
  return (
    <div className="site-shell pb-[var(--section-space-tight)]">
      <div className="border-b hairline">
        {projects.map((project, index) => (
          <button
            key={project.id}
            type="button"
            onClick={() => onSelect(project)}
            data-cursor="VIEW"
            className="focus-ring grid w-full grid-cols-12 gap-4 border-t hairline py-7 text-left md:py-10"
          >
            <span className="micro-label col-span-2 md:col-span-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="col-span-10 md:col-span-4">
              <span className="micro-label mb-3 block">{project.id}</span>
              <span className="display-type block text-[clamp(2.5rem,6vw,5.5rem)] text-[var(--color-text)]">
                {project.name}
              </span>
            </span>
            <span className="col-span-12 md:col-span-7">
              <span className="micro-label mb-4 block text-accent">{project.status}</span>
              <span className="body-small block max-w-[42rem]">{project.shortDescription}</span>
              <span className="mt-5 block text-xs font-semibold leading-relaxed text-dim">
                {project.techStack.join(" / ")}
              </span>
              <span className="mt-6 flex items-center justify-between text-sm font-bold text-[var(--color-text)]">
                <span>Case Study</span>
                <span className="text-dim">Explore</span>
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function CurvedProjectCarousel({ projects, onSelect }: CurvedProjectCarouselProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const proxy = { progress: 0 };
    const context = gsap.context(() => {
      gsap.to(proxy, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => `+=${Math.max(window.innerHeight * 2.1, 1300)}`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      });
    }, rootRef);

    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    return () => document.body.classList.remove("project-card-hovering");
  }, []);

  if (reducedMotion) {
    return <ReducedMotionProjects projects={projects} onSelect={onSelect} />;
  }

  return (
    <div ref={rootRef} className="project-carousel-shell" data-cursor="VIEW">
      <Canvas
        camera={{ position: [0, 0.2, 9.3], fov: 39, near: 0.1, far: 32 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#050608", 9, 18]} />
        <CarouselScene projects={projects} progressRef={progressRef} onSelect={onSelect} />
      </Canvas>
    </div>
  );
}
