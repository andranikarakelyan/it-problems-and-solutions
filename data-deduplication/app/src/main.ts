import { startServer } from "./server";

(async () => {
    try {
        await startServer();
    } catch (error) {
        console.error("Failed to start an application:", error);
        process.exit(1);
    }
})();