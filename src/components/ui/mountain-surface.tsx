import { cn } from '@/lib/utils';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

type MountainSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function MountainSurface({ className, ...props }: MountainSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // ── Scene ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#080808');
    scene.fog = new THREE.FogExp2('#080808', 0.0018);

    // ── Camera ─────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(
      55,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      5000
    );
    camera.position.set(0, 280, 900);
    camera.lookAt(0, 80, 0);

    // ── Renderer ───────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // ── Lighting ───────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0x8899bb, 0.5);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xe8eeff, 1.0);
    sun.position.set(-400, 600, 300);
    sun.castShadow = true;
    scene.add(sun);

    const rimLight = new THREE.DirectionalLight(0x3366aa, 0.4);
    rimLight.position.set(400, 200, -300);
    scene.add(rimLight);

    // ── Mountain Geometry ──────────────────────────────────────────────
    const COLS = 180;
    const ROWS = 120;
    const WIDTH = 3200;
    const DEPTH = 2400;

    const geometry = new THREE.PlaneGeometry(WIDTH, DEPTH, COLS - 1, ROWS - 1);
    geometry.rotateX(-Math.PI / 2);

    const basePositions = new Float32Array(geometry.attributes.position.array.length);
    const posArr = geometry.attributes.position.array as Float32Array;

    const noise = (x: number, z: number, _freq: number, amp: number, phase = 0) =>
      Math.sin(x * _freq + phase) * Math.cos(z * _freq * 0.7 + phase * 1.3) * amp;

    const ridgeFn = (v: number) => 1.0 - Math.abs(Math.sin(v));

    for (let i = 0; i < posArr.length; i += 3) {
      const x = posArr[i];
      const z = posArr[i + 2];
      const nx = x / (WIDTH / 2);
      const nz = z / (DEPTH / 2);
      const horizonBias = Math.exp(-Math.pow(nz * 1.4, 2));

      const ridge1 = ridgeFn(nx * 2.1 + 0.3) * ridgeFn(nz * 1.2) * 420 * horizonBias;
      const ridge2 = ridgeFn(nx * 3.5 - 0.8) * ridgeFn(nz * 1.8 + 0.5) * 280 * horizonBias;
      const detail =
        noise(nx * 8, nz * 6, 1, 60) * horizonBias +
        noise(nx * 14, nz * 10, 1, 30) * horizonBias;
      const base = noise(nx * 1.5, nz * 1.0, 1, 80) + noise(nx * 0.8, nz * 0.6, 1, 50);
      const foothills = Math.max(0, -nz * 0.6) * 60 * (1 + noise(nx * 5, nz * 4, 1, 0.5));

      let height = ridge1 + ridge2 + detail + base + foothills;
      const edgeFade =
        Math.max(0, 1 - Math.pow(Math.abs(nx), 3)) *
        Math.max(0, 1 - Math.pow(Math.abs(nz) * 0.8, 4));
      height *= edgeFade;

      posArr[i + 1] = Math.max(0, height);
      basePositions[i + 1] = Math.max(0, height);
    }

    geometry.computeVertexNormals();

    // ── Vertex Colors ──────────────────────────────────────────────────
    const colors = new Float32Array(posArr.length);
    const color = new THREE.Color();

    for (let i = 0; i < posArr.length; i += 3) {
      const h = posArr[i + 1];
      if (h > 320) {
        color.setRGB(
          0.88 + Math.random() * 0.08,
          0.90 + Math.random() * 0.06,
          0.94 + Math.random() * 0.04
        );
      } else if (h > 220) {
        const t = (h - 220) / 100;
        color.setRGB(
          0.38 + t * 0.22 + Math.random() * 0.04,
          0.40 + t * 0.22 + Math.random() * 0.04,
          0.44 + t * 0.24 + Math.random() * 0.03
        );
      } else if (h > 100) {
        const t = (h - 100) / 120;
        color.setRGB(
          0.18 + t * 0.18 + Math.random() * 0.04,
          0.19 + t * 0.18 + Math.random() * 0.04,
          0.22 + t * 0.20 + Math.random() * 0.03
        );
      } else if (h > 20) {
        color.setRGB(
          0.10 + Math.random() * 0.04,
          0.10 + Math.random() * 0.04,
          0.12 + Math.random() * 0.03
        );
      } else {
        color.setRGB(
          0.06 + Math.random() * 0.02,
          0.06 + Math.random() * 0.02,
          0.07 + Math.random() * 0.02
        );
      }
      colors[i] = color.r;
      colors[i + 1] = color.g;
      colors[i + 2] = color.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // ── Material ───────────────────────────────────────────────────────
    const material = new THREE.MeshPhongMaterial({
      vertexColors: true,
      flatShading: true,
      shininess: 8,
      specular: new THREE.Color(0x334455),
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add(mesh);

    // ── Wireframe overlay ──────────────────────────────────────────────
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x334455,
      wireframe: true,
      transparent: true,
      opacity: 0.03,
    });
    const wireMesh = new THREE.Mesh(geometry, wireMat);
    scene.add(wireMesh);

    // ── Stars ──────────────────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starPositions: number[] = [];
    for (let s = 0; s < 800; s++) {
      starPositions.push(
        (Math.random() - 0.5) * 4000,
        Math.random() * 600 + 200,
        (Math.random() - 0.5) * 4000
      );
    }
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 2.5, transparent: true, opacity: 0.6 });
    scene.add(new THREE.Points(starGeo, starMat));

    // ── Mouse tracking — normalized -1..1 ─────────────────────────────
    const mouse = { x: 0, y: 0 };
    const smoothMouse = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Animation ──────────────────────────────────────────────────────
    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.0018;

      // Smooth mouse interpolation (lerp)
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.018;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.018;

      // Mountain vertex animation — 3 wave layers
      const posAttr = geometry.attributes.position;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < arr.length; i += 3) {
        const baseH = basePositions[i + 1];
        if (baseH < 1) continue;
        const xVal = arr[i];
        const zVal = arr[i + 2];

        // Wave A — slow large roll across the range (wind sweeping peaks)
        const waveA =
          Math.sin(xVal * 0.0018 + time * 0.9) *
          Math.cos(zVal * 0.0025 + time * 0.6) *
          14;

        const waveB =
          Math.sin(xVal * 0.005 + time * 1.8 + 1.2) *
          Math.cos(zVal * 0.004 + time * 1.4) *
          5;

        // Wave C — mouse-driven tilt, higher peaks react more
        const heightRatio = Math.min(baseH / 300, 1.0);
        const waveC =
          smoothMouse.x * 35 * heightRatio * Math.sin(zVal * 0.001) +
          smoothMouse.y * 18 * heightRatio * Math.cos(xVal * 0.001);

        arr[i + 1] = baseH + waveA + waveB + waveC;
      }

      posAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      // Camera — base drift + mouse parallax
      const baseCamX = Math.sin(time * 0.12) * 60;
      const baseCamY = 280 + Math.sin(time * 0.07) * 20;

      camera.position.x = baseCamX + smoothMouse.x * 55;
      camera.position.y = baseCamY + smoothMouse.y * 18;
      camera.position.z = 900 - smoothMouse.y * 25;

      camera.lookAt(
        smoothMouse.x * 80,
        80 + smoothMouse.y * 30,
        0
      );

      renderer.render(scene, camera);
    };

    animate();

    // ── Resize ─────────────────────────────────────────────────────────
    const container = containerRef.current;
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      wireMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none absolute inset-0 z-0 w-full h-full', className)}
      {...props}
    />
  );
}
