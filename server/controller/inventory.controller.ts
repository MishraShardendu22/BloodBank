import Inventory from '../models/inventory.model';
import User from '../models/user.model';
import mongoose from 'mongoose';
import ResponseApi from '../utils/apiResponse.util';
import { Request, Response } from 'express';

const createInventory = async (req: Request, res: Response) => {
    try {
        // we already have user id because of auth middleware
        const { user_email } = req.body;

        const userExist = await User.findOne(
            { email: user_email }, 
        )

        if(!userExist){
            return ResponseApi(res, 400, 'User not found');
        }

        if(req.body.inventoryType === "out"){
            const reqBlood = req.body.bloodGroup;
            const reqQuantity = req.body.quantity;
            const org = new mongoose.Types.ObjectId(req.body.userId);
            
            const totalInBlood = await Inventory.aggregate([
                {
                    $match: {
                        organization: org,
                        inventoryType: "in",
                        bloodGroup: reqBlood,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);

            const totalIn = totalInBlood.length > 0 ? totalInBlood[0].total : 0;

            const totalOutBlood = await Inventory.aggregate([
                {
                    $match: {
                        organization: org,
                        inventoryType: "out",
                        bloodGroup: reqBlood,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);

            const totalOut = totalOutBlood.length > 0 ? totalOutBlood[0].total : 0;

            const availableBlood = totalIn - totalOut;
            if(availableBlood < reqQuantity){
                return ResponseApi(res, 400, 'Not enough blood available');
            }

            req.body.hospital = userExist?._id;
        }else{
            req.body.donar = userExist?._id;
        }

        const inventory = new Inventory(req.body);
        await inventory.save();

        return ResponseApi(res, 200, 'Inventory created successfully', inventory);
    } catch (error) {
        console.error('Error in createInventory:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getInventory = async (req: Request, res: Response) => {
    try {
        const inventory = await Inventory.find(
            { organisation: req.body.userId }
        ).populate("donar").populate("hospital").sort({createdAt: -1})

        return ResponseApi(res, 200, 'Inventory fetched successfully', inventory);
    } catch (error) {
        console.error('Error in getInventory:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getInventoryByHospital = async (req: Request, res: Response) => {
    try {
        const inventory = await Inventory.find(req.body.filters)
            .populate("donar")
            .populate("hospital")
            .populate("organization")
            .sort({ createdAt: -1 });

        return ResponseApi(res, 200, 'Inventory fetched successfully', inventory);
    } catch (error) {
        console.error('Error in getInventoryByFilter:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getRecentInventory = async (req: Request, res: Response) => {
    try {
        const inventory = await Inventory.find({ organization: req.body.userId })
            .limit(5)
            .sort({ createdAt: -1 });

        return ResponseApi(res, 200, 'Inventory fetched successfully', inventory);
    } catch (error) {
        console.error('Error in getRecentInventory:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getDonor = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return ResponseApi(res, 400, 'Missing required field: UserId');
        }

        const donorIds = await Inventory.distinct("donar", { organization: userId });
        const donors = await User.find({ _id: { $in: donorIds } });

        return ResponseApi(res, 200, 'Donors fetched successfully', donors);
    } catch (error) {
        console.error('Error in getDonorController:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getHospital = async (req: Request, res: Response) => {
    try {
        const organisation = req.body.userId;

        const hospitalIds = await Inventory.distinct("hospital", { organisation });
        const hospitals = await User.find({ _id: { $in: hospitalIds } });

        return ResponseApi(res, 200, 'Hospitals fetched successfully', hospitals);
    } catch (error) {
        console.error('Error in getHospitalController:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getOrganization = async (req: Request, res: Response) => {
    try {
        const donar = req.body.userId;

        const organizationIds = await Inventory.distinct("organization", { donar });
        const organizations = await User.find({ _id: { $in: organizationIds } });

        return ResponseApi(res, 200, 'Organizations fetched successfully', organizations);
    } catch (error) {
        console.error('Error in getOrganizationController:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getOrganizationForHospitalController = async (req: Request, res: Response) => {
    try {
        const hospital = req.body.userId;

        const orgIds = await Inventory.distinct("organization", { hospital });
        const organizations = await User.find({ _id: { $in: orgIds } });

        return ResponseApi(res, 200, 'Organizations fetched successfully', organizations);
    } catch (error) {
        console.error('Error in getOrganizationForHospitalController:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};


export {
    getDonor,
    getHospital,
    getInventory,
    createInventory,
    getOrganization,
    getRecentInventory,
    getInventoryByHospital,
    getOrganizationForHospitalController
};