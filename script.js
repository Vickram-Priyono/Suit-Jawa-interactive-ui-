document.addEventListener("DOMContentLoaded", function () {
  // ========== VARIABEL GLOBAL ========== //
  let saldo = 1000;
  let currentBet = 0;

  // ========== INISIALISASI ELEMEN ========== //
  const player = document.querySelectorAll("li img");
  const info = document.querySelector(".info");
  const imgComp = document.querySelector(".img-komputer");
  const resetBtn = document.getElementById("resetGame");
  const betButtons = document.querySelectorAll(".bet-btn");
  const saldoDisplay = document.getElementById("saldo");
  const currentBetDisplay = document.getElementById("current-bet");
  const modal = document.getElementById("modalHabis");

  // ========== FUNGSI UTAMA ========== //
  function getPilihanComputer() {
    const comp = Math.random();
    if (comp < 0.34) return "gajah";
    if (comp >= 0.34 && comp < 0.67) return "orang";
    return "semut";
  }

  function getHasil(comp, p) {
    if (p === comp) return { pesan: "SERI!", perubahan: 0 };

    if (p === "gajah") {
      if (comp === "orang") {
        saldo += currentBet;
        return { pesan: `MENANG! +${currentBet} koin`, perubahan: currentBet };
      } else {
        saldo -= currentBet;
        return { pesan: `KALAH! -${currentBet} koin`, perubahan: -currentBet };
      }
    }

    if (p === "orang") {
      if (comp === "semut") {
        saldo += currentBet;
        return { pesan: `MENANG! +${currentBet} koin`, perubahan: currentBet };
      } else {
        saldo -= currentBet;
        return { pesan: `KALAH! -${currentBet} koin`, perubahan: -currentBet };
      }
    }

    if (p === "semut") {
      if (comp === "gajah") {
        saldo += currentBet;
        return { pesan: `MENANG! +${currentBet} koin`, perubahan: currentBet };
      } else {
        saldo -= currentBet;
        return { pesan: `KALAH! -${currentBet} koin`, perubahan: -currentBet };
      }
    }
  }

  function spin(duration, callback) {
    const imgSpin = ["gajah", "semut", "orang"];
    let i = 0;
    let currentDelay = 10;
    let lastUpdateTime = Date.now();

    const spinInterval = setInterval(function () {
      const now = Date.now();
      const elapsed = now - lastUpdateTime;

      if (elapsed >= currentDelay) {
        imgComp.setAttribute("src", `img/${imgSpin[i++]}.png`);
        if (i === imgSpin.length) i = 0;
        lastUpdateTime = now;
        currentDelay += 20;
      }
    }, 10);

    setTimeout(() => {
      clearInterval(spinInterval);
      if (callback) callback();
    }, duration);
  }

  function updateUI() {
    saldoDisplay.textContent = saldo;
    currentBetDisplay.textContent = currentBet;
    updateBetButtons();
  }

  function updateBetButtons() {
    betButtons.forEach((btn) => {
      const betValue = parseInt(btn.dataset.bet);
      btn.disabled = saldo < betValue;
    });
  }

  function cekSaldo() {
    if (saldo <= 0) {
      modal.style.display = "block";
    }
  }

  // ========== EVENT LISTENERS ========== //
  betButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const betValue = parseInt(this.dataset.bet);

      if (saldo >= betValue) {
        currentBet = betValue;
        betButtons.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");
        updateUI();
      }
    });
  });

  player.forEach((img) => {
    img.addEventListener("click", function () {
      if (saldo <= 0) {
        alert("Saldo habis!");
        return;
      }

      if (currentBet === 0) {
        alert("Pilih jumlah taruhan dulu!");
        return;
      }

      const pilihanComp = getPilihanComputer();
      const pilihanPlayer = this.className;

      info.innerHTML = "Memproses...";

      spin(2000, function () {
        const hasil = getHasil(pilihanComp, pilihanPlayer);
        imgComp.setAttribute("src", `img/${pilihanComp}.png`);
        info.innerHTML = hasil.pesan;
        updateUI();
        cekSaldo();
      });
    });
  });

  resetBtn.addEventListener("click", function () {
    saldo = 1000;
    currentBet = 0;
    updateUI();
    modal.style.display = "none";
  });

  // Inisialisasi awal
  updateUI();
});
