/**
 * Hero "core": a dark metallic form inside a wireframe shell, with orbit rings
 * and a sparse particle field. Reacts to cursor and scroll; pauses when hidden.
 */
// Loaded as a classic script (so it also works when index.html is opened from disk);
// Three.js itself is pulled in with a dynamic import from the CDN.
let THREE;
(async () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    try {
        THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
    } catch (err) {
        canvas.classList.add('is-fallback');
        return;
    }
    init(canvas);
})();

function init(canvas) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const small = window.innerWidth < 768;
    const lite = coarse || small;

    let renderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: !lite, alpha: true, powerPreference: 'high-performance' });
    } catch (err) {
        canvas.classList.add('is-fallback');
        return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.055);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const root = new THREE.Group();      // positioned per layout
    const core = new THREE.Group();      // rotated by input
    root.add(core);
    scene.add(root);

    /* Inner faceted solid, gently displaced */
    const innerGeo = new THREE.IcosahedronGeometry(1.3, lite ? 2 : 3);
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x1b1c20, metalness: 0.92, roughness: 0.3, flatShading: true });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    core.add(inner);
    const posAttr = innerGeo.attributes.position;
    const basePos = posAttr.array.slice();

    /* Wireframe shell + nodes */
    const shellGeo = new THREE.IcosahedronGeometry(1.95, 1);
    const shell = new THREE.LineSegments(
        new THREE.EdgesGeometry(shellGeo),
        new THREE.LineBasicMaterial({ color: 0xededea, transparent: true, opacity: 0.16 })
    );
    const nodes = new THREE.Points(
        shellGeo,
        new THREE.PointsMaterial({ color: 0xededea, size: 0.05, transparent: true, opacity: 0.85, sizeAttenuation: true })
    );
    core.add(shell, nodes);

    /* Orbit rings + one ice-coloured satellite (the only accent in the scene) */
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xededea, transparent: true, opacity: 0.14 });
    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.005, 6, 200), ringMat);
    const ringB = new THREE.Mesh(new THREE.TorusGeometry(3.15, 0.004, 6, 200), ringMat.clone());
    ringB.material.opacity = 0.08;
    ringA.rotation.set(Math.PI * 0.42, 0.2, 0);
    ringB.rotation.set(Math.PI * 0.58, -0.35, 0.3);
    const ringPivot = new THREE.Group();
    ringPivot.add(ringA, ringB);
    root.add(ringPivot);

    const satellite = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0x9cc8ff })
    );
    ringA.add(satellite);

    /* Particle field */
    const count = lite ? 380 : 1200;
    const pPos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const r = 3.5 + Math.random() * 7;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
        pPos[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
        color: 0x9a9ba0, size: 0.022, transparent: true, opacity: 0.7, sizeAttenuation: true, depthWrite: false,
    }));
    scene.add(particles);

    /* Lighting: one hard key, a cool rim, a faint fill */
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 4, 5);
    const rim = new THREE.PointLight(0x9cc8ff, 14, 14, 2);
    rim.position.set(-3.5, -1.5, -2.5);
    const fill = new THREE.PointLight(0xededea, 5, 16, 2);
    fill.position.set(3, -3, 3);
    scene.add(key, rim, fill);

    /* Layout */
    let baseScale = 1;
    function layout() {
        const w = canvas.clientWidth || window.innerWidth;
        const h = canvas.clientHeight || window.innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        const desktop = w >= 992;
        root.position.set(desktop ? 2.4 : 0, desktop ? 0.25 : 1.1, 0);
        baseScale = desktop ? 1 : (w < 576 ? 0.7 : 0.85);
        root.scale.setScalar(baseScale * introScale);
    }

    /* Input */
    let tx = 0, ty = 0, mx = 0, my = 0, scrollP = 0;
    if (!coarse) {
        window.addEventListener('pointermove', (e) => {
            tx = (e.clientX / window.innerWidth) * 2 - 1;
            ty = (e.clientY / window.innerHeight) * 2 - 1;
        }, { passive: true });
    }
    const onScroll = () => { scrollP = Math.min(window.scrollY / window.innerHeight, 1.5); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Intro */
    let introScale = reduced ? 1 : 0.55;
    if (!reduced && window.gsap) {
        const o = { s: introScale };
        window.gsap.to(o, { s: 1, duration: 2.4, ease: 'expo.out', delay: 0.15, onUpdate: () => { introScale = o.s; } });
    } else {
        introScale = 1;
    }

    function displace(t) {
        const arr = posAttr.array;
        for (let i = 0; i < arr.length; i += 3) {
            const x = basePos[i], y = basePos[i + 1], z = basePos[i + 2];
            const n = Math.sin(x * 2.1 + t) * Math.cos(y * 2.4 + t * 0.8) * Math.sin(z * 1.8 + t * 1.15);
            const k = 1 + n * 0.085;
            arr[i] = x * k; arr[i + 1] = y * k; arr[i + 2] = z * k;
        }
        posAttr.needsUpdate = true;
    }

    const clock = new THREE.Clock();
    function frame() {
        const t = clock.getElapsedTime();
        mx += (tx - mx) * 0.045;
        my += (ty - my) * 0.045;

        if (!lite) displace(t * 0.55);

        core.rotation.y = t * 0.12 + mx * 0.55;
        core.rotation.x = my * 0.35 + scrollP * 0.7;
        shell.rotation.y = -t * 0.07;
        shell.rotation.z = t * 0.03;
        nodes.rotation.copy(shell.rotation);

        ringPivot.rotation.y = t * 0.05 + mx * 0.2;
        ringPivot.rotation.x = my * 0.15;
        const a = t * 0.45;
        satellite.position.set(Math.cos(a) * 2.7, Math.sin(a) * 2.7, 0);

        particles.rotation.y = t * 0.012 + mx * 0.08;
        particles.rotation.x = my * 0.05;

        root.scale.setScalar(baseScale * introScale * (1 - scrollP * 0.12));
        camera.position.z = 9 + scrollP * 2.2;
        camera.position.y = -scrollP * 0.6;

        renderer.render(scene, camera);
    }

    /* Loop only while visible */
    let running = false;
    let rafId = 0;
    const loop = () => { frame(); rafId = requestAnimationFrame(loop); };
    const start = () => { if (!running && !reduced) { running = true; clock.start(); loop(); } };
    const stop = () => { running = false; cancelAnimationFrame(rafId); };

    layout();
    if (reduced) {
        frame();
    } else {
        const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
        io.observe(canvas);
        document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => { layout(); if (!running) frame(); }, 120);
    });

    canvas.classList.add('is-ready');
}
