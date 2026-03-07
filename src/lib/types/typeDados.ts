import * as v from 'valibot';

export const schemaDados = v.object({
	titulo: v.string(),
	ano: v.optional(v.number()),
	edicao: v.optional(v.string()),
	capa: v.string(),
	rating: v.optional(v.number()),
	banner: v.optional(v.string()),
	pasta: v.string(),
	saga: v.optional(v.boolean())
});

export type typeDados = {
	titulo: string;
	ano?: number;
	edicao?: string;
	capa: string;
	rating?: number;
	banner?: string;
	pasta: string;
	saga?: boolean;
};
