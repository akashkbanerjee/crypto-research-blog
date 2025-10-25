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
