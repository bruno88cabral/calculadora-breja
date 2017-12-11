class Lista{
	
	constructor(){

		this._lista = [];
	}

	adiciona(valor){
		
		this._lista.push(valor)
	}

	removeItem(index){		
		this._lista.splice(index, 1);
	}

	get lista(){
		return [].concat(this._lista);
	}

	get menorValor(){
		return Math.min.apply(null, this.lista);
	}

	get posicao(){
		return this.lista.indexOf(this.menorValor)+1;
	}
}