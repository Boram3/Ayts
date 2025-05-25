export async function getResizedRGBPixelMap(imageUrl, size = 40) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size);
      const rgba = imageData.data;

      // 🔽 RGBA → RGB만 추출
      const rgb = [];
      for (let i = 0; i < rgba.length; i += 4) {
        rgb.push(rgba[i], rgba[i + 1], rgba[i + 2]); // R, G, B만
      }

      resolve({
        width: size,
        height: size,
        pixels: rgb, // RGB만 있는 배열
      });
    };

    img.onerror = () => reject("이미지를 불러오지 못했습니다.");
    img.src = imageUrl;
  });
}
