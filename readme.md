# Base Fastify TS @perdiatmaja

## **Introduction**

This is a node js framework that based on Fastify. Simplify the use of fastify using decorator, it similar with JAVA Spring boot.



## **Installation:**

To install any pre requirements please use below command:

```bash
npm install
npm i -g typescript@latest
npm i -g ts-node
```

## **TS Configuration:**

Please use below TS configuration:

```json
{
  "compilerOptions": {
    "target": "es2019",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "resolveJsonModule": true
  }
}
```

## **Env Configuration:**

To start the app yo must define the env, for local please name it .env.local, or prod .env.prod, or if you can use .env for all environment. These are the list of propreties you can register:

```env
COOKIE_NAME=""
IP_BIND=""
PORT=""
DB_NAME="example"
DB_USERNAME="root"
DB_PASSWORD="root"
DB_DIALECT="mysql"
DB_HOST="localhost"
DB_PORT="3306"
DB_LOG=true
ASSETS_PATH=""
ROUTER_PATH="/routers/"
```

## **How to Use:**

Start the application

```typescript
import "reflect-metadata"
import dotenv from 'dotenv';
import { SpringifyApp } from "springify.ts";

const env = `.env${process.argv.length > 2 ? ".".concat(process.argv[2]) : ""}`
dotenv.config({ path: `${process.env.PWD}/${env}` })

SpringifyApp.start()
```

Create new Router:

```typescript
import { GET, POST, PathMapping, SpringifyRouter, Transactional } from "springify.ts";
import { injectable } from "tsyringe";

@injectable()
@PathMapping("/v1/test")
class TestRouter extends SpringifyRouter {
    @GET("/")
    public async test(): Promise<any> {
        return "Test"
    }

    @POST("/")
    @Transactional()
    public async testPost(): Promise<any> {
        return "Test"
    }
}

export default TestRouter
```