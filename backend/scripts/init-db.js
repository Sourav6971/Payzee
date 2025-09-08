const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
	console.log("Database initialized successfully!");
	console.log("Run `npx prisma migrate dev` to apply migrations");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
