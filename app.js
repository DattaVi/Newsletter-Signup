const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const request=require("request");
const app=express();
var s;
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    s=res;
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",function(req,res){
var fname=req.body.firstname;
var lname=req.body.lastname;
var e=req.body.email;
var data={
    members:[
        {
            email_address:e,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
        }
    ]
};
var jdata=JSON.stringify(data);
const url="https://us21.api.mailchimp.com/3.0/lists/941ef0377a";
const options={
    method:"POST",
    auth:"vivek:12a02d8c3ab23e28ba279b4dedd5d82f-us21"
}
const request=https.request(url,options,function(response){
    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html")
    }
    else{
        res.send(__dirname+"/failure.html");
    }
    response.on("data",function(data){
        console.log(JSON.parse(data));
    })
})
request.write(jdata);
request.end();
})
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT||3000,function(){
    console.log("'server is running on port 3000");
})


// API key
// 12a02d8c3ab23e28ba279b4dedd5d82f-us21

// listid
// 941ef0377a