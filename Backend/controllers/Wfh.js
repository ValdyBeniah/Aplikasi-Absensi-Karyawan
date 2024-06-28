import Wfh from "../models/WfhModel.js";
import Users from "../models/UserModel.js";
import moment from "moment-timezone";
import { Op } from "sequelize";
import upload from "../config/multer.js";

export const getWfh = async(req, res) => {
    // try {
    //     let response;
    //     if(req.role === "hrd"){
    //         response = await Wfh.findAll({
    //             attributes:['uuid', 'name', 'date', 'photo'],
    //             include:[{
    //                 model: Users,
    //                 attributes:['name', 'email']
    //             }]
    //         });
    //     } else {
    //         response = await Wfh.findAll({
    //             attributes:['uuid', 'name', 'date', 'photo'],
    //             where:{
    //                 userId: req.userId
    //             },
    //             include:[{
    //                 model: Users,
    //                 attributes:['name', 'email']
    //             }]
    //         });
    //     }
    //     res.status(200).json(response);
    // } catch (error) {
    //     res.status(500).json({msg: error.message});
    // }

    /////////////

    try {
        let response;
        if(req.role === "hrd"){
            response = await Wfh.findAll({
                attributes:['uuid', 'name', 'date', 'photo'],
                include:[{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        } else {
            response = await Wfh.findAll({
                attributes:['uuid', 'name', 'date', 'photo'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }
        const baseURL = "http://localhost:5000/uploads/";
        response = response.map(item => ({
            ...item.dataValues,
            photo: item.photo ? baseURL + item.photo : null
        }));
        res.status(200).json(response);
    } catch (error) {
        console.error(error); // Tambahkan logging error
        res.status(500).json({msg: error.message});
    }
}

export const getWfhById = async(req, res) => {
    try {
        const wfh = await Wfh.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!wfh) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "hrd"){
            response = await Wfh.findOne({
                attributes:['uuid', 'name', 'date', 'photo'],
                where: {
                    id: wfh.id
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        } else {
            response = await Wfh.findOne({
                attributes:['uuid', 'name', 'date', 'photo'],
                where:{
                    [Op.and]:[{id: wfh.id}, {userId: req.userId}]
                },
                include:[{
                    model: Users,
                    attributes:['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createWfh = async(req, res) => {
    // const {name, date, photo} = req.body;
    // try {
    //     await Wfh.create({
    //         name: name,
    //         date: date,
    //         photo: photo,
    //         userId: req.userId
    //     });
    // } catch (error) {
    //     res.status(500).json({msg: error.message});
    // }

    //////////////

    // const { name, date, photo } = req.body;

    // // Parse and validate date
    // const parsedDate = moment.tz(date, "DD/MM/YYYY", true, "UTC"); // Menggunakan timezone UTC
    // if (!parsedDate.isValid()) {
    //     return res.status(400).json({ msg: "Invalid date format. Use DD/MM/YYYY." });
    // }

    // try {
    //     await Wfh.create({
    //         name: name,
    //         date: parsedDate.toDate(), // Convert to JavaScript Date object
    //         photo: photo,
    //         userId: req.userId
    //     });
    //     res.status(201).json({ msg: "WFH entry created successfully." });
    // } catch (error) {
    //     res.status(500).json({ msg: error.message });
    // }

    //////////////////

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            const { name, date } = req.body;
            const photo = req.file ? req.file.filename : null;

            // Parse and validate date
            const parsedDate = moment(date, "YYYY-MM-DD", true);
            if (!parsedDate.isValid()) {
                return res.status(400).json({ msg: "Invalid date format. Use YYYY-MM-DD." });
            }

            try {
                await Wfh.create({
                    name: name,
                    date: parsedDate.toDate(), // Convert to JavaScript Date object
                    photo: photo,
                    userId: req.userId
                });
                res.status(201).json({ msg: "WFH entry created successfully." });
            } catch (error) {
                res.status(500).json({ msg: error.message });
            }
        }
    });
}

export const updateWfh = async(req, res) => {
    // try {
    //     const wfh = await Wfh.findOne({
    //         where: {
    //             uuid: req.params.id
    //         }
    //     });
    //     if(!wfh) return res.status(404).json({msg: "Data tidak ditemukan"});
        
    //     const { name, date, photo } = req.body;

    //     // Parse and validate date
    //     const parsedDate = moment.tz(date, "DD/MM/YYYY", true, "UTC");
    //     if (!parsedDate.isValid()) {
    //         return res.status(400).json({ msg: "Invalid date format. Use DD/MM/YYYY." });
    //     }

    //     if(req.role === "hrd"){
    //         await Wfh.update({name, date: parsedDate.toDate(), photo}, {
    //             where: {
    //                 id: wfh.id
    //             }
    //         });
    //     } else {
    //         if(req.userId !== wfh.userId) return res.status(403).json({msg: "Akses terlarang"});
    //         await Wfh.update({name, date: parsedDate.toDate(), photo}, {
    //             where:{
    //                 [Op.and]:[{id: wfh.id}, {userId: req.userId}]
    //             },
    //         });
    //     }
    //     res.status(200).json({msg: "Data updated"});
    // } catch (error) {
    //     res.status (500).json({msg: error.message});
    // }

    ///////////////////

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ msg: err });
        } else {
            try {
                const wfh = await Wfh.findOne({
                    where: {
                        uuid: req.params.id
                    }
                });
                if (!wfh) return res.status(404).json({ msg: "Data tidak ditemukan" });

                const { name, date } = req.body;
                const photo = req.file ? req.file.filename : wfh.photo;

                // Parse and validate date
                const parsedDate = moment(date, "YYYY-MM-DD", true);
                if (!parsedDate.isValid()) {
                    return res.status(400).json({ msg: "Invalid date format. Use YYYY-MM-DD." });
                }

                if (req.role === "hrd") {
                    await Wfh.update({ name, date: parsedDate.toDate(), photo }, {
                        where: {
                            id: wfh.id
                        }
                    });
                } else {
                    if (req.userId !== wfh.userId) return res.status(403).json({ msg: "Akses terlarang" });
                    await Wfh.update({ name, date: parsedDate.toDate(), photo }, {
                        where: {
                            [Op.and]: [{ id: wfh.id }, { userId: req.userId }]
                        },
                    });
                }
                res.status(200).json({ msg: "Data updated" });
            } catch (error) {
                res.status(500).json({ msg: error.message });
            }
        }
    });
}

export const deleteWfh = async(req, res) => {
    try {
        const wfh = await Wfh.findOne({
            where: {
                uuid: req.params.id
            }
        });
        if(!wfh) return res.status(404).json({msg: "Data tidak ditemukan"});

        if(req.role === "hrd" || req.userId === wfh.userId) {
            await Wfh.destroy({
                where: {
                    id: wfh.id
                }
            });
            res.status(200).json({msg: "Data deleted"});
        } else {
            res.status(403).json({msg: "Akses terlarang"});
        }
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}