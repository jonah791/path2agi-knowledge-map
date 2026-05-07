import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { marked } from 'marked';

const TOPICS = [
  [1,'概率论与数理统计','01-probability-and-statistics.md',1],[2,'线性代数','02-linear-algebra.md',1],
  [3,'微积分与优化理论','03-calculus-and-optimization.md',1],[4,'信息论','04-information-theory.md',1],
  [5,'逼近论','05-approximation-theory.md',1],[6,'图论','06-graph-theory.md',1],
  [7,'拓扑与几何','07-topology-and-geometry.md',1],[8,'逻辑学与形式推理','08-logic.md',1],
  [9,'因果推断','09-causal-inference.md',1],[10,'计算机科学','10-computer-science.md',2],
  [11,'数值分析','11-numerical-analysis.md',2],[12,'信号处理','12-signal-processing.md',2],
  [13,'控制论','13-cybernetics.md',2],[14,'复杂性科学','14-complexity-science.md',2],
  [15,'AI 计算硬件与并行计算','15-computing-hardware-and-parallel-computing.md',2],
  [16,'神经科学','16-neuroscience.md',3],[17,'认知科学','17-cognitive-science.md',3],
  [18,'心理学','18-psychology.md',3],[19,'语言学','19-linguistics.md',3],
  [20,'进化生物学','20-evolutionary-biology.md',3],[21,'运筹学','21-operations-research.md',4],
  [22,'博弈论','22-game-theory.md',4],[23,'经济学','23-economics.md',4],
  [24,'统计物理','24-statistical-physics.md',5],[25,'哲学','25-philosophy.md',5],
  [26,'AI 伦理与治理','26-ai-ethics.md',6],[27,'社会学','27-sociology.md',6],
  [28,'法学','28-law.md',6],[29,'人类学','29-anthropology.md',6]
];
const GROUPS = [
  { name:'数学与形式基础', range:'01-09', color:'#8b7aff' },
  { name:'计算与系统工程', range:'10-15', color:'#00d4ff' },
  { name:'认知、生物与语言', range:'16-20', color:'#6bcb77' },
  { name:'决策、交互与社会', range:'21-23', color:'#ff6b9d' },
  { name:'物理与哲学基础', range:'24-25', color:'#ffd93d' },
  { name:'社会科学与人文学科', range:'26-29', color:'#ff8c42' }
];
const GC = ['#8b7aff','#00d4ff','#6bcb77','#ff6b9d','#ffd93d','#ff8c42'];

const TPL = readFileSync('topic.html', 'utf-8');
const CSS_MARKER = '</style>';
const BODY_MARKER = '<div class="layout">';

// Extract CSS from topic.html up to </style>
const css = TPL.slice(TPL.search(/<style>/), TPL.search('</style>') + 8);
const afterHead = TPL.slice(TPL.search('<body>') + 6, TPL.search('<div class="layout">'));

// Wiki link conversion
function convertWikiLinks(md) {
  md = md.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (m, t, txt) => `[${txt}](${t.trim()}.md)`);
  md = md.replace(/\[\[([^\]]+)\]\]/g, (m, t) => `[${t.trim()}](${t.trim()}.md)`);
  return md;
}

function buildTOC(html) {
  const headings = html.match(/<h[23][^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/h[23]>/g) || [];
  const links = [];
  for (const h of headings) {
    const m = h.match(/id="([^"]*)"/);
    const tag = h.startsWith('<h3') ? 'h3' : 'h2';
    const text = h.replace(/<[^>]+>/g, '').trim();
    if (m) links.push({ id: m[1], tag, text });
  }
  return links;
}

function buildSidebarHTML(currentFile) {
  let html = '';
  for (let g = 0; g < GROUPS.length; g++) {
    const items = TOPICS.filter(t => t[3] === g+1);
    const curGroup = TOPICS.find(t => t[2] === currentFile)?.[3] || -1;
    const collapsed = (g+1) !== curGroup ? ' collapsed' : '';
    html += `
      <div class="sidebar-group">
        <div class="sidebar-group-header${collapsed}" data-group="${g}">
          <span class="arrow">&#9660;</span>
          <span class="g-dot" style="background:${GROUPS[g].color}"></span>
          ${GROUPS[g].name} <span style="color:var(--text-dimmer);font-weight:400;font-size:10px">${GROUPS[g].range}</span>
        </div>`;
    for (const t of items) {
      const active = t[2] === currentFile ? ' active' : '';
      const num = String(t[0]).padStart(2,'0');
      const hfile = t[2].replace('.md','.html');
      html += `
        <div class="sidebar-item${active}">
          <span class="sn">${num}</span>
          <a href="${hfile}">${t[1]}</a>
        </div>`;
    }
    html += '</div>';
  }
  return html.replace(/\n\s+/g, '\n');
}

function buildTopicPage(md, file) {
  const currentTopic = TOPICS.find(t => t[2] === file);
  const idx = currentTopic ? TOPICS.indexOf(currentTopic) : -1;

  // YAML front matter
  let fm = {};
  const fmMatch = md.match(/^---\n([\s\S]*?)\n---\n/);
  if (fmMatch) {
    fmMatch[1].replace(/^(\w[\w-]*):\s*(.+)$/gm, (m, k, v) => { fm[k.trim()] = v.trim(); return ''; });
    md = md.slice(fmMatch[0].length);
  }

  // Convert wiki links
  md = convertWikiLinks(md);

  // Fix markdown links to point to .html
  md = md.replace(/\]\(([^)]+)\.md\)/g, (m, p) => {
    if (p.startsWith('http') || p.startsWith('#')) return m;
    return `](${p}.html)`;
  });

  const titleMatch = md.match(/^#\s+(.+)/m);
  const title = titleMatch ? titleMatch[1].replace(/\*\*/g, '') : file;
  const topicNum = currentTopic ? String(currentTopic[0]).padStart(2,'0') : '';

  // Render markdown
  const bodyHtml = marked.parse(md, { breaks: true, gfm: true });

  // Build meta
  const g = currentTopic ? currentTopic[3]-1 : 0;
  let metaHtml = '';
  if (currentTopic) {
    metaHtml = `<div class="topic-meta">
      <span><span class="dot" style="background:${GC[g]}"></span> ${GROUPS[g].name}</span>
      <span>学科 ${topicNum}</span>
      ${fm.category ? `<span>${fm.category}</span>` : ''}
      ${fm.importance ? `<span>重要性: ${fm.importance}</span>` : ''}
      ${fm.date ? `<span>更新: ${fm.date}</span>` : ''}
    </div>`;
  }

  // Build TOC
  const tocLinks = buildTOC(bodyHtml);
  const tocHtml = tocLinks.length > 0
    ? tocLinks.map(l => `<a href="#${l.id}" class="toc-link ${l.tag}">${l.text}</a>`).join('\n')
    : '<span style="color:var(--text-dimmer);font-size:11px">无目录</span>';

  // Extract related topics
  const related = new Set();
  const linkRe = /href="([^"]+)\.html"/g;
  let lm;
  while ((lm = linkRe.exec(bodyHtml)) !== null) {
    const f = lm[1] + '.md';
    const found = TOPICS.find(t => t[2] === f);
    if (found && found[2] !== file) related.add(f);
  }

  // Prev/next navigation
  let prevHtml = '', nextHtml = '';
  if (idx > 0) {
    const prev = TOPICS[idx - 1];
    const pn = String(prev[0]).padStart(2,'0');
    const pf = prev[2].replace('.md','.html');
    prevHtml = `<a href="${pf}"><span class="dir">&#8592; 上一篇</span><span class="name">${pn} ${prev[1]}</span></a>`;
  } else {
    prevHtml = '<a href="index.html"><span class="dir">&#8592; 返回</span><span class="name">知识地图</span></a>';
  }
  if (idx >= 0 && idx < TOPICS.length - 1) {
    const next = TOPICS[idx + 1];
    const nn = String(next[0]).padStart(2,'0');
    const nf = next[2].replace('.md','.html');
    nextHtml = `<a href="${nf}"><span class="dir">下一篇 &#8594;</span><span class="name">${nn} ${next[1]}</span></a>`;
  } else {
    nextHtml = '<a href="index.html"><span class="dir">返回 &#8594;</span><span class="name">知识地图</span></a>';
  }

  // Related topics HTML
  let relatedHtml = '';
  if (related.size > 0) {
    relatedHtml = '<div class="related-section"><h3>相关主题</h3><div class="related-grid">';
    for (const f of [...TOPICS].filter(t => related.has(t[2]))) {
      const num = String(f[0]).padStart(2,'0');
      const hf = f[2].replace('.md','.html');
      relatedHtml += `<a href="${hf}" class="related-item">
        <span class="r-num">${num}</span>
        <span class="r-name">${f[1]}</span>
      </a>`;
    }
    relatedHtml += '</div></div>';
  }

  // Build full HTML
  const renderedContent = metaHtml + bodyHtml + relatedHtml +
    `<div class="bottom-nav">${prevHtml}${nextHtml}</div>`;

  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} — Path2AGI</title>
${css}
</head>
<body>
${afterHead}
<nav class="sidebar" id="sidebar">
  ${buildSidebarHTML(file)}
</nav>
<div class="sidebar-overlay" id="sidebarOverlay"></div>
<main class="main">
  <div class="content">
    ${renderedContent}
  </div>
</main>
<aside class="toc-sidebar" id="tocSidebar">
  <div class="toc-label">目录</div>
  ${tocHtml}
</aside>
</div>
<button class="back-top" id="backTop" aria-label="Back to top">&uarr;</button>
<button class="toc-toggle" id="tocToggle">目录</button>
<div class="toc-drawer" id="tocDrawer"><div id="tocDrawerList">${tocHtml}</div></div>
<script>
// Initial sidebar state: collapse non-active groups
const curGroup = document.querySelector('.sidebar-item.active')?.closest('.sidebar-group');
document.querySelectorAll('.sidebar-group').forEach(g => {
  if (g !== curGroup) {
    g.querySelector('.sidebar-group-header')?.classList.add('collapsed');
    g.querySelectorAll('.sidebar-item').forEach(i => i.style.display = 'none');
  }
});
document.querySelectorAll('.sidebar-group-header').forEach(h => {
  h.addEventListener('click', () => {
    const collapsed = h.classList.toggle('collapsed');
    h.parentElement.querySelectorAll('.sidebar-item').forEach(i => i.style.display = collapsed ? 'none' : 'flex');
  });
});
document.getElementById('menuBtn')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.toggle('open');
  document.getElementById('sidebarOverlay')?.classList.toggle('open');
});
document.getElementById('sidebarOverlay')?.addEventListener('click', () => {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('open');
});
const tocLinks = document.querySelectorAll('.toc-link');
const headings = document.querySelectorAll('h2,h3');
function updateTOC() {
  let current = '';
  for (let i = headings.length-1; i>= 0; i--) {
    if (headings[i].getBoundingClientRect().top <= 120) { current = headings[i].id; break; }
  }
  tocLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  document.getElementById('progress-bar').style.width = Math.min((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100, 100) + '%';
  updateTOC();
});
window.addEventListener('scroll', () => {
  document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
});
document.getElementById('backTop').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
document.getElementById('tocToggle').addEventListener('click', function() {
  document.getElementById('tocDrawer').classList.toggle('open');
});
document.addEventListener('click', function(e) {
  const drawer = document.getElementById('tocDrawer');
  const btn = document.getElementById('tocToggle');
  if (!drawer?.contains(e.target) && !btn?.contains(e.target)) drawer?.classList.remove('open');
});
</script>
</body>
</html>`;

  return fullHtml;
}

// === Build all topics ===
const DIR = '.';
const files = readdirSync(DIR).filter(f => /^\d{2}-.+\.md$/.test(f));

let generated = [];
for (const file of files) {
  const md = readFileSync(file, 'utf-8');
  const html = buildTopicPage(md, file);
  const outFile = file.replace('.md', '.html');
  writeFileSync(outFile, html);
  generated.push(file);
  console.log(`  ${file} -> ${outFile}`);
}

console.log(`\nGenerated ${generated.length} topic HTML files.`);
console.log('Done!');
