import fs from 'fs';
import path from 'path';

export async function GET() {
	const basePath = path.resolve('static');
	const pastas = fs.readdirSync(basePath);

	const resultado = [];

	for (const pasta of pastas) {
		const arquivo = path.join(basePath, pasta, 'dados.json');

		if (fs.existsSync(arquivo)) {
			const conteudo = fs.readFileSync(arquivo, 'utf-8');
			resultado.push(JSON.parse(conteudo));
		}
	}

	return new Response(JSON.stringify(resultado), {
		headers: { 'Content-Type': 'application/json' }
	});
}
