import express from "express";
import Middleware from '../middleware/middleware';
const router = express.Router();

router.get('/',  [Middleware.getData, Middleware.filterByName, 
    Middleware.sortPrice, Middleware.sortAlphabetically, Middleware.dataPagination], 
    (req, res) => {
    res.json({data: req.dbData, totalPageNumber: req.totalPageNumber});
})

router.get('/:category',  [Middleware.getData, Middleware.filterByCategory, Middleware.filterByName, 
    Middleware.sortPrice, Middleware.sortAlphabetically, Middleware.dataPagination], 
    (req, res) => {
    res.json({data: req.dbData, totalPageNumber: req.totalPageNumber});
})

export default router;