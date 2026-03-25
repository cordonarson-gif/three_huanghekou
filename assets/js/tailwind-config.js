tailwind = {
  config: {
    darkMode: "class",
    theme: {
      extend: {
        colors: {
          brand: {
            50: "#f3fbf8",
            100: "#dff4eb",
            200: "#bfe9d7",
            300: "#89d5bc",
            400: "#57b89b",
            500: "#2f8f79",
            600: "#216f61",
            700: "#1e5950",
            800: "#1b4943",
            900: "#173b37",
          },
          sand: "#f4ecde",
          river: "#1f4f5f",
          glow: "#f2b84b",
        },
        fontFamily: {
          display: ["Sora", "Noto Sans SC", "sans-serif"],
          body: ["Plus Jakarta Sans", "Noto Sans SC", "sans-serif"],
        },
        boxShadow: {
          glass: "0 18px 60px rgba(15, 23, 42, 0.16)",
          card: "0 16px 48px rgba(10, 43, 51, 0.12)",
        },
        backgroundImage: {
          aurora:
            "radial-gradient(circle at top left, rgba(242,184,75,0.24), transparent 34%), radial-gradient(circle at top right, rgba(47,143,121,0.22), transparent 32%), linear-gradient(135deg, rgba(243,251,248,0.96), rgba(255,255,255,0.9))",
          nightfall:
            "radial-gradient(circle at top left, rgba(65, 140, 130, 0.24), transparent 32%), radial-gradient(circle at bottom right, rgba(242, 184, 75, 0.14), transparent 30%), linear-gradient(135deg, rgba(10,17,26,0.95), rgba(18,34,42,0.92))",
        },
      },
    },
  },
};
