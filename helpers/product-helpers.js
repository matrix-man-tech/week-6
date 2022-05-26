
var db=require('../config/connection')
var collection=require('../config/collections')
var objectId=require('mongodb').ObjectId
const async = require('hbs/lib/async')
const { resolve } = require('express-hbs/lib/resolver')
const { reject } = require('bcrypt/promises')
const { response } = require('../app')
module.exports={

    addProduct:(product,callback)=>{
        

        db.get().collection('product').insertOne(product).then((data)=>{
            
            callback(data.insertedId)
        })
    },
    getAllproducts:()=>{
        return new Promise(async(resolve,reject)=>{
            let products=await db.get().collection(collection.PRODUCT_COL).find().toArray()
            resolve(products)
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            console.log(objectId(proId));
            db.get().collection(collection.PRODUCT_COL).deleteOne({_id:objectId(proId) }).then((response)=>{
                // console.log(response);
                resolve(response)
            })
        })
    },
    getProductDetailes:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COL).findOne({_id:objectId(proId)}).then((product)=>{
            resolve(product)
            })
        })
    },
    updateProduct:(proId,proDetailes)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COL)
            .updateOne({_id:objectId(proId)},{
                $set:{
                    Name:proDetailes.Name,
                    Type:proDetailes.Type,
                    Description:proDetailes.Description
                    

                }
            }).then((response)=>{
                resolve()
            })
        })
    }
}