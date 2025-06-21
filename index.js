const input = document.getElementById("inp");
const qrcodeContainer = document.getElementById("qrcode-container");
const qrimg = document.getElementById("qrimg");
const btn = document.getElementById("btn");
const downloadBtn = document.getElementById("download-btn");
const shareWhatsAppBtn = document.getElementById("share-whatsapp");
const shareEmailBtn = document.getElementById("share-email");
const modeToggle = document.getElementById("mode-toggle");

btn.addEventListener("click", () => {
  const value = input.value.trim();
  if (value !== "") {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(value)}`;
    qrimg.setAttribute("src", qrUrl);
    qrcodeContainer.style.display = "flex";
    downloadBtn.style.display = "block";
    shareWhatsAppBtn.style.display = "block";
    shareEmailBtn.style.display = "block";

    // Download QR Code (fix using canvas)
    downloadBtn.onclick = () => {
      const imgURL = qrimg.src;
      const image = new Image();
      image.crossOrigin = "anonymous"; // Important for external image
      image.src = imgURL;

      image.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(image, 0, 0);

        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "qrcode.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, "image/png");
      };
    };

    // Share via WhatsApp (link only)
    shareWhatsAppBtn.onclick = () => {
      const text = `Here's your QR code link: ${qrimg.src}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    };

    // Share via Email (link only)
    shareEmailBtn.onclick = () => {
      const subject = "QR Code";
      const body = `Here's your QR code: ${qrimg.src}`;
      const mailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailUrl;
    };
  } else {
    alert("⚠️ Please enter text or a URL.");
  }
});

// Dark Mode Toggle
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  modeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});
