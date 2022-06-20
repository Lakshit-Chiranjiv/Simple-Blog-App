import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.json({msg: 'server is on'})
})

app.listen(5000,()=>{
    console.log("Server running on 5000")
})