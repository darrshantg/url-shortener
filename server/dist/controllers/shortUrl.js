"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const schema_1 = require("../model/schema");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        console.log(fullUrl);
        const urlFound = yield schema_1.urlModel.find({ fullUrl });
        if (urlFound.length > 0) {
            res.status(409);
            res.send(urlFound);
        }
        else {
            const shortUrl = yield schema_1.urlModel.create({ fullUrl });
            res.status(201);
            res.send(shortUrl);
        }
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrls = yield schema_1.urlModel.find().sort({ createdAt: -1 });
        if (shortUrls.length < 0) {
            res.status(404).send({ message: "Short URLs not found" });
        }
        else {
            res.status(200).send(shortUrls);
        }
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield schema_1.urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(400).send({ message: "Full url not found" });
        }
        else {
            shortUrl.clicks++;
            shortUrl.save();
            res.redirect(`${shortUrl.fullUrl}`);
        }
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield schema_1.urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: "Requested URL deleted successfully" });
        }
    }
    catch (err) {
        res.status(500).send({ message: "Internal server error" });
    }
});
exports.deleteUrl = deleteUrl;
