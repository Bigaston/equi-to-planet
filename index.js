const Jimp = require("jimp");
const mathjs = require("mathjs");
const JPEG = require("jpeg-js");

Jimp.decoders["image/jpeg"] = (data) =>
  JPEG.decode(data, { maxMemoryUsageInMB: 1024 });

module.exports = {
  changeMaxMb: (maxMb) => {
    Jimp.decoders["image/jpeg"] = (data) =>
      JPEG.decode(data, { maxMemoryUsageInMB: max });
  },
  convert: (imgBuffer) => {
    return new Promise((resolve, reject) => {
      Jimp.read(imgBuffer, (err, image) => {
        if (err) {
          reject(err);
        } else {
          const TWO_PI = 2 * Math.PI;

          let width = image.getWidth();
          let height = image.getHeight();

          let target_size = height * 2;

          new Jimp(target_size, target_size, (err, planet) => {
            if (err) {
              reject(err);
            } else {
              for (let x = 0; x < target_size; x++) {
                for (let y = 0; y < target_size; y++) {
                  let { r, phi } = mathjs
                    .complex(height - y, height - x)
                    .toPolar();

                  if (r <= height) {
                    let x_original = width / 2 - (phi * width) / TWO_PI;
                    let y_original = height - r;

                    let color = image.getPixelColor(x_original, y_original);

                    planet.setPixelColor(color, x, y);
                  }
                }
              }

              planet
                .getBufferAsync("image/png")
                .then((planetBuffer) => {
                  resolve(planetBuffer);
                })
                .catch((err) => {
                  reject(err);
                });
            }
          });
        }
      });
    });
  },
};
