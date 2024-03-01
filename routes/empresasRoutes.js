import express from "express";

const router = express.Router();

import {
  iniciarConversacion,
  interactuarConUsuario,
} from "../controllers/empresasController.js";

router.get("/iniciar", iniciarConversacion);
router.post("/chat", interactuarConUsuario);

export default router;
