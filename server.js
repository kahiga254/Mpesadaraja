import 'dotenv/config';
import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import path, {dirname} from "path";
import bodyParser from 'body-parser';


// Initialize express
const app = express();

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies
app.use(bodyParser.json());


// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const staticPath = path.join(__dirname);
app.use(express.static(staticPath));

// Route handler for index.html
app.get('/', (req, res) => {
    res.sendFile(path.resolve(staticPath, 'index.html'));
  });

import lipaNaMpesaRoutes from "./routes.lipanampesa.js";
app.use('/api', lipaNaMpesaRoutes);

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
