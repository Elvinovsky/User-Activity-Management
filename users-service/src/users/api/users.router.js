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
   await axios.post('http://localhost:3000/history', resultCreate).then(function (response) {
       console.log(response);
   })
       .catch(function (error) {
           console.log(error);
       });

    if(resultCreate) {
        return res.status(201).send(resultCreate)
    }

    return res.sendStatus(500)
});

usersRouter.get('/', async (req, res) => {
    const getAllUsers = await service.getUsers();
    res.send(getAllUsers);
});

usersRouter.put('/:id', paramValidator, ...bodyValidator, checkForErrors, async (req, res) => {
    const updateData = {
        id: req.params.id,
        firstName: req.body.firstName,
        age: req.body.age,
        lastName: req.body.lastName,
    }

    const resultUpdate = await service.update(updateData);

    if (!resultUpdate) {
        res.sendStatus(404);
        return;
    }
    await axios.put('http://localhost:3000/history', updateData).then(function (response) {
        console.log(response);
    })
        .catch(function (error) {
            console.log(error);
        });

    return res.sendStatus(204);
});
