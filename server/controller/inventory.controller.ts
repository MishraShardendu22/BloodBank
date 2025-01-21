import Inventory from '../models/inventory.model';
import User from '../models/user.model';
import mongoose from 'mongoose';
import ResponseApi from '../utils/apiResponse.util';
import { Request, Response } from 'express';

const createInventory = async (req: Request, res: Response) => {
    try {
        const { _id, bloodGroup, quantity, inventoryType, email } = req.body;

        // Check for missing required fields
        if (!_id || !bloodGroup || !quantity || !inventoryType || !email) {
            return ResponseApi(res, 400, 'Missing required fields');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return ResponseApi(res, 404, 'User not found');
        }

        if (inventoryType === "out") {
            const reqBloodGroup = bloodGroup;
            const reqQuantity = quantity;
            const org = new mongoose.Types.ObjectId(_id);

            // Calculate total available blood
            const totalIn = await Inventory.aggregate([
                {
                    $match: {
                        organization: org,
                        inventoryType: "in",
                        bloodGroup: reqBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            const InBlood = totalIn[0]?.total || 0;

            const totalOut = await Inventory.aggregate([
                {
                    $match: {
                        organization: org,
                        inventoryType: "out",
                        bloodGroup: reqBloodGroup,
                    },
                },
                {
                    $group: {
                        _id: "$bloodGroup",
                        total: { $sum: "$quantity" },
                    },
                },
            ]);
            const OutBlood = totalOut[0]?.total || 0;

            const available = InBlood - OutBlood;

            // Check if sufficient blood is available
            if (available < reqQuantity) {
                return ResponseApi(res, 400, 'Insufficient blood');
            }

            req.body.organization = user._id;
        } else {
            req.body.donar = user._id;
        }

        const inventory = new Inventory(req.body);
        await inventory.save();

        return ResponseApi(res, 201, 'Inventory created successfully', inventory);
    } catch (error) {
        console.error('Error in createInventory:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getInventory = async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return ResponseApi(res, 400, 'Missing required field: _id');
        }

        const inventory = await Inventory.find({ organization: _id })
            .populate("donar")
            .populate("hospital")
            .sort({ createdAt: -1 });

        return ResponseApi(res, 200, 'Inventory fetched successfully', inventory);
    } catch (error) {
        console.error('Error in getInventory:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getInventoryByFilter = async (req: Request, res: Response) => {
    try {
        const { filter } = req.body;
        if (!filter || typeof filter !== 'object') {
            return ResponseApi(res, 400, 'Invalid filter');
        }

        const inventory = await Inventory.find(filter)
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
        const { _id } = req.body;
        if (!_id) {
            return ResponseApi(res, 400, 'Missing required field: _id');
        }

        const inventory = await Inventory.find({ organization: _id })
            .limit(5)
            .sort({ createdAt: -1 });

        return ResponseApi(res, 200, 'Inventory fetched successfully', inventory);
    } catch (error) {
        console.error('Error in getRecentInventory:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getDonorController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return ResponseApi(res, 400, 'Missing required field: _id');
        }

        const donorIds = await Inventory.distinct("donar", { organization: _id });
        const donors = await User.find({ _id: { $in: donorIds } });

        return ResponseApi(res, 200, 'Donors fetched successfully', donors);
    } catch (error) {
        console.error('Error in getDonorController:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getHospitalController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return ResponseApi(res, 400, 'Missing required field: _id');
        }

        const hospitalIds = await Inventory.distinct("hospital", { organization: _id });
        const hospitals = await User.find({ _id: { $in: hospitalIds } });

        return ResponseApi(res, 200, 'Hospitals fetched successfully', hospitals);
    } catch (error) {
        console.error('Error in getHospitalController:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getOrganizationController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return ResponseApi(res, 400, 'Missing required field: _id');
        }

        const organizationIds = await Inventory.distinct("organization", { donar: _id });
        const organizations = await User.find({ _id: { $in: organizationIds } });

        return ResponseApi(res, 200, 'Organizations fetched successfully', organizations);
    } catch (error) {
        console.error('Error in getOrganizationController:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

const getOrganizationForHospitalController = async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        if (!_id) {
            return ResponseApi(res, 400, 'Missing required field: _id');
        }

        const orgIds = await Inventory.distinct("organization", { hospital: _id });
        const organizations = await User.find({ _id: { $in: orgIds } });

        return ResponseApi(res, 200, 'Organizations fetched successfully', organizations);
    } catch (error) {
        console.error('Error in getOrganizationForHospitalController:', error);
        return ResponseApi(res, 500, 'Internal server error', error);
    }
};

export {
    createInventory,
    getInventory,
    getInventoryByFilter,
    getRecentInventory,
    getDonorController,
    getHospitalController,
    getOrganizationController,
    getOrganizationForHospitalController,
};