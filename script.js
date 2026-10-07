document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-tab');
  const brand = document.querySelector('.brand');
  const projectOrder = [
    { file: 'cloud9-tea.html', label: 'Cloud 9 Tea', folder: 'assets/cloud9-tea', name: 'Cloud_9Tea' },
    { file: 'medu.html', label: 'Medu', folder: 'assets/medu', name: 'Medu' },
    { file: 'peak.html', label: 'PEAK', folder: 'assets/peak', name: 'Peak' },
    { file: 'scofield-fruits.html', label: 'Scofield Fruits', folder: 'assets/scofield-fruits', name: 'Scofield_Fruits' },
    { file: 'rev.html', label: 'REV', folder: 'assets/rev', name: 'Rev' },
    { file: 'noco-bru.html', label: 'Noco Bru', folder: 'assets/noco-bru', name: 'Noco_Bru' },
    { file: 'many-macarons.html', label: 'Many Macarons', folder: 'assets/many-macarons', name: 'Many_Macarons' },
    { file: 'internship-work.html', label: 'Internship Work', folder: 'assets/internship-work', name: 'Internship' },
  ];
  const projectMap = Object.fromEntries(projectOrder.map((project) => [project.file, project]));

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    const effectiveHref = href === '#' ? 'index.html' : href;

    if (href === '#') {
      link.setAttribute('href', 'index.html');
    }

    link.classList.remove('active');

    if (['index.html', ...projectOrder.map((project) => project.file)].includes(currentPath) && effectiveHref === 'index.html') {
      link.classList.add('active');
    }

    if (effectiveHref === currentPath && currentPath !== 'index.html') {
      link.classList.add('active');
    }
  });

  if (brand) {
    brand.classList.remove('active');
  }

  const projectFiles = Object.keys(projectMap);
  const prevProjectLink = document.querySelector('.project-nav-link.is-prev');
  const nextProjectLink = document.querySelector('.project-nav-link.is-next');
  const currentIndex = projectFiles.indexOf(currentPath);

  if (prevProjectLink) {
    const prevIndex = currentIndex >= 0 ? (currentIndex - 1 + projectFiles.length) % projectFiles.length : projectFiles.length - 1;
    const prevProject = projectMap[projectFiles[prevIndex]];

    prevProjectLink.setAttribute('href', prevProject ? projectFiles[prevIndex] : 'index.html');
    prevProjectLink.innerHTML = '<span aria-hidden="true">‹</span> Previous';
  }

  if (nextProjectLink) {
    const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % projectFiles.length : 0;
    const nextProject = projectMap[projectFiles[nextIndex]];

    nextProjectLink.setAttribute('href', nextProject ? projectFiles[nextIndex] : 'index.html');
    nextProjectLink.innerHTML = 'Next <span aria-hidden="true">›</span>';
  }

  const currentProject = projectMap[currentPath];

  const applyBackgroundImage = (element, src) => {
    if (!element || !src) return;
    element.style.backgroundImage = `url("${src}")`;
  };

  if (currentProject) {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      applyBackgroundImage(heroImage, `${currentProject.folder}/${currentProject.name}_Hero.png`);
    }

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      const explicitNumber = Number(item.dataset.galleryNumber || item.dataset.imageNumber || item.dataset.number);
      const galleryNumber = Number.isFinite(explicitNumber) && explicitNumber > 0 ? explicitNumber : index + 1;
      const detailNumber = Number(item.dataset.detailNumber || item.dataset.imageNumber || item.dataset.number || galleryNumber);
      const gallerySrc = `${currentProject.folder}/${currentProject.name}_Gallery_${galleryNumber}.png`;
      const detailSrc = `${currentProject.folder}/${currentProject.name}_Detail_${detailNumber}.png`;
      let thumb = item.querySelector('.gallery-thumb');

      if (!thumb || thumb.tagName !== 'IMG') {
        const img = document.createElement('img');
        img.className = 'gallery-thumb';
        img.alt = item.getAttribute('aria-label') || 'Project gallery image';
        if (thumb) {
          thumb.replaceWith(img);
        } else {
          item.appendChild(img);
        }
        thumb = item.querySelector('.gallery-thumb');
      }

      if (thumb) {
        thumb.src = gallerySrc;
        thumb.alt = item.getAttribute('aria-label') || 'Project gallery image';
      }

      item.dataset.gallerySrc = gallerySrc;
      item.dataset.detailSrc = detailSrc;
    });
  }

  const landingCards = document.querySelectorAll('.landing-card:not(.coming-soon-card)');
  const landingMap = {
    'cloud9-tea.html': 'Cloud_9Tea_Index_Card.png',
    'many-macarons.html': 'Many_Macarons_Index_Card.png',
    'medu.html': 'Medu_Index_Card.png',
    'noco-bru.html': 'Noco_Bru_Index_Card.png',
    'peak.html': 'Peak_Index_Card.png',
    'rev.html': 'Rev_Index_Card.png',
    'scofield-fruits.html': 'Scofield_Fruits_Index_Card.png',
    'internship-work.html': 'Internship_Index_Card.png',
  };

  landingCards.forEach((card) => {
    const href = card.getAttribute('href');
    const match = href ? href.split('/').pop() : null;
    const fileName = match ? landingMap[match] : null;

    if (fileName) {
      card.style.backgroundImage = `url("assets/index/${fileName}")`;
    }
  });

  const modal = document.getElementById('lightbox');
  const modalImage = modal ? modal.querySelector('.lightbox-image') : null;
  const modalTitle = modal ? modal.querySelector('.lightbox-title') : null;
  const modalText = modal ? modal.querySelector('.lightbox-text') : null;
  const closeButton = modal ? modal.querySelector('.lightbox-close') : null;

  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      if (!modal || !modalImage || !modalTitle || !modalText) return;

      const title = item.dataset.title || 'Project';
      const description = item.dataset.caption || item.dataset.description || '';
      const detailSrc = item.dataset.detailSrc || item.dataset.gallerySrc || '';
      const gallerySrc = item.dataset.gallerySrc || detailSrc;

      modalTitle.textContent = title;
      modalText.textContent = description;

      const setModalImage = (src) => {
        modalImage.style.backgroundImage = src ? `url("${src}")` : '';
      };

      if (detailSrc && detailSrc !== gallerySrc) {
        fetch(detailSrc, { method: 'HEAD' })
          .then((response) => {
            setModalImage(response.ok ? detailSrc : gallerySrc);
          })
          .catch(() => {
            setModalImage(gallerySrc);
          });
      } else {
        setModalImage(gallerySrc);
      }

      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  if (closeButton && modal) {
    closeButton.addEventListener('click', () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        card.click();
      }
    });
  });
});
