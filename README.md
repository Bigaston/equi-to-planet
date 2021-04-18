# Equi to Planet
Transform an Equirectangular image to LittlePlanet

Port of this algorithm : [https://math.stackexchange.com/questions/607353/tiny-planet-algorithm/2110192](https://math.stackexchange.com/questions/607353/tiny-planet-algorithm/2110192)

## Usage :
```JS
const equi = require("equi-to-planet");

equi.convert(imgBuffer)
  .then((planetBuffer) => {
    // Save file or export it somewhere
    // Mime type is image/jpeg
  })
  .catch((err) => {
    console.log(err);
  });
```

If you have a problem with memory, you can allocate more memory to JIMP with
```JS
equi.changeMaxMb(sizeInMb);
```