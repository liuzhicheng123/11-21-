var http=require("http"),
    querystring = require('querystring'),
    fs=require("fs")

http.createServer(function(req,res){
    //跨域
    res.setHeader('Access-Control-Allow-Origin','*');
    var str="";
    var data=[]
    req.on("data",function(data){
        console.log(data)
        str+=data;
    })
    req.on("end",function(err){
        console.log(str)
        var json=querystring.parse(str)
        console.log(json)
        var data = fs.readFileSync('a.txt','utf-8')
        data = JSON.parse(data)
        data.push({user:json.user,pass:json.pass})
        fs.writeFileSync('a.txt',JSON.stringify(data));
        res.write(JSON.stringify(data))
        res.end();




    })
}).listen(8080,function(){
    console.log("成功")
})
