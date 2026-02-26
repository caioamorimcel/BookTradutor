export function funcao(inicial = 0) {
	const estado = $state({ value: inicial });

	function aumentar() {
		estado.value += 1;
	}

	function diminuir() {
		estado.value -= 1;
	}

	return {
		get value() {
			return estado.value;
		},
		set value(v: number) {
			estado.value = v;
		},
		aumentar,
		diminuir
	};
}
