"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: ['https://auth-w-react-zod-ts.vercel.app', 'http://localhost:5173', 'http://localhost:5000'],
    credentials: true,
};
exports.default = corsOptions;
