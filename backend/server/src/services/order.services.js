const dbConnect =require("../config/db.config")
exports.getOrders =async(details)=>{
    try {
        const collection= dbConnect.db.collection('order_items');
        const orders =await collection.aggregate([{$match:{seller_id:details.seller_id}},{$sort:{price:1,shipping_limit_date:1}},{$limit:details.limit},{$lookup:{from:"products",localField:"product_id",foreignField:"product_id", as:"products"}}]).toArray(); 
        return orders;
    } catch (error) {
        return {"error":error}
    }
}

exports.deleteOrder=async(details)=>{
    try {
        const collection= dbConnect.db.collection('order_items');
        const orders =await collection.deleteOne({...details})
        if(orders.deletedCount===0)
        return {err:"item not found"}
        return orders;
    } catch (error) {
        return{"error":error};
    }
}