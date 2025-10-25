// scripts/list.js
document.addEventListener('DOMContentLoaded', () => {
  setSocial();
  loadPosts();
});

const listEl = document.getElementById('list');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let page = 1, totalPages = 1;

function extractTags(p){ return Array.isArray(p.tags_names) ? p.tags_names : []; }
function postUrl(p){ return `./post.html?id=${p.id}&slug=${encodeURIComponent(p.slug)}`; }

function render(posts){
  if(!listEl) return;
  if(!Array.isArray(posts) || posts.length === 0){
    listEl.innerHTML = '<p style="color:#a1a1aa">No posts yet.</p>'; return;
  }
  listEl.innerHTML = posts.map(p => {
    const date = fmtDate(p.date);
    const badge = extractTags(p)[0] || 'Research';
    const title = p.title?.rendered || 'Untitled';
    const excerpt = (p.excerpt?.rendered || '').replace(/<[^>]*>/g,'').slice(0,180) + '…';
    return `
      <article class="item">
        <div class="meta"><span>${date}</span><span class="badge">${badge}</span></div>
        <h3>${title}</h3>
        <p class="excerpt">${excerpt}</p>
        <a class="cta" href="${postUrl(p)}">Read</a>
      </article>`;
  }).join('');
}

async function loadPosts(){
  const res = await fetch(`${WP_API}/posts?per_page=${CONFIG.POSTS_PER_PAGE}&page=${page}`);
  totalPages = Number(res.headers.get('X-WP-TotalPages')) || 1;
  const posts = await res.json();
  render(posts);
  if(prevBtn) prevBtn.disabled = page <= 1;
  if(nextBtn) nextBtn.disabled = page >= totalPages;
}

prevBtn?.addEventListener('click', ()=>{ if(page>1){ page--; loadPosts(); } });
nextBtn?.addEventListener('click', ()=>{ if(page<totalPages){ page++; loadPosts(); } });

loadPosts();
