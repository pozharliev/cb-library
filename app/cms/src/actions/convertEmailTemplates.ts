import fs from "fs/promises";
import path from "path";
import mjml from "mjml";

async function convertMJMLFiles() {
	try {
		const files = await fs.readdir(path.join(__dirname, "../email/templates"));

		for (const file of files) {
			console.warn("Template: " + file);

			const filePath = path.join(__dirname, "../email/templates", file);
			const fileContent = await fs.readFile(filePath, "utf-8");

			const mjmlResult = mjml(fileContent);

			const hbs = path.join(__dirname, "../email/src/" + file.replace(".mjml", ".hbs"));
			await fs.writeFile(hbs, mjmlResult.html);
		}
	} catch (err) {
		console.error(err);
	}
}

convertMJMLFiles();