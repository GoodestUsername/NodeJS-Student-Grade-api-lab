const http = require('http');
const url = require('url');
const mysql = require("mysql");
const GET = "GET";
const POST = "POST";
const endPointRoot = "/COMP4537/labs/5/";
let dictionary = [];
let count = 0;

const con = mysql.createConnection({
    host:"localhost",
    user: "root",
    passowrd:"",
    database:"lab05"
});

http.createServer(function(req, res){
    res.writeHead(200,{
        "Content-Type":"text/html",
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods": "*"
    });

    if(req.method === GET){
        let sql = "SELECT * FROM `score`";

        con.query(sql, function(err, results){
            if (err){ 
              throw err;
            }
            console.log(results);
            stuff_i_want = results;

            res.end(JSON.stringify(stuff_i_want));
        })
    }

    if(req.method === POST && req.url === endPointRoot + "store/"){
        count++;
        let body = "";
        req.on('data', function(chunk){
            if(chunk != null){
                body += chunk;
            }
        });
        req.on('end', function() {
            let q = url.parse(body, true);
            let name = q.query.name;
            let score = q.query.score;
            con.connect(function (err) { 
                if (err) throw err;
                console.log("Connected!");
                let sql = `INSERT INTO score(name, score) values ('${name}', ${score})`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("1 record inserted");
                });
            });
            res.end(name + " has successfully been added to the dictionary.");
        });
    }
}
).listen(8080);