// scripts/post.js
document.addEventListener('DOMContentLoaded', () => {
  setSocial();
  loadPost();
});

function getQuery(){
  const q = new URLSearchParams(location.search);
  return { id: q.get('id'), slug: q.get('slug') };
}

async function loadPost(){
  const { id, slug } = getQuery();
  let post;
  if(id){
    post = await (await fetch(`${WP_API}/posts/${id}`)).json();
  }else if(slug){
    const arr = await (await fetch(`${WP_API}/posts?slug=${encodeURIComponent(slug)}`)).json();
    post = arr?.[0];
  }
  const contentEl = document.getElementById('content') || document.getElementById('post');
  const titleEl = document.getElementById('postTitle');
  const metaEl  = document.getElementById('meta');
  const tagsEl  = document.getElementById('tags');
  const hero    = document.getElementById('hero');

  if(!post){ contentEl.innerHTML = '<p>Not found.</p>'; return; }

  const title = post.title?.rendered || 'Untitled';
  const html  = post.content?.rendered || '';
  const date  = fmtDate(post.date);
  const tags  = post.tags_names || [];

  if(titleEl) titleEl.innerHTML = title;
  if(metaEl)  metaEl.textContent = `${date} • ${estimateReadingTime(html)} min read`;
  if(tagsEl)  tagsEl.innerHTML = tags.map(t=>`<span class="tag">${t}</span>`).join('');
  if(contentEl) contentEl.innerHTML = html;

  const cover = extractFirstImage(html);
  if(hero && cover){ hero.innerHTML = `<img src="${cover}" alt="">`; }

  if(window.twttr?.widgets){ window.twttr.widgets.load(contentEl); }
}

function extractFirstImage(html){
  const div = document.createElement('div'); div.innerHTML = html;
  const img = div.querySelector('img'); return img ? img.getAttribute('src') : null;
}
function estimateReadingTime(html){
  const words = html.replace(/<[^>]*>/g,' ').trim().split(/\s+/).length;
  return Math.max(1, Math.round(words/200));
}
