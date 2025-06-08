import axios from "axios";
import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";

configDotenv();

const prisma = new PrismaClient();

const strategyrouter = Router();

strategyrouter.post("/", async (req, res) => {
  try {
    
    let {id_b} = req.body

    const business = await prisma.business.findUnique({
      where: {
        id: id_b,
      },
    });

    if (!business) {
      return res.status(404).json({ error: "Business not found" });
    }

    const prompt = `Develop a comprehensive business strategy for ${business.businessName} they have a product called ${business.productName} which is from ${business.industry} which targets people of age group ${business.targetAge}
    The business is targeting people in ${business.targetLocation}.The description of the company is ${business.description} and budget of business is ${business.budget}
    Business Goals: Define short-term and long-term goals.

    Target Audience Analysis: Detailed segmentation of the target audience, including demographics, preferences, and behaviors.

    Trend Analysis: Identify current market trends, competitor strategies, and emerging opportunities in the industry.

    Marketing Strategy:

    Recommended platforms (e.g., Instagram, Google, Facebook, etc.).

    Content strategy (e.g., type of content, posting frequency).

    Advertising strategy (e.g., ad formats, targeting options).

    Ad Campaign Costs:

    Estimated costs for running ads on Instagram, Google, and other relevant platforms.

    Budget allocation for each platform.

    Performance Metrics: Key performance indicators (KPIs) to measure success (e.g., ROI, engagement rate, conversion rate).

    Risk Assessment: Potential challenges and mitigation strategies.
    `;

    console.log(prompt);

    const data = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };

    

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBzRisNmv2lm0nw1fj4Kml_t-2V_KIQtn0";

    try {
      const response = await axios.post(url, data, config);
      res.json(response.data); // Send the response data back to the client
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" }); // Send error response
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default strategyrouter;
