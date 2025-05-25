import { getResizedRGBPixelMap } from './try1.js';

const imageUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/June_odd-eyed-cat.jpg/640px-June_odd-eyed-cat.jpg';

getResizedRGBPixelMap(imageUrl)
  .then(result => {
    console.log("이미지 크기:", result.width + "x" + result.height);
    console.log("RGB 픽셀 배열 (앞부분):", result.pixels); // RGB만 5픽셀 출력
  })
  .catch(err => console.error("오류:", err));
