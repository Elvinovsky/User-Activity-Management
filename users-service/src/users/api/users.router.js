import { Router } from 'express';
import service from "../infrastructure/compositions-root.js";
import {paramValidator} from "../infrastructure/middlewares/param-validator.js";
import bodyValidator from "../infrastructure/middlewares/body-validator.js"
import {checkForErrors} from "../infrastructure/exceptions/exceptions-filter.js";
import axios from "axios";



export const usersRouter = Router();

usersRouter.post('/', ...bodyValidator, checkForErrors ,async (req, res) => {
    const resultCreate = await service.create(
        req.body.firstName,
        req.body.age,
        req.body.lastName,
    );

    const apiUrl = 'http://localhost:3000/history/create'

    const requestData = {
        id: resultCreate.id,
        fullName: resultCreate.fullName
    }


    if(resultCreate) {
        await axios.post(apiUrl, requestData).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
            return res.sendStatus(500)
        });

        return res.status(201).send(resultCreate)
    }

});

usersRouter.get('/', async (req, res) => {
    const getAllUsers = await service.getUsers();
    res.send(getAllUsers);
});

usersRouter.get('/history', async (req, res) => {
    try {
        const queryParams = {
            pageNumber: req.query?.pageNumber,
            pageSize: req.query?.pageSize,
        };
        const getHistory = await axios.get('http://localhost:3000/history', {params: queryParams})

        res.send(getHistory.data);
    } catch (e) {
        console.log(e)
       return res.sendStatus(500)
    }
});

usersRouter.put('/:id', paramValidator, ...bodyValidator, checkForErrors, async (req, res) => {
    const inputData = {
        id: req.params.id,
        firstName: req.body.firstName,
        age: req.body.age,
        lastName: req.body.lastName,
    }

    const resultUpdate = await service.update(inputData);
    if (!resultUpdate) {
        res.sendStatus(404);
        return;
    }

    const apiUrl = 'http://localhost:3000/history/create'
    const requestData = {
        id: inputData.id,
        fullName: `${inputData.firstName} ${inputData.lastName}`
    }

    await axios.post(apiUrl, requestData)
        .then(function (response) {
        console.log(response);
    }).catch(function (error) {
            console.log(error);
            return res.sendStatus(500);
        });

    return res.sendStatus(204);
});
