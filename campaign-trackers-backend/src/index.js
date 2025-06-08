import express from 'express';
import cors from 'cors';
import strategyrouter from './strategy.js';
import onboardingrouter from './OnbordingRoutes.js';
import Adcreationrouter from './Adcreation.js';
import onBoardUsers from './onboardingUsers.js';
import hookrouter from './hooks.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const port = process.env.PORT || 3000;

const app = express()
app.use(cors());
app.use(express.json())

app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
    const result = await prisma.business.findMany();
    console.log(result);

    res.json({
        msg: "hii there",
        result
    })
})

app.use('/onboard', onboardingrouter);
app.use("/generate", strategyrouter);
app.use("/create", Adcreationrouter);
app.use("/onboardUser", onBoardUsers);
app.use("/gen_hook", hookrouter);



app.listen(3000, () => {
    console.log(`Backend started on port ${port}`);
})