import Koa from "koa";
import Router from "@koa/router";
import staticFiles from "koa-static";
import path from "path";
import fs from "fs";
import { nodeResolve } from "koa-node-resolve";

export async function createServer(
    mainComponentName: string,
    port: number,
    render: (url: string) => Promise<string>,
    routes: Map<string, () => Promise<string>>,
    meta: (url: string) => Promise<string>,
) {
    const app = new Koa();
    const router = new Router();

    let template = fs.readFileSync(path.resolve("./dist/client/index.html"), "utf-8");

    // Serve assets
    app.use(
        staticFiles(path.resolve("./dist/client"), {
            index: false,
        })
    );

    // Remove trailing slash
    router.all("/:url/", ctx => {
        ctx.redirect(`/${ctx.params.url}`);
        ctx.status = 301;
    });

    // Basic endpoint
    router.get("/:url?", async (ctx) => {
        if (routes.has(ctx.params.url)) {
            ctx.body = await routes.get(ctx.params.url)!();
        } else {
            ctx.type = "text/html";

            try {
                template = template
                    .replace(`<!--ssr-header-->`, await meta(ctx.params.url));

                const ssrHtml = await render(ctx.params.url);

                const html = template
                    .replace(`<${mainComponentName}></${mainComponentName}>`, ssrHtml);

                ctx.body = html;
            } catch (e) {
                console.error(e);
            }
        }
    });

    app.use(router.routes());
    app.use(nodeResolve());
    app.use(staticFiles("."));

    app.listen(port);

    console.log("SSR Server started...\n");
    console.log(`  Local: \x1b[36m http://localhost:${port} \x1b[0m`);
}
