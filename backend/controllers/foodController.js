import foodModel from "../models/foodModel.js";
import fs from 'fs';

//add food item
const addFood = async (req,res) =>{
    
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });
    try {
        await food.save();
        res.json({success:true,message:"New Food Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"});
    }
};

//all food list
const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}

//remove food item
const removeFood = async (req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Remove"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error while removing"});
    }
}

//to update
// const updateFood = async (req, res) => {
//     try {
//         const { _id, name, description, price, category } = req.body;
//         await foodModel.findByIdAndUpdate(_id, {
//             name,
//             description,
//             price,
//             category
//         });
//         res.json({ success: true, message: "Food updated successfully!" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Failed to update food" });
//     }
// };


export {addFood,listFood,removeFood};