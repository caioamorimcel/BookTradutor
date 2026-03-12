import { query } from '$app/server';
import { type typeDados, schemaDados } from '$lib/types/typeDados';
import { error } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import * as v from 'valibot';

const schema = v.object({
	saga: v.string(),
});

export const funcaoCarregarDadosDaSaga = query(schema, async ({ saga }): Promise<typeDados> => {
	const basePath = path.resolve(`static/revistas/${saga}`);
	//const pastas = fs.readdirSync(basePath);

	const arquivo = path.join(basePath, '0 - dados.json');

	if (!fs.existsSync(arquivo)) {
		error(404, 'DADOS DA SAGA NÃO ENCONTRADOS!');
	}

	const conteudo = fs.readFileSync(arquivo, 'utf-8');
	const json = JSON.parse(conteudo);
	const resultado: typeDados = json;

	const dadosValidados = v.safeParse(schemaDados, resultado);
	if (dadosValidados.success === false) {
		error(404, 'ALGUM DADO DA REVISTA NÃO ESTÁ RESPEITANDO A TIPAGEM CORRETA!');
	}

	return dadosValidados.output;
});
