import { render as litServerSideRender } from "@lit-labs/ssr";
import { html } from "lit";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";
import { createServer } from "./ssr-boilerplate.js";
import "./src/app-router.js";

createServer(
    "app-router",
    3000,
    async (url) => {
        const renderedHtml = await collectResult(
            litServerSideRender(
                html`<app-router .url=${url}></app-router>`
            ),
        );
        console.log(renderedHtml);

        return renderedHtml;
    },
    new Map([
        ["sitemap.xml", async () => {
            return "";
        }],
    ]),
    async (path) => {
        // Get meta data from graphql by path
        return "";
    },
);
