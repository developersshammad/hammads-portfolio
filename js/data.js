/*
 * Portfolio content — edit this file to change details, projects and skills.
 * live:   public URL of the running project ('' hides the button)
 * source: code repository URL ('' shows "code on request")
 */
window.SITE = {
  name: 'Muhammad Hammad',
  role: 'Full-Stack Developer',
  email: 'hammad.10.muhammad@gmail.com',
  phone: '+92 319 8548825',                          // shown on the page
  phoneHref: 'tel:+923198548825',                    // used for the call link
  github: 'https://github.com/developersshammad',
  linkedin: '',                                      // e.g. 'https://www.linkedin.com/in/your-name'
  available: true,
};

/* cat: 'php' | 'frontend' | 'creative' | 'dotnet'   preview: 'fanhub' | 'pc' | 'fur' | 'cover' */
window.PROJECTS = [
  {
    id: 'fanhub', title: 'Fan Hub Plus', cat: 'php', label: 'Fandom community platform', featured: true, preview: 'fanhub',
    role: 'Full-stack: design, frontend, backend and database',
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap 5'],
    live: 'https://fanhubplus.site.je/?i=2', host: 'fanhubplus.site.je', source: '',
    summary: 'One home for Anime, Gaming, Movies, TV Shows, K-Pop, Comics, Manga and Cosplay fans, with accounts, profiles and content built around what each person follows.',
    overview: 'Fan Hub Plus brings eight fandom communities into a single product. Members sign in once, follow what they care about and move between articles, character profiles, media and events from the same dark, responsive interface.',
    features: ['User authentication with sign-up and sign-in', 'Member profiles and personalised content', 'Content management for articles and character profiles', 'Search and filtering across eight fandom categories', 'Multimedia sections and an events area', 'Responsive, dark-themed interface'],
    focus: ['One data model that works for very different fandoms', 'Navigation that stays clear as content grows', 'Account features that feel personal without getting complicated'],
    colors: ['#2a0b22', '#ff4f8b'],
  },
  {
    id: 'pccentre', title: 'PC Centre', cat: 'frontend', label: 'E-commerce interface', featured: true, preview: 'pc',
    role: 'Frontend: UI design and JavaScript interactions',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive design', 'Vercel'],
    live: 'https://pc-centre.vercel.app/', host: 'pc-centre.vercel.app', source: '',
    summary: 'A dark, modern storefront for PC parts and tech, focused on making product browsing quick and pleasant on any screen.',
    overview: 'PC Centre focuses on the shopping experience itself: browsing categories, scanning products and reading product details in a clean dark layout that adapts from wide monitors down to phones.',
    features: ['Product browsing with category navigation', 'Product cards and product detail UI', 'Interactive behaviour written in JavaScript', 'Responsive layout from desktop to mobile'],
    focus: ['Clear product hierarchy so specs and prices are easy to scan', 'Interactions that feel quick without heavy libraries', 'Layouts that hold together across screen sizes'],
    colors: ['#0b1d2e', '#3aa0ff'],
  },
  {
    id: 'furshield', title: 'FurShield', cat: 'php', label: 'PHP web application', featured: true, preview: 'fur',
    role: 'Full-stack: PHP pages, backend logic and UI',
    stack: ['PHP', 'MySQL', 'HTML5', 'CSS3', 'JavaScript'],
    live: 'https://furshieldpet.site.je/furshield/index.php', host: 'furshieldpet.site.je', source: '',
    summary: 'A pet-focused website built in PHP, with dynamic pages and a structure designed around a MySQL-backed application.',
    overview: 'FurShield is a practical PHP project for the pet space. Pages are rendered on the server, with code organised the way a MySQL-driven application needs to be, wrapped in a responsive interface.',
    features: ['PHP backend rendering dynamic pages', 'Application structure oriented around MySQL data', 'Reusable page components', 'Interactive, responsive UI'],
    focus: ['Server-side PHP that deploys on standard hosting', 'Separating layout, logic and data access', 'A friendly interface for a non-technical audience'],
    colors: ['#0f2219', '#4ade80'],
  },
  {
    id: 'abyss', title: 'Abyss', cat: 'creative', label: 'Scroll storytelling', featured: true, preview: 'cover',
    role: 'Concept, design and frontend development',
    stack: ['GSAP', 'ScrollTrigger', 'Canvas', 'SVG'],
    live: 'https://claude.ai/artifact/VwfULZMH7CG4VEbyGhLsCA', host: 'Live preview', source: '',
    summary: 'A scroll dive from the ocean surface to 10,935 m, with a live depth gauge and deep-sea animals revealed by a torch.',
    overview: 'Abyss turns scrolling into a descent. A depth model maps scroll position to metres, and pressure, light, temperature and page colour follow it. Each ocean zone has its own animated scene.',
    features: ['Depth, pressure, light and temperature update as you scroll', 'Canvas fish school that flees the cursor', 'SVG jellyfish animated in JavaScript', 'Torch reveal in the dark zones and closing trench walls'],
    focus: ['Keeping several animation loops smooth by running only what is on screen', 'Real depth facts placed at the right scroll position', 'A calm, still version for reduced-motion users'],
    colors: ['#041a2e', '#8ff3ff'],
  },
  {
    id: 'solenne', title: 'Solenne', cat: 'creative', label: 'Product page', preview: 'cover',
    stack: ['GSAP', 'CSS 3D', 'SVG'], live: 'https://claude.ai/artifact/ESpWMY2V1aX6KGJpMFrwNd', host: 'Live preview', source: '',
    summary: 'A product page for a fictional watch that shows your real time and comes apart in 3D as you scroll.',
    features: ['Watch built from HTML and CSS layers, showing live time', 'Pinned exploded view of crystal, hands, dial, movement and case', 'SVG movement with spinning gears', 'Dial switcher that animates the whole page theme'],
    colors: ['#1c2a33', '#b9d3e1'],
  },
  {
    id: 'beatgrid', title: 'Beatgrid', cat: 'creative', label: 'Web Audio drum machine', preview: 'cover',
    stack: ['JavaScript', 'Web Audio API', 'Canvas'], live: 'https://claude.ai/artifact/FDKRuGVtzSm6vLgxTXgBKT', host: 'Live preview', source: '',
    summary: 'A 16-step drum machine where every sound is synthesised live and the visuals react to each hit.',
    features: ['Seven synthesised drum voices, no audio files', 'Look-ahead scheduler on the audio clock, with swing', 'Presets, random, mute and shareable beat links', 'Canvas visuals synced to the audio'],
    colors: ['#1a0d08', '#ff5a36'],
  },
  {
    id: 'flowfield', title: 'Flowfield', cat: 'creative', label: 'Generative art studio', preview: 'cover',
    stack: ['JavaScript', 'Canvas', 'Perlin noise'], live: 'https://claude.ai/artifact/P9v8hQKF4G5Cknp4mbqpWn', host: 'Live preview', source: '',
    summary: 'Thousands of particles follow a noise field you can tune, stir with the cursor and save as an image.',
    features: ['Seeded 3D Perlin noise with four field shapes', 'Presets, six palettes and live sliders', 'Drag to stir, attract or repel particles', 'Share links and PNG export'],
    colors: ['#0b0b10', '#ff7a59'],
  },
  {
    id: 'pulse', title: 'Pulse Admin', cat: 'frontend', label: 'Analytics dashboard', preview: 'cover',
    stack: ['Bootstrap 5', 'Chart.js', 'JavaScript'], live: 'https://claude.ai/artifact/XQG9GLTzq1AkXrnNcoJChG', host: 'Live preview', source: '',
    summary: 'A sales dashboard with live charts, KPI comparisons and a sortable, searchable orders table.',
    features: ['Chart.js charts with 7/30/90-day ranges', 'Orders table with search, filter, sort, pagination and CSV export', 'Order modal with ship and refund actions', 'Light and dark mode'],
    colors: ['#1e1b4b', '#818cf8'],
  },
  {
    id: 'seatpick', title: 'SeatPick', cat: 'frontend', label: 'Cinema booking', preview: 'cover',
    stack: ['Bootstrap 5', 'JavaScript'], live: 'https://claude.ai/artifact/T3KE9kAHfsXny8JDP3Sium', host: 'Live preview', source: '',
    summary: 'Pick a film, a showtime and exact seats on a 152-seat map, then get a printable ticket.',
    features: ['Seat map with three price tiers', 'Live price summary and seat limit', 'Validated checkout and printable ticket', 'Bookings saved; cancelling releases seats'],
    colors: ['#1a1405', '#ffc531'],
  },
  {
    id: 'invoicely', title: 'Invoicely', cat: 'frontend', label: 'Invoice generator', preview: 'cover',
    stack: ['Bootstrap 5', 'JavaScript', 'Print CSS'], live: 'https://claude.ai/artifact/JCJRmDNVnvGHycQnqcCu6H', host: 'Live preview', source: '',
    summary: 'Write an invoice and watch an A4 preview update live, then save it as a PDF.',
    features: ['Live preview with logo upload', 'Tax, discount and five currencies', 'Autosave and invoice history', 'Print stylesheet for clean PDFs'],
    colors: ['#0f2a3f', '#7dd3fc'],
  },
  {
    id: 'quizcraft', title: 'QuizCraft', cat: 'frontend', label: 'Quiz app', preview: 'cover',
    stack: ['Bootstrap 5', 'JavaScript'], live: 'https://claude.ai/artifact/HyUKHFWNNHPHfB11WfPMNX', host: 'Live preview', source: '',
    summary: 'Timed quizzes on HTML, CSS, JavaScript, PHP and MySQL, with an explanation for every answer.',
    features: ['30 questions, shuffled every round', 'Per-question timer, score and streak', 'Answer review and local leaderboard', 'Keyboard controls'],
    colors: ['#2a1d05', '#fde047'],
  },
  {
    id: 'kanban', title: 'Kanban Flow', cat: 'frontend', label: 'Task board', preview: 'cover',
    stack: ['HTML5', 'CSS3', 'JavaScript'], live: 'https://claude.ai/artifact/2wxHTiGqdRkcYJ2uwCai1N', host: 'Live preview', source: '',
    summary: 'A drag-and-drop task board with priorities, due dates and search, saved in the browser.',
    features: ['Drag and drop between four columns', 'Priorities, tags and overdue highlighting', 'Search, filter, JSON import and export', 'Light and dark theme'],
    colors: ['#0e1a33', '#6d8dff'],
  },
  {
    id: 'typerush', title: 'TypeRush', cat: 'frontend', label: 'Typing test', preview: 'cover',
    stack: ['JavaScript', 'Canvas'], live: 'https://claude.ai/artifact/34hSBPJyJ1e7ajTk7xawZ7', host: 'Live preview', source: '',
    summary: 'A typing speed test with live WPM, accuracy and a results graph drawn on canvas.',
    features: ['15, 30 and 60 second modes', 'Per-letter error highlighting', 'WPM-over-time chart', 'Personal bests saved locally'],
    colors: ['#1f1a10', '#f2b134'],
  },
  {
    id: 'stockroom', title: 'StockRoom', cat: 'php', label: 'Inventory system', preview: 'cover',
    stack: ['PHP 8', 'MySQL', 'PDO'], live: '', host: '', source: '',
    summary: 'Inventory management with secure login, stock in/out tracking and low-stock alerts.',
    features: ['Dashboard with value, low-stock list and a 14-day chart', 'Products CRUD with search, filters and pagination', 'Transactions with row locking, so stock never goes negative', 'CSRF protection and prepared statements throughout'],
    colors: ['#14231a', '#86efac'],
  },
  {
    id: 'linklite', title: 'LinkLite', cat: 'php', label: 'URL shortener', preview: 'cover',
    stack: ['PHP 8', 'MySQL', 'SVG'], live: '', host: '', source: '',
    summary: 'Short links with custom aliases and click analytics: referrers, devices and a 30-day chart.',
    features: ['Clean short URLs via Apache rewrite', 'Click tracking with bot filtering', 'Server-rendered SVG charts', 'Rate limiting and hashed visitor data'],
    colors: ['#2b1408', '#fb923c'],
  },
  {
    id: 'clinic', title: 'Clinic Booking API', cat: 'dotnet', label: 'ASP.NET Core API', preview: 'cover',
    stack: ['C#', 'ASP.NET Core 8', 'EF Core', 'SQLite'], live: '', host: '', source: '',
    summary: 'A REST API for doctors, patients and appointments, with a dashboard that books real slots.',
    features: ['Minimal API endpoints documented with Swagger', 'Slot availability from doctor working hours', 'Double-booking protection inside a transaction', 'Validation responses and a status workflow'],
    colors: ['#062a2a', '#2dd4bf'],
  },
  {
    id: 'expense', title: 'Expense Tracker', cat: 'dotnet', label: 'C# desktop app', preview: 'cover',
    stack: ['C#', 'WinForms', '.NET 8'], live: '', host: '', source: '',
    summary: 'A Windows app for tracking spending against a monthly budget, with a category breakdown.',
    features: ['Add, edit and delete with validation', 'Monthly budget with progress and remaining amount', 'Category chart drawn with GDI+', 'CSV export and JSON storage'],
    colors: ['#101b33', '#60a5fa'],
  },
];

window.SKILLS = [
  { name: 'HTML5', group: 'frontend', icon: 'fa-brands fa-html5', desc: 'Semantic, accessible markup as the base of every page.' },
  { name: 'CSS3', group: 'frontend', icon: 'fa-brands fa-css3-alt', desc: 'Grid, flexbox, custom properties, 3D transforms and motion.' },
  { name: 'JavaScript', group: 'frontend', icon: 'fa-brands fa-js', desc: 'Vanilla JS for interactions, canvas, audio and fetch-based UI.' },
  { name: 'jQuery', group: 'frontend', icon: 'fa-solid fa-dollar-sign', desc: 'Maintaining and extending existing jQuery codebases.' },
  { name: 'Bootstrap 5', group: 'frontend', icon: 'fa-brands fa-bootstrap', desc: 'Grid and components for fast, consistent layouts.' },
  { name: 'Responsive design', group: 'frontend', icon: 'fa-solid fa-mobile-screen', desc: 'Interfaces that work from 320px phones to wide monitors.' },
  { name: 'GSAP', group: 'frontend', icon: 'fa-solid fa-wave-square', desc: 'Timelines, ScrollTrigger and pinned scroll scenes.' },
  { name: 'Three.js', group: 'frontend', icon: 'fa-solid fa-cube', desc: 'Lightweight WebGL scenes, like the one at the top of this page.' },
  { name: 'Canvas', group: 'frontend', icon: 'fa-solid fa-paintbrush', desc: 'Particles, generative art and custom charts.' },
  { name: 'UI/UX', group: 'frontend', icon: 'fa-solid fa-pen-ruler', desc: 'Planning flows and hierarchy before writing code.' },
  { name: 'PHP', group: 'backend', icon: 'fa-brands fa-php', desc: 'Server-rendered pages, forms, sessions and authentication.' },
  { name: 'MySQL', group: 'backend', icon: 'fa-solid fa-database', desc: 'Schema design, joins, transactions and prepared statements.' },
  { name: 'C#', group: 'backend', icon: 'fa-solid fa-hashtag', desc: 'Desktop apps and APIs in the .NET ecosystem.' },
  { name: 'ASP.NET Core', group: 'backend', icon: 'fa-solid fa-server', desc: 'Minimal APIs, EF Core and Swagger documentation.' },
  { name: 'Backend architecture', group: 'backend', icon: 'fa-solid fa-diagram-project', desc: 'Separating routing, logic and data access cleanly.' },
  { name: 'Database development', group: 'backend', icon: 'fa-solid fa-table', desc: 'Modelling data so features stay simple to build.' },
  { name: 'Visual Studio 2022', group: 'tools', icon: 'fa-brands fa-microsoft', desc: 'C# projects, debugging and solution management.' },
  { name: 'Visual Studio 2026', group: 'tools', icon: 'fa-brands fa-microsoft', desc: 'The current Visual Studio release for .NET work.' },
  { name: 'VS Code', group: 'tools', icon: 'fa-solid fa-code', desc: 'Day-to-day editor for PHP and frontend work.' },
  { name: 'Git & GitHub', group: 'tools', icon: 'fa-brands fa-git-alt', desc: 'Version control, branches and hosted repositories.' },
];

window.TIMELINE = [
  { title: 'Full-stack build', where: 'Fan Hub Plus', kind: 'Independent project', text: 'Planned and built a multi-category community platform end to end: authentication, profiles, content management, search and filtering on a PHP and MySQL backend.', tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap 5'] },
  { title: 'Frontend development', where: 'PC Centre', kind: 'Independent project', text: 'Designed and coded a dark e-commerce interface for PC hardware with category browsing, product UI and JavaScript interactions, deployed on Vercel.', tags: ['HTML5', 'CSS3', 'JavaScript'] },
  { title: 'PHP web development', where: 'FurShield', kind: 'Independent project', text: 'Built a pet-focused PHP website with dynamic, server-rendered pages organised around a MySQL-oriented structure.', tags: ['PHP', 'MySQL'] },
  { title: 'Creative frontend', where: 'Abyss, Solenne, Beatgrid, Flowfield', kind: 'Independent projects', text: 'Scroll storytelling, 3D product scenes, Web Audio synthesis and generative art, built without frameworks to push what plain HTML, CSS and JavaScript can do.', tags: ['GSAP', 'Canvas', 'Web Audio'] },
  { title: 'Application development', where: 'C# and .NET', kind: 'Ongoing', text: 'Writing C# in Visual Studio 2022 and 2026: a WinForms expense tracker and an ASP.NET Core booking API alongside web work.', tags: ['C#', '.NET 8', 'ASP.NET Core'] },
];

window.PROCESS = [
  { title: 'Understand', text: 'Who uses it, what they need to get done, and what data sits underneath.' },
  { title: 'Plan', text: 'Page structure, database tables and the few interactions that matter most.' },
  { title: 'Build', text: 'Backend and frontend together, so the UI is shaped by real data from day one.' },
  { title: 'Ship', text: 'Deploy, test on real devices, then refine based on how people use it.' },
];
