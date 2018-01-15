import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from './core/config/config';
import products from './routes/products.route';

const port = config.serverPort;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', products);

app.get('/', (req, res) => {
    res.status(404).send('Invalid endpoint!');
});

app.listen(port, () => {
    console.log('server start on port - ', port);
});