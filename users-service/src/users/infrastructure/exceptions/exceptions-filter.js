import express from "express";
import {
    Result,
    validationResult,

} from 'express-validator';

export const checkForErrors = (( req, res, next ) => {
    const errorFormatter = ( {
        msg,
                                 path
    } )  => {

        return {
            message: msg,
            field: path
        };
    };

    const error = validationResult(req)
        .formatWith(errorFormatter);
    if (!error.isEmpty()) {
        return res.status(400)
            .json({ errorsMessages: error.array() })
    }
    return next()
})
