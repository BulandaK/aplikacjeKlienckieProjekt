var express = require('express')
var app = express()
const port = process.env.PORT || 3000;
var accesToAdminPage = false;


var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({
    extended: true
}));


var path = require("path");
const {
    parse
} = require('path');
app.use(express.static('static'))
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/main.html"))
});

app.get('/admin', function (req, res) {
    if (accesToAdminPage == true) {
        res.sendFile(path.join(__dirname + "/static/pages/admin2.html"))
    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }
});

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/login.html"))
});

app.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/register.html"))
});
app.get('/main', function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/main.html"))
});
app.get('/logout', function (req, res) {
    accesToAdminPage = false;
    res.sendFile(path.join(__dirname + "/static/pages/main.html"))

});

var UserID = 6;
var users = [{
    id: 1,
    log: "pies",
    pass: "zaq",
    wiek: 15,
    uczen: "checked",
    plec: "m"
}, {
    id: 2,
    log: "kot",
    pass: "zaq",
    wiek: 10,
    uczen: "checked",
    plec: "k"
}, {
    id: 3,
    log: "słoń",
    pass: "zaq",
    wiek: 12,
    uczen: "checked",
    plec: "m"
}, {
    id: 4,
    log: "aligator",
    pass: "zaq",
    wiek: 14,
    uczen: "checked",
    plec: "k"
}, {
    id: 5,
    log: "orzeł",
    pass: "zaq",
    wiek: 19,
    uczen: "checked",
    plec: "k"
}]


app.post("/register", function (req, res) {
    var isExist = false;
    var strona = '';
    for (let i = 0; i < users.length; i++) {
        if (users[i].log == req.body.login) {
            isExist = true;
        }
    }
    if (isExist == true) {
        strona = 'użytkownik o takim loginie juz istnieje'
    } else {
        strona = `pomyślnie zarejestrowano użytkownika ${req.body.login}`
        users.push({
            id: UserID,
            log: req.body.login,
            pass: req.body.password,
            wiek: req.body.age,
            uczen: (req.body.uczen === 'on') ? 'checked' : 'no checked',
            plec: (req.body.male == 'on') ? 'm' : 'k'
        })
    }

    res.send(strona)
    UserID++;
    console.log(`
    \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    `)
    console.log(users)
})




app.post("/login", function (req, res) {

    users.forEach((user) => {
        if (user.log === req.body.login && user.pass === req.body.password) {
            accesToAdminPage = true;
        }
    })
    if (accesToAdminPage == true) {
        console.log('dostęp został odblokowany')
        res.redirect("/admin")
    } else {
        res.send('zły login lub hasło')
    }
})


app.get("/show", function (req, res) {
    if (accesToAdminPage == true) {
        let strona = `<head>
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            background-color: black;
        }
        table{
            margin: 0 auto;
            width:70%;
        }
        th, td {
            
            border: 1px solid sandybrown;
            background-color:black;
            color:white;
        }
        td{
            padding:10px;
            padding-right:60px;
            // text-aligin:left;
            font-family: sans-serif;
            font-size:16px;
        }
        div{
            height: 70px;
            background-color: black;
        }

        div>a{
            display: inline-block;
            font-family: sans-serif;
            font-size: 1.6 rem;
            color: white;
            margin: 25px 0 10px 10px;
        }

       div>a:nth-child(1){
            margin-left: 40px;
        }
        
        </style>
    </head>
    <body>
    <div class="navigation">
        <a href="/sort">sort</a>
        <a href="/gender">gender</a>
        <a href="/show">show</a>
    </div>
    <table class="tabelka">`
        ages = users.sort(function (a, b) {
            return parseFloat(a.id) - parseFloat(b.id);
        });
        for (let i = 0; i < users.length; i++) {
            strona += `<tr><td>id: ${users[i].id}</td>  <td>user: ${users[i].log} - ${users[i].pass}</td>   <td>uczeń: ${(users[i].uczen=='checked')?'<input type="checkbox" disabled  checked >':'<input type="checkbox" disabled  nochecked>'}</td>  <td>wiek: ${users[i].wiek}</td> <td>płeć: ${users[i].plec}</td>  </tr>`
        }
        strona += "</table></body>"
        res.send(strona)
    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }

})


app.get("/gender", function (req, res) {
    if (accesToAdminPage == true) {
        let strona = `<head>
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            background-color: black;
        }
        table{
            margin: 100px auto;
            width: 70%;
        }
        th, td {
            
            border: 1px solid sandybrown;
            background-color:black;
            color:white;
        }
        td{
            padding:10px;
            padding-right:60px;
            // text-aligin:left;
            font-family: sans-serif;
            font-size:16px;
        }
        div{
            height: 70px;
            background-color: black;
        }

        div>a{
            display: inline-block;
            font-family: sans-serif;
            font-size: 1.6 rem;
            color: white;
            margin: 25px 0 10px 10px;
        }

       div>a:nth-child(1){
            margin-left: 40px;
        }
        
        </style>
    </head>
    <body>
    <div class="navigation">
        <a href="/sort">sort</a>
        <a href="/gender">gender</a>
        <a href="/show">show</a>
    </div>
    <table class="tabelka">`
        for (let i = 0; i < users.length; i++) {
            if (users[i].plec == 'm') {
                strona += `<tr><td>id: ${users[i].id}</td>  <td>płeć: ${users[i].plec}</td>  </tr>`
            }

        }
        strona += "</table><table>"
        for (let i = 0; i < users.length; i++) {
            if (users[i].plec == 'k') {
                strona += `<tr><td>id: ${users[i].id}</td>  <td>płeć: ${users[i].plec}</td>  </tr>`
            }

        }
        strona += "</table></body>"
        res.send(strona)
    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }

})




app.get("/sort", function (req, res) {
    if (accesToAdminPage == true) {
        let strona = `<head>
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            background-color: black;
        }
        label{
            color: white;
            font-family: sans-serif;
            font-size:16px;
        }
        table{
            margin: 0 auto;
            width:70%;
        }
        th, td {
            
            border: 1px solid sandybrown;
            background-color:black;
            color:white;
        }
        td{
            padding:10px;
            padding-right:60px;
            // text-aligin:left;
            font-family: sans-serif;
            font-size:16px;
        }
        div{
            height: 70px;
            background-color: black;
        }

        div>a{
            display: inline-block;
            font-family: sans-serif;
            font-size: 1.6rem;
            color: white;
            margin: 25px 0 10px 10px;
        }

       div>a:nth-child(1){
            margin-left: 40px;
        }
        
        </style>
    </head>
    <body>
    <div class="navigation">
        <a href="/sort">sort</a>
        <a href="/gender">gender</a>
        <a href="/show">show</a>
    </div>
<form onchange="this.submit()" method="POST">
<label for="mężczyzna">Rosnąco</label>
<input type="radio" name="rosnące">
<label for="kobieta">Malejąco</label>
<input type="radio" name="malejące">

</form>
    <table class="tabelka">`

        ages = users.sort(function (a, b) {
            return parseFloat(a.wiek) - parseFloat(b.wiek);
        });

        for (let i = 0; i < ages.length; i++) {
            strona += `<tr><td>id: ${ages[i].id}</td>  <td>user: ${ages[i].log} - ${ages[i].pass}</td>    <td>wiek: ${ages[i].wiek}</td>  </tr>`
        }
        strona += "</table></body>"

        res.send(strona)
    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }

})



app.post("/sort", function (req, res) {
    console.log('to jest sort ale post')

    if (accesToAdminPage == true) {
        if (req.body.rosnące == 'on') {
            ages = users.sort(function (a, b) {
                return parseFloat(a.wiek) - parseFloat(b.wiek);
            });
        } else if (req.body.malejące == 'on') {
            ages = users.sort(function (a, b) {
                return parseFloat(b.wiek) - parseFloat(a.wiek);
            });
        }
        let strona = `<head>
        <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body{
            background-color: black;
        }
        label{
            color: white;
            font-family: sans-serif;
            font-size:16px;
        }
        table{
            margin: 0 auto;
            width:70%;
        }
        th, td {
            
            border: 1px solid sandybrown;
            background-color:black;
            color:white;
        }
        td{
            padding:10px;
            padding-right:60px;
            // text-aligin:left;
            font-family: sans-serif;
            font-size:16px;
        }
        div{
            height: 70px;
            background-color: black;
        }

        div>a{
            display: inline-block;
            font-family: sans-serif;
            font-size: 1.6rem;
            color: white;
            margin: 25px 0 10px 10px;
        }

       div>a:nth-child(1){
            margin-left: 40px;
        }
        
        </style>
    </head>
    <body>
    <div class="navigation">
        <a href="/sort">sort</a>
        <a href="/gender">gender</a>
        <a href="/show">show</a>
    </div>
<form onchange="this.submit()" method="POST">
<label for="mężczyzna">Rosnąco</label>
<input type="radio" name="rosnące">
<label for="kobieta">Malejąco</label>
<input type="radio" name="malejące">

</form>
    <table class="tabelka">`

        for (let i = 0; i < ages.length; i++) {
            strona += `<tr><td>id: ${ages[i].id}</td>  <td>user: ${ages[i].log} - ${ages[i].pass}</td>    <td>wiek: ${ages[i].wiek}</td>  </tr>`
        }
        strona += "</table></body>"

        res.send(strona)


    } else {
        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }
})

app.listen(port, function () {
    console.log("start serwera na porcie " + port)
})