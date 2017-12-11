class CalculaController{

	constructor(){

		let $ = document.querySelector.bind(document);
		Element.prototype.remove = function() {
    		this.parentElement.removeChild(this);
		}
		this._inputNome = $('#nome');
		this._inputTamanho = $('#tamanho');
		this._inputValor = $('#valor');

		this._listaMenor = new Lista();
		this._listaCervejas = new Lista();

		this._cervejasView = new View($('#listaCervejas'));
		this._cervejasView.update(this._listaCervejas);
	}

	adiciona(event){

		event.preventDefault();

		this._listaMenor.adiciona(this._cerveja().calculaMl);
		this._listaCervejas.adiciona(this._cerveja());
		this._cervejasView.update(this._listaCervejas);		
		this.exibeMenor();
		this.limpaFormulario();
	}

	_cerveja(){

		return new Cadastro(
			this._inputNome.value,
			this._inputTamanho.value,
			this._inputValor.value
			);
	}

	exibeMenor(){
		if(this._listaMenor.posicao == 1){
			return false;
		}
		else
		$('tbody').find('tr:nth-child(' + this._listaMenor.posicao + ')').addClass('menor');
	}

	limpaFormulario(){

		this._inputNome.value = '';
		this._inputTamanho.value = '';
		this._inputValor.value = '';
		$('#nome').focus();		
	}

	removeLinha(element){

		const trash = element.closest('tr');
		const index = [...trash.parentNode.children].indexOf(trash);
		trash.parentNode.removeChild(trash);
		this._listaCervejas.removeItem(index);
  	}
}