import fs from 'fs';
import path from 'path';

export function funcaoTotalDePaginas(edicao: string): number {
	const pasta = path.join(process.cwd(), 'static', edicao);

	if (!fs.existsSync(pasta)) return 1;

	const arquivos = fs.readdirSync(pasta);

	const paginas = arquivos.filter((f) => /^\d+\.(jpg|jpeg|png|webp)$/.test(f));

	return paginas.length;
}
