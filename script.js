document.addEventListener('DOMContentLoaded', function () {
  const pages = document.querySelectorAll('.page');
  const nextButtons = document.querySelectorAll('.next-btn');

  // Navigate between pages when a button is clicked
  nextButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      const nextPage = btn.getAttribute('data-next');
      if (nextPage) {
        showPage(nextPage);
      }
    });
  });

  function showPage(pageNumber) {
    pages.forEach((page) => {
      page.classList.remove('active');
    });
    const nextPageElement = document.getElementById('page' + pageNumber);
    if (nextPageElement) {
      nextPageElement.classList.add('active');
    }
  }

  // ------------------------------
  // Generate Floating Hearts (Page 1)
  // ------------------------------
  const floatingHeartsContainer = document.querySelector('.floating-hearts');
  const heartsCount = 30;

  for (let i = 0; i < heartsCount; i++) {
    const heartDiv = document.createElement('div');
    heartDiv.classList.add('heart');

    const heartSpan = document.createElement('span');
    heartSpan.classList.add('heart-icon');
    heartSpan.textContent = '❤️';

    heartDiv.appendChild(heartSpan);

    const leftPos = Math.random() * 100;
    heartDiv.style.left = leftPos + '%';

    const animDelay = Math.random() * 6;
    heartDiv.style.animationDelay = animDelay + 's';

    const animDuration = 5 + Math.random() * 5;
    heartDiv.style.animationDuration = animDuration + 's';

    const fontSize = 1.5 + Math.random() * 1.5;
    heartDiv.style.fontSize = fontSize + 'rem';

    floatingHeartsContainer.appendChild(heartDiv);
  }

  // ------------------------------
  // Emoji Border Generation
  // ------------------------------
  const emojis = [
    "♥️", "❣️", "❤️", "😘", "🫶", "🫰", "🫀", "👩‍❤️‍👨", "💌", "👩‍❤️‍💋‍👨",
    "🩷", "🩵", "💙", "💜", "❤️‍🩹", "❤️‍🔥", "💓", "💗", "💖", "💘",
    "🍫", "🌹", "💐", "🌻", "🌺", "🌸", "🌼", "🪷", "♾️", "😚",
    "🧸", "🐻", "🐨", "🐶", "🐱", "🐰", "🦊", "🐼", "🐷", "🐧",
    "🐣", "🪿", "🐥", "🐴", "🐺", "🦄", "🐛", "🦋", "🐞", "🐍",
    "🦖", "🐙", "🐠", "🐬", "🐳", "🐋", "🦈", "🦈", "🦭", "🐊",
    "🦍", "🐕‍🦺", "🐈", "🐕", "🐐", "🦙", "🐁", "🐿️", "🦔", "🐾",
    "🦝", "🐓", "🦤", "🦜", "🦚", "🍄", "🍄‍🟫", "🐚", "🪸", "🌷",
    "🐦‍🔥", "🐉", "🌚", "🌎", "🪐", "☃️", "⛄", "🍎", "🍐", "🍊",
    "🍉", "🍓", "🍇", "🍍", "🍑", "🍒", "🫑", "🫑", "🫑", "🫑",
    "🍧", "🍨", "🧁", "🍦", "🍰", "🎂", "🍮", "🍭", "🍬", "🍿",
    "🍪", "🍩", "🌰", "🍿", "🍿", "🍿", "🍿", "🛤️", "🎑", "🌠",
    "🎇", "🎆", "🌉", "🇵🇰", "🇵🇰", "🇵🇰", "💋", "🫦", "👄", "👸",
    "🙇‍♂️", "🙇‍♀️", "🙇", "👑", "👙", "👗", "🩱", "🥻", "👡", "👠",
    "🥿", "💍", "💍", "👓", "👓"
  ];

  function generateRandomEmojiString(count, separator = "") {
    let result = "";
    for (let i = 0; i < count; i++) {
      const randIndex = Math.floor(Math.random() * emojis.length);
      result += emojis[randIndex] + separator;
    }
    return result;
  }

  const borderTops = document.querySelectorAll('.border-top');
  const borderBottoms = document.querySelectorAll('.border-bottom');

  borderTops.forEach(elem => {
    elem.textContent = generateRandomEmojiString(50);
  });

  borderBottoms.forEach(elem => {
    elem.textContent = generateRandomEmojiString(50);
  });

  const borderLefts = document.querySelectorAll('.border-left');
  const borderRights = document.querySelectorAll('.border-right');

  borderLefts.forEach(elem => {
    const computedStyle = window.getComputedStyle(elem);
    const lineHeight = parseInt(computedStyle.lineHeight) || 40;
    const height = elem.clientHeight || window.innerHeight;
    const lines = Math.ceil(height / lineHeight);
    elem.innerHTML = generateRandomEmojiString(lines, "<br>");
  });

  borderRights.forEach(elem => {
    const computedStyle = window.getComputedStyle(elem);
    const lineHeight = parseInt(computedStyle.lineHeight) || 40;
    const height = elem.clientHeight || window.innerHeight;
    const lines = Math.ceil(height / lineHeight);
    elem.innerHTML = generateRandomEmojiString(lines, "<br>");
  });

  // ------------------------------
  // Swipe / Double-Click-to-Reveal for Collage Images on Page 3
  // ------------------------------
  const collageContainer = document.querySelector('.collage-container');
  const collageImages = Array.from(collageContainer.querySelectorAll('.collage-img'));
  const proceedButton = document.querySelector('#page3 .next-btn');

  let currentIndex = 0;
  let startY = 0;
  const swipeThreshold = 80; // pixels

  // Attach both touch and double-click events to the current image
  function attachEvents(img) {
    img.addEventListener('touchstart', handleTouchStart, {passive: true});
    img.addEventListener('touchend', handleTouchEnd, {passive: true});
    img.addEventListener('dblclick', handleDblClick);
  }

  function detachEvents(img) {
    img.removeEventListener('touchstart', handleTouchStart);
    img.removeEventListener('touchend', handleTouchEnd);
    img.removeEventListener('dblclick', handleDblClick);
  }

  function handleTouchStart(e) {
    startY = e.changedTouches[0].clientY;
  }

  function handleTouchEnd(e) {
    const endY = e.changedTouches[0].clientY;
    const deltaY = endY - startY;
    if (deltaY > swipeThreshold) {
      triggerAnimation();
    }
  }

  function handleDblClick(e) {
    triggerAnimation();
  }

  // Two-phase animation: first move image to center, then slide it down off-screen
  function triggerAnimation() {
    const currentImg = collageImages[currentIndex];
    if (!currentImg) return;
    detachEvents(currentImg);
    // Phase 1: animate the current image to the center
    currentImg.classList.add('center');
    // After phase 1 (0.7s), trigger the slide-out
    setTimeout(() => {
      currentImg.classList.add('swiped');
      currentImg.addEventListener('transitionend', onTransitionEnd);
    }, 700);
  }

  function onTransitionEnd(e) {
    const currentImg = collageImages[currentIndex];
    currentImg.removeEventListener('transitionend', onTransitionEnd);
    // Hide the image after it has swiped out
    currentImg.style.display = 'none';
    currentIndex++;
    if (currentIndex < collageImages.length) {
      attachEvents(collageImages[currentIndex]);
    } else {
      // All images dismissed; reveal the Proceed button (centered via CSS)
      proceedButton.classList.remove('hidden');
    }
  }

  // Initially attach events to the first image
  if (collageImages.length > 0) {
    attachEvents(collageImages[currentIndex]);
  }

  // ------------------------------
  // Decision Buttons on Page 4
  // ------------------------------
  const yesDecisionBtn = document.querySelector('#page4 .yes-btn');
  const noDecisionBtn = document.querySelector('#page4 .no-btn');

  if (yesDecisionBtn) {
    yesDecisionBtn.addEventListener('click', () => {
      showHeartsScreen();
    });
  }

  if (noDecisionBtn) {
    noDecisionBtn.addEventListener('click', () => {
      showYesFloodScreen();
    });
  }

  // ------------------------------
  // Final Actions Functions
  // ------------------------------
  function showHeartsScreen() {
    // Clear entire body content
    document.body.innerHTML = '';

    // Create container for final text
    const finalContainer = document.createElement('div');
    finalContainer.id = 'final-hearts';
    document.body.appendChild(finalContainer);

    // Generate many copies of the final text
    const textCount = 100;
    for (let i = 0; i < textCount; i++) {
      const textDiv = document.createElement('div');
      textDiv.classList.add('final-text');
      textDiv.textContent = 'I Love You pookieee!!!!';
      textDiv.style.position = 'absolute';
      textDiv.style.left = Math.random() * 100 + 'vw';
      textDiv.style.top = Math.random() * 100 + 'vh';
      textDiv.style.fontSize = (1 + Math.random() * 2) + 'rem';
      finalContainer.appendChild(textDiv);
    }

    // Start confetti animation
    startConfetti();
  }

  function startConfetti() {
    // Create confetti container
    const confettiContainer = document.createElement('div');
    confettiContainer.id = 'confetti-container';
    document.body.appendChild(confettiContainer);

    // Spawn confetti pieces periodically
    setInterval(() => {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');
      confetti.textContent = '🎉';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.top = '-10vh';
      confetti.style.fontSize = (1 + Math.random() * 2) + 'rem';
      const duration = 3 + Math.random() * 3;
      confetti.style.animationDuration = duration + 's';
      confettiContainer.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }, 300);
  }

  function showYesFloodScreen() {
    // Clear entire body content
    document.body.innerHTML = '';

    // Create container for flooded YES buttons
    const yesFloodContainer = document.createElement('div');
    yesFloodContainer.id = 'yes-flood-container';
    document.body.appendChild(yesFloodContainer);

    // Generate many YES buttons
    const buttonCount = 50;
    for (let i = 0; i < buttonCount; i++) {
      const btn = document.createElement('button');
      btn.classList.add('flood-yes-btn');
      btn.textContent = 'YES';
      btn.style.position = 'absolute';
      btn.style.left = Math.random() * 90 + 'vw';
      btn.style.top = Math.random() * 90 + 'vh';
      btn.addEventListener('click', () => {
        showHeartsScreen();
      });
      yesFloodContainer.appendChild(btn);
    }
  }
});

