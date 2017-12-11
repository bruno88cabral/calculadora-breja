class View{

	constructor(elemento){
		this._elemento = elemento;
	}

	_template(model){
		return `<table class="table">
	        <thead>
	            <tr>
	                <th>Nome</th>
	                <th>Tamanho</th>
	                <th>Valor</th>
	                <th>Remove</th>
	            </tr>
	        </thead>
	        <tbody>
	        	${model.lista.map(n => `
								<tr>
									<td>${n.nome}</td>
									<td class="tamanho">${n.tamanho} ml</td>
									<td class="valor">R$ ${n.valor.replace('.',',')}</td>
									<td><i class="fa fa-trash fa-lg" aria-hidden="true" onclick="calculaController.removeLinha(this)"></i></td>
								</tr>
							`).join('')
				}
	        </tbody>
    	</table>`;
	}

	update(model){
		this._elemento.innerHTML = this._template(model);
	}
}
