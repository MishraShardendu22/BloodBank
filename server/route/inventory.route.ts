import express from "express";
import {
    createInventory,
    getInventory,
    getInventoryByFilter,
    getRecentInventory,
    getDonorController,
    getHospitalController,
    getOrganizationController,
    getOrganizationForHospitalController
} from "../controller/inventory.controller";
import authMiddleware from "../middleware/auth.miiddleware";

const router = express.Router();

router.post("/create-inventory",authMiddleware, createInventory);
router.get("/get-inventory",authMiddleware,getInventory);
router.get("/get-recent-inventory",authMiddleware, getInventoryByFilter);
router.post("/get-inventory-hospital",authMiddleware, getRecentInventory);
router.get("/get-donor",authMiddleware, getDonorController);
router.get("/get-hospital",authMiddleware, getHospitalController);
router.get("/get-organisation",authMiddleware, getOrganizationController);
router.get("/get-organizations-for-hospital",authMiddleware, getOrganizationForHospitalController);

export default router;
