const express = require('express');
const router = express.Router();

const Task = require('../models/task');// agregar la DB



router.get('/', (req,res)=>{
    res.render('index.ejs');
});

router.post('/add', async (req,res)=>{ //asyc para procesos asincronos como guardar datos en db

    const task = new Task(req.body);// guardar el json en un obj
   console.log(new Task(req.body));
    await task.save();   // gusardar el json en la db
    res.render('index.ejs');
    //res.send('recibido'); //al parecer solo puede haber una accion de estas
    
});



module.exports = router;