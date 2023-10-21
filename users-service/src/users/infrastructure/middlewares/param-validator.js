import express from "express";
import validator from "validator";

export const paramValidator = (req, res, next) => {
    if (!validator.isUUID(req.params.id)) {
        return res.sendStatus(404);
    }

    next();
}
