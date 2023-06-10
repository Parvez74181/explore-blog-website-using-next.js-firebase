/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["drive.google.com"],
  },
  env: {
    JWT_SECRET:
      "YzNzQxNDQsImV4cCI6MTY4NjM3Nzc0NCwiZW1haWwiOiJtZHAwMjA0NzlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7YzNzQxNDQsImV4cCI6MTY4NjM3Nzc0NCwiZW1haWwiOiJtZHAwMjA0NzlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7",
    FIREBASE_API_KEY: "AIzaSyCNS4J-sgBRhMyVAKt41S8mvCEJ6VHbNIQ",
    FIREBASE_AUTH_DOMAIN: "blog-website-5004d.firebaseapp.com",
    FIREBASE_PROJECT_ID: "blog-website-5004d",
    FIREBASE_STORAGE_BUCKET: "blog-website-5004d.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "681447674849",
    FIREBASE_APP_ID: "1:681447674849:web:0ca3e3ba7c7660ff45f8a0",
    FIREBASE_MEASUREMENT_ID: "G-PS8RP4QDVM",
  },
};

module.exports = nextConfig;
