function getPilihanComputer() {
  const comp = Math.random();

  if (comp < 0.34) return `gajah`;
  if (comp >= 0.34 && comp < 0.67) return `orang`;
  return `semut`;
}

function getHasil(comp, p) {
  if (p == comp) return `SERI!`;
  if (p == `gajah`) return comp == `orang` ? `MENANG!` : `KALAH!`;
  if (p == `orang`) return comp == `gajah` ? `KALAH!` : `MENANG!`;
  if (p == `semut`) return comp == `orang` ? `KALAH!` : `MENANG!`;
}

function spin(duration, callback) {
  const img = document.querySelector(`.img-komputer`);
  const imgSpin = [`gajah`, `semut`, `orang`];
  let i = 0;

  const spinInterval = setInterval(function () {
    img.setAttribute(`src`, `img/${imgSpin[i++]}.png`);
    if (i == imgSpin.length) i = 0;
  }, 100);

  // Hentikan spin setelah `duration` dan jalankan callback
  setTimeout(function () {
    clearInterval(spinInterval);
    if (callback) callback();
  }, duration);
}

const player = document.querySelectorAll(`li img`);

player.forEach(function (i) {
  i.addEventListener(`click`, function () {
    const pilihanComp = getPilihanComputer();
    const pilihanPlayer = i.className;
    const info = document.querySelector(`.info`);
    const imgComp = document.querySelector(`.img-komputer`);

    info.innerHTML = ``; // Reset info

    // Jalankan spin selama 2000ms (2 detik), lalu tampilkan hasil
    spin(2000, function() {
      imgComp.setAttribute(`src`, `img/${pilihanComp}.png`);
      const hasil = getHasil(pilihanComp, pilihanPlayer);
      info.innerHTML = hasil;
    });
  });
});
