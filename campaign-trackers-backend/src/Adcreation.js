import { Router } from "express";
import axios from "axios";

const Adcreationrouter = Router();

// Adcreationrouter.post("/gen_template", async (req, res) => {
//   const data = {
//     template: "4KnlWBbKv0GGDOQGgm",
//     modifications: [
//       {
//         name: "message",
//         text: "You can change this text",
//         color: null,
//         background: null,
//       },
//       {
//         name: "qr_code_5",
//         target: "https://www.bannerbear.com",
//       },
//       {
//         name: "text_container_6",
//         text: "You can change this text",
//         color: null,
//         background: null,
//       },
//       {
//         name: "rectangle_6",
//         color: null,
//       },
//     ],
//     webhook_url: null,
//     transparent: false,
//     metadata: null,
//   };

//   axios
//     .post("https://api.bannerbear.com/v2/templates", data, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.API_KEY_ADV}`, // Use the API key for authorization
//       },
//     })
//     .then((response) => {
//       console.log("Response:", response.data);
//       res.json(response.data);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//       res.json({ error: "Internal Server Error" });
//     });
// });

Adcreationrouter.post("/", async (req, res) => {
  const ads = [
    {
      backgroundImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEUlOnq4vcn36RNY2RceVfl9lVWXO7Ns8cA&s",
      titleText: "The Protein is here ... Muscle Blaze",
      qrCode: "https://www.bannerbear.com",
      description: "We are the best Scan the code to know more",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUEUlOnq4vcn36RNY2RceVfl9lVWXO7Ns8cA&s",
    },
    {
      backgroundImage:
        "https://blog.muscleblaze.com/wp-content/uploads/2023/04/B10.jpg",
      titleText: "Complete ur intake with Muscle Blaze",
      qrCode: "https://www.bannerbear.com",
      description: "Build physique with us , Scan the code for the discount",
      image_url:
        "https://blog.muscleblaze.com/wp-content/uploads/2023/04/B10.jpg",
    },
    {
      backgroundImage:
        "https://wallpapers.com/images/hd/gold-standard-whey-protein-powder-container-7l4mz2bz27jzwuqt.jpg",
      titleText: "Muscle Blaze for the best",
      qrCode: "https://www.bannerbear.com",
      description: "Get the best , Scan and win the prize",
      image_url:
        "https://wallpapers.com/images/hd/gold-standard-whey-protein-powder-container-7l4mz2bz27jzwuqt.jpg",
    },
  ];

  const results = [];

  for (const ad of ads) {
    const data = {
      template: "20KwqnDE62YQbl17dY", // Replace with your actual template ID
      modifications: [
        {
          name: "message",
          text: ad.titleText, // Dynamically set the title text
        },
        {
          name: "qr_code_5",
          target: ad.qrCode, // Dynamically set the QR code URL
        },
        {
          name: "text_container_6",
          text: ad.description, // Dynamically set the description
        },
        {
          name: "image_container_rectangle_4",
          image_url: ad.image_url,
        },
      ],
      webhook_url: null,
      transparent: false,
      metadata: null,
    };

    try {
      const response = await axios.post(
        "https://api.bannerbear.com/v2/images",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.API_KEY_ADV}`,
          },
        }
      );

      results.push(response.data); // Store the response for each ad
    } catch (error) {
      console.error(
        "Error creating ad:",
        error.response?.data || error.message
      );
      results.push({ error: "Failed to create ad" });
    }
  }

  // Send the results back to the client
  res.json({ results });
});

Adcreationrouter.get("/image/:uid", async (req, res) => {
  const { uid } = req.params;

  try {
    const response = await axios.get(
      `https://api.bannerbear.com/v2/images/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY_ADV}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" }); // Handle error
  }
});

export default Adcreationrouter;
