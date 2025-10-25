// scripts/list.js
let page = 1, totalPages = 1;
let currentFilter = 'All';  // "All" shows everything

document.addEventListener('DOMContentLoaded', async () => {
  setSocial();
  await loadTagsLookup();      // load tag ID -> name mapping
  setupChips();                // set up click handlers for chips
  loadPosts();                 // fetch and render
});

const listEl = document.getElementById('list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function setupChips(){
  const chips = document.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentFilter = (chip.dataset.tag || 'All').trim();
      page = 1;               // reset to first page on filter change
      loadPosts();
    });
  });
}

function render(posts){
  if (!listEl) return;

  // Apply filter client-side by tag name
  const filtered = (currentFilter === 'All')
    ? posts
    : posts.filter(p => tagNames(p).some(n => n?.toLowerCase() === currentFilter.toLowerCase()));

  if (!filtered.length){
    listEl.innerHTML = `<p style="opacity:.7">No posts in “${currentFilter}”.</p>`;
    return;
  }

  listEl.innerHTML = filtered.map(p => {
    const date = fmtDate(p.date);
    const title = p.title?.rendered || 'Untitled';
    const excerpt = (p.excerpt?.rendered || '').replace(/<[^>]*>/g,'').slice(0,180) + '…';
    const badge = tagNames(p)[0] || 'Research';
    return `
      <article class="item">
        <div class="meta"><span>${date}</span><span class="badge">${badge}</span></div>
        <h3><a href="post.html?id=${p.id}&slug=${encodeURIComponent(p.slug)}">${title}</a></h3>
        <p class="excerpt">${excerpt}</p>
        <a class="cta" href="post.html?id=${p.id}&slug=${encodeURIComponent(p.slug)}">Read</a>
      </article>`;
  }).join('');
}

async function loadPosts(){
  const res = await fetch(`${WP_API}/posts?per_page=${CONFIG.POSTS_PER_PAGE}&page=${page}`);
  totalPages = Number(res.headers.get('X-WP-TotalPages')) || 1;
  const posts = await res.json();
  render(posts);

  prevBtn && (prevBtn.disabled = page <= 1);
  nextBtn && (nextBtn.disabled = page >= totalPages);

  prevBtn?.addEventListener('click', ()=>{ if(page>1){ page--; loadPosts(); } });
  nextBtn?.addEventListener('click', ()=>{ if(page<totalPages){ page++; loadPosts(); } });
}
