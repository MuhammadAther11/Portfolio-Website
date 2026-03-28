import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Gemini AI Chat
  app.post("/api/chat", async (req, res) => {
    const { message, history, systemPrompt } = req.body;

    console.log("Chat request received:", { message, historyLength: history?.length });

    if (!process.env.GEMINI_API_KEY) {
      console.error("Gemini API key missing");
      return res.status(500).json({ error: "AI service unavailable - missing API key" });
    }

    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Build conversation for Gemini
      let conversationHistory = "";
      if (history && history.length > 0) {
        conversationHistory = history.map((m: { role: string; text: string }) => {
          return `${m.role === 'bot' ? 'Assistant' : 'User'}: ${m.text}`;
        }).join('\n');
      }

      const fullPrompt = `${systemPrompt}

${conversationHistory ? conversationHistory + '\n' : ''}User: ${message}

Assistant:`;

      console.log("Sending to Gemini API...");
      
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const botResponse = response.text();

      console.log("Gemini response received");
      
      res.json({ response: botResponse || "I received your message but couldn't generate a response." });
    } catch (error: any) {
      console.error("AI chat error details:", error.message);
      res.status(500).json({ error: `Failed to get AI response: ${error.message}` });
    }
  });

  // API Route for sending emails
  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Email credentials missing in environment variables.");
      return res.status(500).json({ error: "Server email configuration missing." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "atharemail786@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
