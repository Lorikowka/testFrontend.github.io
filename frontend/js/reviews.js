/**
 * reviews.js — Форма отзывов
 */

function initReviews() {
  const reviewForm = document.getElementById('review-form');
  const reviewSubmit = document.getElementById('review-submit');
  const reviewStatus = document.getElementById('review-status');

  if (!reviewForm) return;

  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (reviewStatus) { reviewStatus.textContent = ''; reviewStatus.className = 'feedback-status'; }

    const rating = reviewForm.querySelector('input[name="rating"]:checked')?.value;
    const name = document.getElementById('review-name')?.value.trim();
    const contact = document.getElementById('review-contact')?.value.trim();
    const message = document.getElementById('review-text')?.value.trim();

    if (!rating || !name || !contact || !message) {
      if (reviewStatus) { reviewStatus.textContent = 'Заполните все поля'; reviewStatus.classList.add('error'); }
      return;
    }

    try {
      if (reviewSubmit) reviewSubmit.disabled = true;
      const response = await fetch(`${BACKEND_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: Number(rating), name, contact, message })
      });
      const data = await response.json();
      if (data.success) {
        reviewForm.reset();
        if (reviewStatus) { reviewStatus.textContent = 'Спасибо за отзыв!'; reviewStatus.classList.add('success'); }
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      if (reviewStatus) { reviewStatus.textContent = 'Ошибка при отправке'; reviewStatus.classList.add('error'); }
    } finally {
      if (reviewSubmit) reviewSubmit.disabled = false;
    }
  });
}
