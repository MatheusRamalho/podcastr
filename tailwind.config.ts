import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'primary-300': '#9F75FF',
                'primary-400': '#9164FA',
                'primary-500': '#8257E5',
                'secondary-500': '#04D361',
            },
            backgroundImage: {
                'gradient-primary':
                    'linear-gradient(167.96deg, #9F75FF 0%, #8257E5 100%)',
            },
        },
    },
    plugins: [],
}
export default config
