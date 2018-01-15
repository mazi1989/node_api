import MockData from '../data/mockData';
import config from '../core/config/config';

export default class Middleware {
    static getData = (req, res, next) => {
        req.dbData = MockData.products;
        next();
    }

    static dataPagination = (req, res, next) => {
        const itemNumbers = req.dbData.length;
        const pageNumber = req.query.page === undefined ? 1 : req.query.page;
        const itemsPerPage = config.itemsPerPage;

        if (itemNumbers % itemsPerPage) {
            req.totalPageNumber = Math.floor(itemNumbers / itemsPerPage) + 1;
        } else {
            req.totalPageNumber = itemNumbers / itemsPerPage;
        } 

        req.dbData = req.dbData.slice(itemsPerPage * (pageNumber - 1), (pageNumber * itemsPerPage));
        next();
    }

    static filterByCategory = (req, res, next) => {
        let dataArray = [];

        req.dbData.forEach(item => {
            if (item.category === req.params.category) {
                dataArray.push(item);
            }
        });

        req.dbData = dataArray;
        next();
    }

    static filterByName = (req, res, next) => { 
        const name = req.query.q;
        if (name === undefined) {
            next();
        } else {
            let dataArray = [];

            req.dbData.forEach(item => {
                if (item.name === name) {
                    dataArray.push(item);
                }
            });

            req.dbData = dataArray;
            next();
        }
    }

    static sortPrice = (req, res, next) => {
        const sortType = req.query.price;
        if (sortType === undefined) {
            next();
        } else {
            req.dbData.sort((prevItem, nextItem) => {
                if (sortType === 'asc') {
                    return nextItem.price - prevItem.price;
                } else if (sortType === 'desc') {
                    return prevItem.price - nextItem.price;
                }              
            });

            next();
        }
    };

    static sortAlphabetically = (req, res, next) => {
        const sortType = req.query.name;

        if (sortType === undefined) {
            next();
        } else if (sortType === 'asc') {
            req.dbData.sort();
        } else if (sortType === 'desc'){
            req.dbData.reverse();
        }

        next();
    };
}