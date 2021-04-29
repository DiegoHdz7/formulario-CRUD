const express = require('express');
const router = express.Router();

const Task = require('../models/task');// agregar la DB



router.get('/', async (req,res)=>{
    let tasks = await Task.find();
    //console.log(tasks);
    res.render('index.ejs', {tasks:tasks});
});

router.post('/add', async (req,res)=>{ //asyc para procesos asincronos como guardar datos en db

    const task = new Task(req.body);// guardar el json en un obj
  // console.log(new Task(req.body));
    await task.save();   // gusardar el json en la db
    let tasks = await Task.find();
    res.redirect('/');
    //res.render('index.ejs',{tasks:tasks});
    //res.send('recibido'); //al parecer solo puede haber una accion de estas
    
});

router.get('/swap/:id', async(req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    console.log(task);
    await task.save();
    res.redirect('/');
    

});

router.get('/edit/:id', async(req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    res.render('edit.ejs', {task:task});
    
    

});

router.post('/edit/:id', async(req,res)=>{
    

    const {id}=req.params;
    await Task.updateOne({_id:id},req.body);// funciona con updateOne o updateMany
    res.redirect('/');
    
    
    

});

router.get('/delete/:id', async (req,res)=>{
    console.log(req.params); // req.params para ver los parametros variables
    let {id} = req.params; // asigna a un objeto con numbre id el valor de re.params
   // console.log(id);
    await Task.remove({_id: id});
    res.redirect('/');
});



module.exports = router;