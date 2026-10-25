// Menu navigasi untuk tampilan HP
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );
});

// Tutup menu setelah salah satu tautan navigasi dipilih
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Menampilkan elemen secara halus ketika masuk ke layar
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  // Cadangan untuk browser yang tidak mendukung IntersectionObserver
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Tombol kembali ke atas muncul setelah halaman digulir
const backToTop = document.querySelector("#backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 400);
});

// Kembali ke bagian paling atas saat tombol diklik
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Tahun pada footer otomatis mengikuti tahun saat ini
document.querySelector("#year").textContent = new Date().getFullYear();

// Menandai menu yang sesuai dengan bagian halaman yang sedang dilihat
const pageSections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((item) => {
            item.classList.toggle(
              "active",
              item.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  pageSections.forEach((section) => sectionObserver.observe(section));
}

// Tautan media sosial masih berupa placeholder; cegah navigasi palsu.
const socialPlaceholder = document.querySelector("#socialPlaceholder");
socialPlaceholder.addEventListener("click", (event) => {
  event.preventDefault();
  alert("Ganti tautan ini dengan profil media sosial milikmu terlebih dahulu.");
});
