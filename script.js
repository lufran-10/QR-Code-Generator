const qrContainer = document.getElementById("qr-container");
const userInput = document.getElementById("user-input");
const qrImg = document.getElementById("qr-img");
const size = document.getElementById("size");
const color = document.getElementById("color");
const downloadBtn = document.getElementById("download");

function generateQR() {
  if (userInput.value !== "" && size.value !== "") {
    qrImg.src =
      "https://api.qrserver.com/v1/create-qr-code/?size=" +
      size.value +
      "&data=" +
      userInput.value +
      "&color=" +
      color.value.slice(1) +
      "&qzone=4";
    qrContainer.style.display = "flex";
  }
}

async function downloadImage(imageSrc, nameOfDownload = "qrImg.png") {
  const response = await fetch(imageSrc);

  const blobImage = await response.blob();

  const href = URL.createObjectURL(blobImage);

  const anchorElement = document.createElement("a");
  anchorElement.href = href;
  anchorElement.download = nameOfDownload;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
}

downloadBtn.addEventListener("click", () => {
  if (qrContainer.style.display === "flex") {
    downloadImage(qrImg.src);
  }
});
