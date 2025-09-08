const { PrismaClient } = require("@prisma/client");

// Create a single Prisma instance for the application
const prisma = new PrismaClient({
	log: [
		{
			emit: "event",
			level: "query",
		},
		{
			emit: "event",
			level: "error",
		},
	],
});

if (process.env.NODE_ENV !== "production") {
	prisma.$on("query", (e) => {
		console.log("Prisma Query:", e.query, e.params);
	});

	prisma.$on("error", (e) => {
		console.error("Prisma Error:", e);
	});
}

// Graceful shutdown
async function disconnect() {
	await prisma.$disconnect();
}

module.exports = {
	prisma,
	disconnect,
};