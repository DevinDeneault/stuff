
const breadcrumb = {
  'home': document.querySelector('#breadcrumb > #home'),
  'homeArrow': document.querySelector('#breadcrumb > #home-arrow'),
  'forum': document.querySelector('#breadcrumb > #forum'),
  'forumArrow': document.querySelector('#breadcrumb > #forum-arrow'),
  'thread': document.querySelector('#breadcrumb > #thread'),
};

const content = document.getElementById('content');

const templateCategoryHeader = document.getElementById('t-category-header');
const templateCategory = document.getElementById('t-category');
const templateForumHeader = document.getElementById('t-forum-header');
const templateForumThread = document.getElementById('t-forum-thread');
const templateThreadHeader = document.getElementById('t-thread-header');
const templatePost = document.getElementById('t-post');

function setBreadcrumb(forumLink, forumName, threadName) {
  if (threadName) {
    breadcrumb['home'].classList = 'crumb-link';
    breadcrumb['homeArrow'].classList.remove('hidden');
    breadcrumb['forum'].classList = 'crumb-link';
    breadcrumb['forumArrow'].classList.remove('hidden');
    breadcrumb['thread'].classList = 'crumb';

    breadcrumb['home'].onclick = (e) => load(null, e);
    breadcrumb['forum'].onclick = (e) => load(forumLink, e);
    breadcrumb['forum'].innerText = forumName;
    breadcrumb['thread'].innerText = threadName;
  }
  else if (forumName) {
    breadcrumb['home'].classList = 'crumb-link';
    breadcrumb['homeArrow'].classList.remove('hidden');
    breadcrumb['forum'].classList = 'crumb';
    breadcrumb['forumArrow'].classList.add('hidden');
    breadcrumb['thread'].classList = 'crumb hidden';

    breadcrumb['home'].onclick = (e) => load(null, e);
    breadcrumb['forum'].onclick = undefined;
    breadcrumb['forum'].innerText = forumName;
  }
  else {
    breadcrumb['home'].classList = 'crumb';
    breadcrumb['homeArrow'].classList.add('hidden');
    breadcrumb['forum'].classList = 'crumb hidden';
    breadcrumb['forumArrow'].classList.add('hidden');
    breadcrumb['thread'].classList = 'crumb hidden';

    breadcrumb['home'].onclick = undefined;
  }
}

// ============================================================================

function loadHomePage() {
  requestAnimationFrame(() => {

    setPageTitle(null);
    content.innerHTML = '';
    setBreadcrumb(null, null, null);

    homePageData.forEach(category => {
      const clone = templateCategoryHeader.content.cloneNode(true);
      clone.querySelector('.category-header').textContent = category['name'];
      content.appendChild(clone);

      category['forums'].forEach(forum => {
        const clone = templateCategory.content.cloneNode(true);
        clone.querySelector('.category').onclick = (e) => load(`${category['id']}-${forum['id']}`, e);
        clone.querySelector('.title').textContent = forum['name'];
        clone.querySelector('.description').textContent = forum['description'];
        content.appendChild(clone);
      });
    });

    window.scrollTo(0,0);
  });
}

function loadForum(data) {
  requestAnimationFrame(() => {

    setPageTitle(data['name']);
    content.innerHTML = '';
    setBreadcrumb(null, data['name'], null);

    const clone = templateForumHeader.content.cloneNode(true);
    clone.querySelector('.title').textContent = data['name'];
    clone.querySelector('.description').textContent = data['description'];
    content.appendChild(clone);

    data['threads'].forEach(thread => {
      const clone = templateForumThread.content.cloneNode(true);
      clone.querySelector('.avatar').style = `background-image:url('avatar/${thread['avatar']}');`;
      clone.querySelector('.title').textContent = thread['name'];
      clone.querySelector('.user').textContent = thread['author'];
      clone.querySelector('.replies').textContent = thread['replies'];
      clone.querySelector('.forum-thread').onclick = (e) => load(`${thread['category_id']}-${thread['forum_id']}-${thread['id']}`, e);
      content.appendChild(clone);
    });

    window.scrollTo(0,0);
  });
}

function loadThread(data) {
  requestAnimationFrame(() => {

    setPageTitle(data['name']);
    content.innerHTML = '';
    setBreadcrumb(`${data['category_id']}-${data['forum_id']}`, data['forum_name'], data['name']);

    const clone = templateThreadHeader.content.cloneNode(true);
    clone.querySelector('.thread-header').textContent = data['name'];
    content.appendChild(clone);

    data['posts'].forEach(post => {
      const clone = templatePost.content.cloneNode(true);
      clone.querySelector('.avatar').style = `background-image:url('avatar/${post['avatar']}');`;
      clone.querySelector('.user').textContent = post['author'];
      clone.querySelector('.timestamp').textContent = post['timestamp'];
      clone.querySelector('.post-content').innerHTML = post['content'];
      content.appendChild(clone);
    });

    window.scrollTo(0,0);
  });
}

async function load(data_name, event) {
  if (event && event.ctrlKey) {
    openLinkInNewTab(data_name)
    return;
  }

  if (!data_name) {
    removeUrlParam();
    loadHomePage();
    return;
  }

  try {
    const res = await fetch(`data/${data_name}.json`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    const json = await res.json();

    setUrlParam(data_name);
    if (data_name.length === 7) loadForum(json);
    if (data_name.length === 11) loadThread(json);
  } catch (err) {
    console.error(`Failed to load or parse ${data_name}:`, err);
    // error page?
  }
}

// ============================================================================

function openLinkInNewTab(page) {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page);
  window.open(url, '_blank');
}

function setPageTitle(title) {
  if (title) {
    document.title = `${title} - nwnecbguild.44 archive`;
  }
  else {
    document.title = 'nwnecbguild.44 archive';
  }
}

function setUrlParam(page) {
  const url = new URL(window.location.href);
  url.searchParams.set('page', page);
  // window.history.replaceState({}, '', url);
  window.history.pushState({ page }, '', url);
}

window.addEventListener('popstate', (event) => {
  const page = new URL(window.location.href).searchParams.get('page');
  load(page, null);
});

function removeUrlParam() {
  const url = window.location.protocol + "//" + window.location.host + window.location.pathname;
  // window.history.replaceState({}, document.title, url);
  window.history.pushState({}, '', url);
}

function getUrlParam() {
  return new URLSearchParams(window.location.search).get('page');
}

// ============================================================================

const homePageData = [
  {
    'name': 'Character Building',
    'id': '000',
    'forums': [
      {
        'name': 'Rules and Tools',
        'description': 'Rules you need to abide when posting character builds and tools that help you creating them.',
        'id': '000'
      },
      {
        'name': 'Game Guides',
        'description': 'Here you can find guides about how to make the best out of specific NWN features (classes, spells, tactics, etc.)',
        'id': '001'
      },
      {
        'name': 'General Discussion',
        'description': 'Where we discuss anything related to character building.',
        'id': '002'
      },
      {
        'name': 'Build Request/Unfinalized Builds',
        'description': 'The place where to ask the experts their take on a build concept.',
        'id': '003'
      },
      {
        'name': 'Preepic - Level 20 Builds',
        'description': 'The place where to post your level 20 builds.',
        'id': '004'
      },
      {
        'name': 'Mid Epic - Level 30 Builds',
        'description': 'The place where to post your level 30 Builds.',
        'id': '005'
      },
      {
        'name': 'Full Epic - Level 40 Builds',
        'description': 'The place where to post your level 40 builds.',
        'id': '006'
      },
      {
        'name': 'Bioware Legacy Builds',
        'description': 'Here the Bioware featured legacy builds are posted for reference.',
        'id': '008'
      }
    ]
  },
  {
    'name': 'NWN World',
    'id': '001',
    'forums': [
      {
        'name': 'General',
        'description': 'General NWN discussions.',
        'id': '000'
      },
      {
        'name': 'Modules',
        'description': 'Modules where to enjoy our awesome builds.',
        'id': '001'
      },
      {
        'name': 'Persistent Worlds',
        'description': 'PWs that will be the home of our dear character builds.',
        'id': '002'
      },
      {
        'name': 'Add ons',
        'description': 'Where to discuss enhancements for the NWN experience.',
        'id': '003'
      }
    ]
  }
]

load(getUrlParam(), null);
