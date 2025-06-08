import axios from "axios";
import { Router } from "express";
import { PrismaClient } from '@prisma/client';
import { configDotenv } from 'dotenv';
import twilio from 'twilio';

configDotenv();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const hookrouter = Router();
const prisma = new PrismaClient();

hookrouter.post('/', async (req, res) => {
  let { id_b } = req.body
  let reddit_hook = ""
  let twitter_hook = ""
  let whatsapp_hook = ""

  const business = await prisma.business.findUnique({
    where: {
      id: id_b,
    },
  });

  if (!business) {
    return res.status(404).json({ error: "Business not found" });
  }

  const prompt = `Develop 3 hook or msg which is catchy and for marketing the product to user for each whatsapp , twitter and reddit based on
    the business name ${business.businessName} they have a product called ${business.productName} which is from ${business.industry} which targets people of age group ${business.targetAge}
    and marketing is focused on ${business.targetLocation}.The description of the company is ${business.description}
    
    Display data as 3 message for whatsapp , twitter and reddit
    Whatsapp : Data
    Twitter : Data
    Reddit : Data

    Keep the response to the point and short not long and descriptive for one or two lines not more than that
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
    // res.json(response.data); 
    // console.log("Response data:", response.data);

    let text = response.data.candidates[0].content.parts[0].text

    const whatsappSection = text.split("**Whatsapp:**")[1].split("**Twitter:**")[0].trim();
    const messages = whatsappSection
      .split("\n")
      .filter((line) => line.trim().startsWith("1.") || line.trim().startsWith("2.") || line.trim().startsWith("3."))
      .map((line) => line.replace(/^\d\.\s*/, "").trim());

    // Split the text into lines
    // if (text) {
    //   // Use regex to extract content for each platform
    //   let whatsappMatch = text.match(/\*\*Whatsapp:\*\* (.*?)(?=\n)/);
    //   let twitterMatch = text.match(/\*\*Twitter:\*\* (.*?)(?=\n)/);
    //   let redditMatch = text.match(/\*\*Reddit:\*\* (.*?)(?=\n)/);

    //   whatsapp_hook = whatsappMatch ? whatsappMatch[1].trim() : "";
    //   twitter_hook = twitterMatch ? twitterMatch[1].trim() : "";
    //   reddit_hook = redditMatch ? redditMatch[1].trim() : "";
    // }

    // Database logic to store the hooks
    const result = await prisma.campaign.create({
        data: {
            businessId: id_b,
            whatsappString:messages[0],
            twitterString:messages[1],
            reditString:messages[2],
        }
    })

    res.json({result});
    // res.json({ msg: messages })

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


hookrouter.post('/sendWhatsappMsg', async (req, res) => {
  const { id_b } = req.body;

  console.log("Id is: ", id_b);

  const business = await prisma.business.findUnique({
    where: {
      id: id_b,
    },
  });

  if (!business) {
    return res.status(404).json({ error: "Business not found" });
  }

  const users = await prisma.campaignUser.findMany();

  // console.log(users);

  const messages = await prisma.campaign.findMany({
    where: {
      businessId: id_b,
    },
  });

  // console.log(messages);

  const message = [
    messages[0].whatsappString,
    messages[0].twitterString,
    messages[0].reditString
  ]
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const template = message[i];

    if (!user.phoneNumber || user.phoneNumber === '' || user.phoneNumber !== '7620663395') {
      continue;
    }

    console.log(user.phoneNumber);
    const result = await client.messages
      .create({
        from: 'whatsapp:+14155238886',
        body: template,
        to: `whatsapp:+91${user.phoneNumber}`
      })
      .then(message => console.log(message.sid))
      .catch(error => console.error(error));

      console.log(result);
  }


  res.json({
    msg: 'Whatsapp message sent successfully',
    data: users
  })
})


export default hookrouter;