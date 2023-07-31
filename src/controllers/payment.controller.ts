import mercadopago from "mercadopago";
import { Request, Response } from "express";

mercadopago.configure({ access_token: process.env.MP_KEY || "" });

export const payOrder = async (req: Request, res: Response) => {
  const product = req.body;
  const result = await mercadopago.preferences
    .create({
      items: [
        {
          title: product.title,
          currency_id: "ARS",
          unit_price: product.unit_price,
          quantity: 1,
          description: product.description,
          category_id: product.id,
        },
      ],
      back_urls: {
        success: "https://tienda-online-nucba.onrender.com/success", //cambiar las direcciones al host de la pagina
        failure: "https://tienda-online-nucba.onrender.com/failure",
        pending: "https://tienda-online-nucba.onrender.com/pending",
      },
      auto_return: "approved",
      binary_mode: true,
    })
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
  console.log(result);
};
