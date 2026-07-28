(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter; let visible = 0;
    document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button));
    document.querySelectorAll('.writeup-card').forEach(card => {
      const show = filter === 'all' || card.dataset.categories.includes(filter); card.hidden = !show; if (show) visible++;
    });
    const empty = document.querySelector('.empty-state'); if (empty) empty.hidden = visible > 0;
  }));
  const content = document.querySelector('.post-content'); const toc = document.querySelector('.toc');
  if (content && toc) {
    const headings = content.querySelectorAll('h2, h3');
    headings.forEach((heading, index) => { const id = heading.id || `section-${index + 1}`; heading.id = id; const link = document.createElement('a'); link.href = `#${id}`; link.textContent = heading.textContent; link.className = heading.tagName.toLowerCase(); toc.append(link); });
    if (!headings.length) document.querySelector('.post-sidebar')?.setAttribute('hidden', '');
  }
  const bar = document.querySelector('.reading-progress span');
  if (bar && content) window.addEventListener('scroll', () => { const start = content.offsetTop - 120; const end = start + content.offsetHeight - innerHeight; const progress = Math.max(0, Math.min(1, (scrollY - start) / Math.max(end - start, 1))); bar.style.transform = `scaleX(${progress})`; }, { passive: true });
})();
