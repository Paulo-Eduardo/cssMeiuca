const express = require("express");
const theo = require("theo");
fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors("*"));

app.get("/", (req, res) => {
  theo
    .convert({
      transform: {
        type: "web",
        file: `./theo-css/tokens.yml`,
      },
      format: {
        type: "common.js",
      },
    })
    .then((module) => {
      // const resultItem = styl.split("\n").filter((x) => x.includes(item))[0];
      fs.writeFile("./meuica.js", module, function (err) {
        if (err) res.send(err);

        res.json(require("./meuica.js"));
      });
    })
    .catch((error) => console.log(`Something went wrong: ${error}`));
});

app.listen(5000, () => {
  console.log("App ouvindo porta 5000");
});
