import { Request, Response } from "express";

export const rootController = (req: Request, res: Response) => {
  const htmlresponse = `
<html lang="en">

<head>
  <title>Backend Tienda Nucba</title>
</head>
<body>
  <h1>Backend Tienda Nucba</h1>
  <h2>Proyecto integrador backend</h2>
  <h3>Tecnologias usadas:</h3>
  <ul>
  <li>Node Js</li>
  <li>Express (Framework)</li>
  <li>Mongo Db</li>
  <li>Cloudinary</li>
  <li>Typescript</li>
  </ul>
</body>

</html>
`;
  res.send(htmlresponse);
};
