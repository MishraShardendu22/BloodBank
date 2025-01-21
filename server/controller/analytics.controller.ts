import { Request, Response } from "express";
import Inventory from "../models/inventory.model"; // Ensure the correct import for the inventory model
import mongoose from "mongoose";
import ResponseApi from "../utils/apiResponse.util";

const bloodGroupDetailController = async (req: Request, res: Response) => {
    try {
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']; // Corrected variable name
        const bloodGroupDetail: any = [];
        const organization = new mongoose.Types.ObjectId(req.body._id); // Correct variable name

        await Promise.all(
            bloodGroups.map(async (bloodGroup) => {
                // Count TOTAL IN
                const totalIn = await Inventory.aggregate([
                    {
                        $match: {
                            bloodGroup,
                            inventoryType: "in",
                            organization, // Fixed variable name
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$quantity" },
                        },
                    },
                ]);

                // Count TOTAL OUT
                const totalOut = await Inventory.aggregate([
                    {
                        $match: {
                            bloodGroup,
                            inventoryType: "out",
                            organization, // Fixed variable name
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            total: { $sum: "$quantity" },
                        },
                    },
                ]);

                // Calculate Total Available Blood
                const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

                // Push Data to Array
                bloodGroupDetail.push({
                    bloodGroup,
                    totalIn: totalIn[0]?.total || 0,
                    totalOut: totalOut[0]?.total || 0,
                    availableBlood,
                });
            })
        );

        return ResponseApi(res, 200, "Blood Group Detail", bloodGroupDetail);
    } catch (error) {
        console.error(error);
        return ResponseApi(res, 500, "Internal Server Error");
    }
};

export {
    bloodGroupDetailController,
};