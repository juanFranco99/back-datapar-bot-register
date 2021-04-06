import { Router } from "express";
import { addEmpresa, deleteEmpresa, getAllEmpresas, getEmpresaById, updateEmpresa } from "../controllers/empresa.controller";

const router = Router();

router.get('/empresa', getAllEmpresas);
router.get('/empresa/:codigo', getEmpresaById);
router.post('/empresa', addEmpresa);
router.put('/empresa/:codigo', updateEmpresa);
router.delete('/empresa/:codigo', deleteEmpresa);

export = router;