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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
const prisma_1 = __importDefault(require("./services/prisma"));
// Routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const brandRoutes_1 = __importDefault(require("./routes/brandRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
// Extra packages
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// Middleware
const notFound_1 = __importDefault(require("./middleware/notFound"));
const error_handler_1 = __importDefault(require("./middleware/error-handler"));
const corsOptions_1 = require("./types/corsOptions");
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use((0, express_fileupload_1.default)());
app.use((0, morgan_1.default)('tiny'));
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/products', productRoutes_1.default);
app.use('/api/productBrand', brandRoutes_1.default);
app.use('/api/productCategory', categoryRoutes_1.default);
app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});
app.use(notFound_1.default);
app.use(error_handler_1.default);
// Start app when connection to db successful
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_1.default.$connect();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
