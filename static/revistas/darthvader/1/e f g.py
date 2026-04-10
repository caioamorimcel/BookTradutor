import json
from deep_translator import GoogleTranslator
import os

quantidade_de_paginas = 35

pasta = os.path.dirname(os.path.abspath(__file__))

for contador in range(quantidade_de_paginas):
	
	## TRADUÇÃO
	pagina = str(contador+1)

	INPUT_JSON = os.path.join(pasta, pagina + "mouse.json")
	OUTPUT_JSON = os.path.join(pasta, pagina + "traducao.json")

	# Função de tradução
	def traduzir(texto):
		try:
			return GoogleTranslator(source='en', target='pt').translate(texto)
		except Exception as e:
			print(f"Erro ao traduzir '{texto}': {e}")
			return ""

	with open(INPUT_JSON, "r", encoding="utf-8") as f:
		dados = json.load(f)

	for item in dados:
		texto_en = item.get("en", "").strip()
		if texto_en:
			item["ptbr"] = traduzir(texto_en)
			item["ptbrpp"] = traduzir(texto_en)

	with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
		json.dump(dados, f, indent=4, ensure_ascii=False)

	print(f"✅ PAGINA {pagina} TRADUZIDA.")

	## SPLIT

	INPUT_JSON = os.path.join(pasta, pagina + "traducao.json")
	OUTPUT_JSON = os.path.join(pasta, pagina + "split.json")

	with open(INPUT_JSON, "r", encoding="utf-8") as f:
		dados = json.load(f)

	def split_strings(obj):
		novo_obj = {}
		for chave, valor in obj.items():
			if isinstance(valor, str):
				novo_obj[chave] = valor.split(" ")
			else:
				novo_obj[chave] = valor
		return novo_obj

	dados_split = [split_strings(item) for item in dados]

	with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
		json.dump(dados_split, f, indent=4, ensure_ascii=False)

	print(f"✅ PÁGINA {pagina} DIVIDIDA.")

	##PP

	arquivo_entrada = os.path.join(pasta, pagina + "split.json")  # seu arquivo original
	arquivo_saida = os.path.join(pasta, pagina + ".json")  # novo arquivo

	translator = GoogleTranslator(source="en", target="pt")

	def traduzir_lista(lista_en):
		resultado = []

		for palavra in lista_en:
			try:
				traducao = translator.translate(palavra)
				resultado.append(traducao.upper())
			except Exception as e:
				print(f"Erro ao traduzir '{palavra}': {e}")
				resultado.append(palavra)

		return resultado


	with open(arquivo_entrada, "r", encoding="utf-8") as f:
		dados = json.load(f)

	for item in dados:
		if isinstance(item.get("en"), list):
			item["ptbrpp"] = traduzir_lista(item["en"])

	with open(arquivo_saida, "w", encoding="utf-8") as f:
		json.dump(dados, f, indent=4, ensure_ascii=False)

	print(f"✅ PÁGINA {pagina} TRADUÇÃO PP CONCLUÍDA.")

print(f"FIM!")