import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const mongoQuery = {};

  
  if (query) {
    if (query === "available") {
      mongoQuery.stock = { $gt: 0 }; 
    } else {
      mongoQuery.category = query; 
    }
  }


  const sortOptions = sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {};

  try {
    const products = await Product.find(mongoQuery)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalProducts = await Product.countDocuments(mongoQuery);
    const totalPages = Math.ceil(totalProducts / limit);

    const response = {
      status: "success",
      payload: products,
      totalPages,
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? parseInt(page) + 1 : null,
      page: parseInt(page),
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
      nextLink: page < totalPages ? `/api/products?limit=${limit}&page=${parseInt(page) + 1}&sort=${sort}&query=${query}` : null,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener productos" });
  }
});

export default router;
