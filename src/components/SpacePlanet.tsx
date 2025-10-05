import { useEffect, useRef } from "react";

export const SpacePlanet = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let rotation = 0;
    let isDragging = false;
    let lastX = 0;

    const planetRadius = 120;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const drawPlanet = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Outer glow
      const glowGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        planetRadius * 0.8,
        centerX,
        centerY,
        planetRadius * 1.5
      );
      glowGradient.addColorStop(0, "rgba(168, 85, 247, 0.4)");
      glowGradient.addColorStop(0.5, "rgba(236, 72, 153, 0.2)");
      glowGradient.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planetRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Planet base
      const planetGradient = ctx.createRadialGradient(
        centerX - planetRadius * 0.3,
        centerY - planetRadius * 0.3,
        planetRadius * 0.1,
        centerX,
        centerY,
        planetRadius
      );
      planetGradient.addColorStop(0, "rgba(147, 197, 253, 1)");
      planetGradient.addColorStop(0.4, "rgba(168, 85, 247, 0.9)");
      planetGradient.addColorStop(0.7, "rgba(109, 40, 217, 0.8)");
      planetGradient.addColorStop(1, "rgba(88, 28, 135, 0.9)");

      ctx.fillStyle = planetGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
      ctx.fill();

      // Rotating stripes
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotation);
      ctx.globalAlpha = 0.3;

      for (let i = 0; i < 8; i++) {
        const y = (i - 4) * (planetRadius / 4);
        const waveOffset = Math.sin(rotation + i) * 10;

        ctx.beginPath();
        ctx.ellipse(waveOffset, y, planetRadius, planetRadius / 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? "rgba(236, 72, 153, 0.5)" : "rgba(59, 130, 246, 0.5)";
        ctx.fill();
      }

      ctx.restore();

      // Highlight
      const highlightGradient = ctx.createRadialGradient(
        centerX - planetRadius * 0.4,
        centerY - planetRadius * 0.4,
        0,
        centerX - planetRadius * 0.4,
        centerY - planetRadius * 0.4,
        planetRadius * 0.6
      );
      highlightGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)");
      highlightGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = highlightGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, planetRadius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      if (!isDragging) {
        rotation += 0.005;
      }
      drawPlanet();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      lastX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastX;
      rotation += deltaX * 0.01;
      lastX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="cursor-grab active:cursor-grabbing animate-float"
      />
      <p className="text-center text-muted-foreground text-sm mt-4">
        Drag to rotate
      </p>
    </div>
  );
};
