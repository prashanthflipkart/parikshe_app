import { Router } from "express";

export const mediaRouter = Router();

mediaRouter.get("/token", (_req, res) => {
  res.json({
    status: "ok",
    token: "media_token_demo",
    expiresInSeconds: 900
  });
});

mediaRouter.get("/related", (_req, res) => {
  res.json({
    videos: [
      {
        id: "nMYMD0lrYpM",
        title: "SSLC 2026 | Parikshe intro",
        url: "https://www.youtube.com/watch?v=nMYMD0lrYpM",
        thumbnail: "https://img.youtube.com/vi/nMYMD0lrYpM/hqdefault.jpg"
      },
      {
        id: "4kwgnOBtcSo",
        title: "Alankara | ವ್ಯಾಕರಣ ಅಲಂಕಾರ",
        url: "https://www.youtube.com/watch?v=4kwgnOBtcSo",
        thumbnail: "https://img.youtube.com/vi/4kwgnOBtcSo/hqdefault.jpg"
      },
      {
        id: "F_Rm1m5rUT4",
        title: "SSLC Social Science chapters",
        url: "https://www.youtube.com/watch?v=F_Rm1m5rUT4",
        thumbnail: "https://img.youtube.com/vi/F_Rm1m5rUT4/hqdefault.jpg"
      }
    ]
  });
});
