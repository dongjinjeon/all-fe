/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        alco: {
          mint: "#3FC1BE",
          blue: "#2E4369",
          yellow: "#F2C94C",
          gray: {
            100: "#E3E3E3",
            200: "#EFEFEF",
            300: "#8E8E8E",
            400: "#757575",
            500: "#D0D0D0",
          },
          gold: "#EAB021",
          skyblue: "#EBFBFA",
          "skyblue-100": "#CDF4F3",
          // Add more custom colors here
          genre: {
            romance: "#F18470",
            drama: "#3FC1BE",
            fantasy: "#B545EA",
            bl: "#2657B7",
            action: "#54B726",
            romancefantasy: "#EAB021",
          },
        },
      },
      width: {
        "alco-md": "1200px",
      },
      fontFamily: {
        notokr: ["Noto Sans KR", "sans-serif"],
        nanumbarun: ["NanumBarunGothic"],
        worldbatang: ["KoPubWorldBatang"],
        nanumbarunpen: ["NanumBarunpen"],
        cafe24: ["Cafe24SsurroundAir"],
        gyeonggi: ["GyeonggiBatang"],
        uhbee: ["UhBeeMiMi"],
        spoqa: ["SpoqaHanSansNeo-Regular"],
      },
      screens: {
        'max-mobileM': {'max': '375px'},
        'max-sm': {'max': '640px'},
        'max-md': {'max': '767px'},
        'max-lg': {'max': '1024px'},
        'max-header': {'max': '1240px'},
      },
    },
  },
  plugins: [],
};
