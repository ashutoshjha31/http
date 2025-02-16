const express = require("express");
const app = express();

const users = [{
    name: "John",
    kidneys: [{
        healthy: true
    }]
},
{
    name:"Hero",
    kidneys:[{
        healthy: false
    },
        {
            healthy: true
        }]
}];

app.use(express.json());


//get method displays total kidneys

app.get("/", function (req, res) {
    const herokidneys = users[1].kidneys;
    console.log(herokidneys);
    
    const numberofkidneys = herokidneys.length;
    console.log(numberofkidneys);
    
    let numberofhealthykidneys = 0;
    for (let i = 0; i < herokidneys.length; i++) {
        if (herokidneys[i].healthy === true) {
            numberofhealthykidneys += 1;
        }
    }

    const numberofunhealthykidneys = numberofkidneys - numberofhealthykidneys;
    res.send({
        numberofkidneys,
        numberofhealthykidneys,
        numberofunhealthykidneys
    });
});


//Post method is used to add new kidneys....
app.post("/",function(req,res){
    const ishealthy=req.body.ishealthy; //property named ishealthy is made which is used 
    users[1].kidneys.push({
        healthy:ishealthy
    })
    res.json(
        {
            msg:"Done!"
        }
    )
})

//Put method is used to replace kidneys.....
app.put("/",function(req,res){
    for(let i=0;i<users[1].kidneys.length;i++){
        users[1].kidneys[i].healthy=true;
    }
    res.json({})
})

//Delete method is used to delete kidneys......

app.delete("/",function(req,res){
    const newkidneys=[];
    for(let i=0;i<users[1].kidneys.length;i++){
        if(users[1].kidneys[i].healthy){
            newkidneys.push({
                healthy:true
            })
        }
    }
    users[1].kidneys=newkidneys;
    res.json({msg:"done"})
})


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
