const http = require("http"),
  fs = require("fs");

fs.readFile(__dirname + "/../public/index.example.html", function (err, html) {
  if (err) {
    throw err;
  }
  http
    .createServer(function (request, response) {
      response.writeHeader(200, { "Content-Type": "text/html" });
      response.write(html);
      response.end();
    })
    .listen(8000);
});

//show server
console.log("Server running at http://locahost:8000/");
