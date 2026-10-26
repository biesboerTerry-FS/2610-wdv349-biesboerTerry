/**
 * Static SPA server for the built frontend, used only for slideshow captures.
 *
 * Run: node showcase/tools/serve-dist.mjs
 * Port: 5173
 */
import http from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";

const ROOT = resolve("dev/portfolio/dist");
const PORT = Number(process.env.STATIC_PORT || 5173);

const TYPES = {
	".html": "text/html; charset=utf-8",
	".js": "text/javascript; charset=utf-8",
	".css": "text/css; charset=utf-8",
	".json": "application/json; charset=utf-8",
	".png": "image/png",
	".jpg": "image/jpeg",
	".jpeg": "image/jpeg",
	".svg": "image/svg+xml",
	".ico": "image/x-icon",
	".pdf": "application/pdf",
	".webp": "image/webp",
};

const server = http.createServer((req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	let pathname = decodeURIComponent(url.pathname);

	if (pathname === "/") pathname = "/index.html";

	let filePath = normalize(join(ROOT, pathname));
	if (!filePath.startsWith(ROOT)) {
		res.writeHead(403);
		res.end("Forbidden");
		return;
	}

	// SPA fallback for client-side routes.
	if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
		filePath = join(ROOT, "index.html");
	}

	res.writeHead(200, {
		"Content-Type": TYPES[extname(filePath).toLowerCase()] || "application/octet-stream",
		"Cache-Control": "no-store",
	});
	createReadStream(filePath).pipe(res);
});

server.listen(PORT, "127.0.0.1", () => {
	console.log(`[showcase static] http://127.0.0.1:${PORT} (${ROOT})`);
});
