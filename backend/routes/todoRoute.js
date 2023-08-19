const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

const tododata = require('../model/tododata');


//to get  data 

router.get('/getdata' , async (req, res) => {
   
                  try {
                    const data = await tododata.find();
    
                    res.send({  data });
                  } catch (error) {
                    res.status(400).json({ message: "Can't get data" });
                  }  
               
                })

//to post learner data from learners' form
router.post('/postdata', async (req, res) => {
    try {
        const item = req.body;
        const newdata = new tododata(item);
       
                   const savedData= await newdata.save();
                    res.status(200).json({ message: "Posted successfully" });}

                    catch (error) {
                        res.status(500).json({ message: "Post not successful" });
                    }
            })
 
    

//to update data
router.put('/putdata/:id',  async (req, res) => {
    try {
        const item = req.body;
        const index = req.params.id;
        const updatedData = tododata.findByIdAndUpdate(index, item).exec();
        res.json({ message: "Updated successfully" });
    } catch (error) {
        res.json({ message: "Updation not successful" });
    }
})

//to delete  data
router.delete('/deldata/:id', (req, res) => {

    try {
        const ind = req.params.id;

       tododata.findByIdAndDelete(ind).exec();
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.json({ message: 'Deletion not successful' });
    }
})



module.exports = router;