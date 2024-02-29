import express from "express";

import { urlModel } from "../model/schema";

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { fullUrl } = req.body;
        console.log(fullUrl);
        const urlFound = await urlModel.find({ fullUrl });

        if(urlFound.length > 0) {
            res.status(409);
            res.send(urlFound);
        } else {
            const shortUrl = await urlModel.create({ fullUrl })
            res.status(201);
            res.send(shortUrl);
        }
    } catch (err) {
        res.status(500).send({message : "Internal server error"});
    }
};

export const getAllUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrls = await urlModel.find().sort({createdAt: -1});
        if(shortUrls.length < 0) {
            res.status(404).send({message : "Short URLs not found"});
        } else {
            res.status(200).send(shortUrls);
        }
    } catch(err) {
        res.status(500).send({message : "Internal server error"});
    }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findOne({shortUrl: req.params.id});

        if(!shortUrl) {
            res.status(400).send({message: "Full url not found"})
        } else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    } catch(err) {
        res.status(500).send({message : "Internal server error"});
    }
};

export const deleteUrl = async (req: express.Request, res: express.Response) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({_id: req.params.id});

        if(shortUrl) {
            res.status(200).send({message: "Requested URL deleted successfully"})
        }
    } catch(err) {
        res.status(500).send({message : "Internal server error"});
    }
};