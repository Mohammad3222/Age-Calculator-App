let age, remainingYears;

function calculateAge() {
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);
  const result = document.getElementById('result');
  const progressBar = document.getElementById('progressBar');
  const modal = document.getElementById('modal');
  const modalResult = document.getElementById('modal-result');
  const shareBtn = document.getElementById('shareBtn');
  const clickSound = document.getElementById('clickSound');

  clickSound.play().catch(error => console.log("خطأ في تشغيل صوت النقرة: ", error));

  if (!day || !month || !year || day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2025) {
    result.textContent = 'يرجى إدخال تاريخ صحيح!';
    progressBar.value = 0;
    return;
  }

  const today = new Date();
  const birthDate = new Date(year, month - 1, day);

  age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  remainingYears = age >= 80 ? 0 : 80 - age;
  const percentage = (age / 80) * 100;

  result.textContent = 'جارٍ الحساب...';
  setTimeout(() => {
    result.textContent = `عمرك الحالي: ${age} سنة\nالسنوات المتبقية: ${remainingYears} سنة`;
    progressBar.value = percentage;
    shareBtn.style.display = 'block';

    setTimeout(() => {
      result.textContent += `\nفي سن ${age}، قد تكون في ذروة حياتك المهنية!`;
      setTimeout(() => {
        result.textContent += `\n${remainingYears} سنة متبقية لتحقيق أحلامك!`;
        setTimeout(() => {
          modal.style.display = 'flex';
          modalResult.textContent = `عمرك ${age} سنة، استمتع بكل لحظة!`;
        }, 1000);
      }, 1000);
    }, 1000);
  }, 5000);
}

function shareOnFacebook() {
  const message = `عمري ${age} سنة، ومتبقي لي ${remainingYears} سنة من 80! 🎉`;
  const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function playSound(type) {
  const openSound = document.getElementById('openSound');
  const closeSound = document.getElementById('closeSound');

  if (type === 'open') {
    openSound.play().catch(error => console.log("خطأ في تشغيل صوت المنبثق: ", error));
  }
}

document.querySelector('.close').onclick = function() {
  const closeSound = document.getElementById('closeSound');
  closeSound.play().catch(error => console.log("خطأ في تشغيل صوت الإغلاق: ", error));
  document.getElementById('modal').style.display = 'none';
};