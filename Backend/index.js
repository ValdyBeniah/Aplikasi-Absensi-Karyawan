import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import SequalizeStore from "connect-session-sequelize";
import path from "path";
import { fileURLToPath } from "url";
import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import WfhRoute from "./routes/WfhRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const sessionStore = SequalizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json()); // Pastikan ini dipanggil sebagai fungsi
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Middleware untuk file statis
app.use(UserRoute);
app.use(WfhRoute);
app.use(AuthRoute);

// store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log("Server is running...");
});
