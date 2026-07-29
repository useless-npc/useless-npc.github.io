(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  const archiveCards = document.querySelectorAll('.writeup-card, .archive-card');
  const search = document.querySelector('#writeup-search');
  let activeFilter = 'all';
  const filterCards = () => {
    let visible = 0;
    const query = search ? search.value.trim().toLowerCase() : '';
    archiveCards.forEach(card => {
      const categoryMatch = activeFilter === 'all' || card.dataset.categories.includes(activeFilter);
      const searchMatch = !query || card.dataset.search.includes(query);
      const show = categoryMatch && searchMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    const empty = document.querySelector('.empty-state');
    if (empty) empty.hidden = visible > 0;
  };
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
    filterCards();
  }));
  if (search) search.addEventListener('input', filterCards);
  const content = document.querySelector('.post-content'); const toc = document.querySelector('.toc');
  if (content && toc) {
    const headings = content.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => { const id = heading.id || `section-${index + 1}`; heading.id = id; const link = document.createElement('a'); link.href = `#${id}`; link.textContent = heading.textContent; link.className = heading.tagName.toLowerCase(); toc.append(link); });
    if (!headings.length) document.querySelector('.post-sidebar')?.setAttribute('hidden', '');
  }
  const bar = document.querySelector('.reading-progress span');
  if (bar && content) window.addEventListener('scroll', () => { const start = content.offsetTop - 120; const end = start + content.offsetHeight - innerHeight; const progress = Math.max(0, Math.min(1, (scrollY - start) / Math.max(end - start, 1))); bar.style.transform = `scaleX(${progress})`; }, { passive: true });

  document.querySelectorAll('.post-content pre').forEach(pre => {
    const code = pre.querySelector('code');
    if (!code) return;
    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.before(wrapper);
    wrapper.append(pre);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    button.addEventListener('click', async () => {
      const source = code.innerText;
      try {
        if (!navigator.clipboard) throw new Error('Clipboard API unavailable');
        await navigator.clipboard.writeText(source);
      } catch {
        const area = document.createElement('textarea');
        area.value = source;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.append(area);
        area.select();
        document.execCommand('copy');
        area.remove();
      }
      button.textContent = 'Copied!';
      button.classList.add('is-copied');
      setTimeout(() => { button.textContent = 'Copy'; button.classList.remove('is-copied'); }, 1600);
    });
    wrapper.append(button);
  });

  document.querySelectorAll('.post-content img').forEach(image => {
    const frame = document.createElement('span');
    frame.className = 'image-frame';
    frame.setAttribute('role', 'button');
    frame.setAttribute('tabindex', '0');
    frame.setAttribute('aria-label', `Enlarge image${image.alt ? `: ${image.alt}` : ''}`);
    image.before(frame);
    frame.append(image);
    const openImage = () => {
      const lightbox = document.createElement('div');
      lightbox.className = 'image-lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', 'Enlarged image preview');
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'lightbox-close';
      close.textContent = 'Close';
      const largeImage = image.cloneNode();
      lightbox.append(close, largeImage);
      document.body.append(lightbox);
      close.focus();
      const closeLightbox = () => { lightbox.remove(); frame.focus(); };
      close.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
      lightbox.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
    };
    frame.addEventListener('click', openImage);
    frame.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImage(); } });
  });
})();
