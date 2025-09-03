import Category from "../models/category.js";



const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find()
       return res.status(200).json({
            success: true,
            categories,
        });

    } catch (error) {
       return res.status(500).json({
            success: false,
            message: "Failed to retrieve categories",
            error: err.message,
        });
    }
}

export { getAllCategories};