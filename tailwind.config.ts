import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      /* 글씨체 */
      fontFamily: {
        // 프리텐다드
        sans: ["var(--font-pretendard)"],
        // 둥근모
        display: ["var(--font-dunggeunmo)"],
        // 물마루
        display2: ["var(--font-mulmaru)"],
      },

      /* 글씨 크기 (UNIVERSE spec)
       * - size + line-height까지 함께 고정 (가독성/일관성 목적)
       * - text 크기 속성은 xs, sm, md, lg, xl, 2xl로 통일
       */
      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["14px", { lineHeight: "20px" }],
        md: ["16px", { lineHeight: "24px" }],
        lg: ["20px", { lineHeight: "28px" }],
        xl: ["24px", { lineHeight: "32px" }],
        "2xl": ["32px", { lineHeight: "40px" }],
      },

      /* 애니메이션 */
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },

      animation: {
        float: "float 3s ease-in-out infinite",
      },

      /**
       * Optional: If you want a consistent letter-spacing set,
       * you can add it later. (kept empty for now)
       */
    },
  },
  plugins: [],
} satisfies Config;

export default config;
