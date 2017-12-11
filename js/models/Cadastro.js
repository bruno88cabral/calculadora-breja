class Cadastro{

	constructor(nome, tamanho, valor){

		this._nome = nome;
		this._tamanho = parseInt(tamanho, 10);
		this._valor = valor.replace(',','.')
		Object.freeze(this);
	}
	
	get calculaMl(){

	 	return this._valor / this._tamanho;
	}

	get nome(){

	 	return this._nome;
	}

	get tamanho(){

	 	return this._tamanho;
	}

	get valor(){

	 	return this._valor;
	}
}