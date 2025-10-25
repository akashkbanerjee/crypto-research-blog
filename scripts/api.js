// scripts/api.js
const CONFIG = {
  WP_SITE: 'akashkbanerjee.wordpress.com',  // e.g. akashresearch.wordpress.com
  POSTS_PER_PAGE: 9,
  SOCIAL: {
    twitter: 'https://twitter.com/akashkbanerjee',
    linkedin: 'https://www.linkedin.com/in/akashkbanerjee/',
    github: 'https://github.com/akashkbanerjee'
  }
};

const WP_API = `https://public-api.wordpress.com/wp/v2/sites/${CONFIG.WP_SITE}`;

function fmtDate(iso){
  try{
    return new Date(iso).toLocaleDateString(undefined,{ year:'numeric', month:'short', day:'2-digit' });
  }catch{ return iso; }
}
function qs(sel){ return document.querySelector(sel); }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }
function setSocial(){
  const {twitter, linkedin, github} = CONFIG.SOCIAL;
  qs('#twitterLink')?.setAttribute('href', twitter);
  qs('#linkedinLink')?.setAttribute('href', linkedin);
  qs('#githubLink')?.setAttribute('href', github);
  const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();
}
// --- Tag helpers (IDs -> Names) ---
let TAGS_LOOKUP = {};

async function loadTagsLookup() {
  try {
    const res = await fetch(`${WP_API}/tags?per_page=100`);
    const items = await res.json();
    TAGS_LOOKUP = Object.fromEntries(items.map(t => [t.id, t.name]));
  } catch (e) {
    TAGS_LOOKUP = {};
  }
}

// Return array of tag names for a post
function tagNames(post) {
  // Some WP setups (Jetpack) already include names:
  if (Array.isArray(post.tags_names)) return post.tags_names;
  // Otherwise map numeric IDs -> names
  return (post.tags || []).map(id => TAGS_LOOKUP[id]).filter(Boolean);
}
