import express from "express";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

const router = express.Router();

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await Cart.findById(cid);
    cart.products = cart.products.filter(p => p.productId.toString() !== pid);
    await cart.save();

    res.status(200).json({ status: "success", message: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al eliminar producto del carrito" });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await Cart.findById(cid);
    cart.products = products; 
    await cart.save();

    res.status(200).json({ status: "success", message: "Carrito actualizado" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar el carrito" });
  }
});


router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findById(cid);
    const productInCart = cart.products.find(p => p.productId.toString() === pid);

    if (productInCart) {
      productInCart.quantity = quantity;
      await cart.save();
      res.status(200).json({ status: "success", message: "Cantidad de producto actualizada" });
    } else {
      res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al actualizar cantidad de producto" });
  }
});


router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await Cart.findById(cid);
    cart.products = []; 
    await cart.save();

    res.status(200).json({ status: "success", message: "Todos los productos eliminados del carrito" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al eliminar productos del carrito" });
  }
});


router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await Cart.findById(cid).populate("products.productId");
    if (!cart) return res.status(404).json({ status: "error", message: "Carrito no encontrado" });

    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al obtener el carrito" });
  }
});

export default router;
