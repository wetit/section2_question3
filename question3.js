const https = require("https");

let argv = process.argv[2];

let options = {
    hostname: "codequiz.azurewebsites.net",
    path: "/",
    method: "GET",
    headers: { Cookie: "hasCookie=true" },
};


let req = https.request(options, function (res) {
    let body = "";
    res.on("data", function (chunk) {
        body = body + chunk;
    });
    res.on("end", function () {
        let tableCell = "<table>" + body.split(/<table>|<\/table>/)[1] + "</table>";
        let filter = tableCell.split(/<td>|<\/td>/).map((e) => e.trim());
        let find = filter.indexOf(argv);
        let answer = filter.splice(find, 8).filter((e) => e);
        let result = answer[1];
        console.log(result);
    });
});

req.end();