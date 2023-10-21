import * as dotenv from "dotenv";
dotenv.config()

export const config = {
    PORT: process.env.PORT_USER,
    ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET_KEY|| '123',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_JWT_SECRET_KEY || '543',
    EMAIL: process.env.AUTH_EMAIL,
    PASS: process.env.AUTH_PASS,
    REMOTE_DB: ['postgres://Elvinovsky:nXHKtfSpU1g3@ep-hidden-wood-23954592.us-east-2.aws.neon.tech/neondb',{dialectOptions: {
    ssl: {
        require: true, // Включение SSL
            rejectUnauthorized: false // Временное решение для самоподписанных сертификатов
    }}}
]
}