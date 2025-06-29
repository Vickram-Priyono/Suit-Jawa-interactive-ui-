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

function spin() {
  const img = document.querySelector(`.img-komputer`);
  const imgSpin = [`gajah`, `semut`, `orang`];

  let i = 0;

  const waktuMulai = new Date().getTime();

  setInterval(function () {
    if (new Date().getTime() - waktuMulai > 10000) {
      clearInterval;
      return;
    }
    img.setAttribute(`src`, `img/${imgSpin[i++]}.png`);
    if (i == imgSpin.length) i = 0;
  }, 1000);
}

const player = document.querySelectorAll(`li img`);

player.forEach(function (i) {
  i.addEventListener(`click`, function () {
    const pilihanComp = getPilihanComputer();
    const pilihanPlayer = i.className;
    const info = document.querySelector(`.info`);
    const imgComp = document.querySelector(`.img-komputer`);
    const hasil = getHasil(pilihanComp, pilihanPlayer);

    info.innerHTML = ``;

    spin();

    setTimeout(function () {
      console.log("pilihan comp:" + pilihanComp);
      console.log(`pilihan player: ${pilihanPlayer}`);

      imgComp.setAttribute(`src`, `img/${pilihanComp}.png`);

      console.log(hasil);

      info.innerHTML = hasil;
    }, 10000);
  });
});
