sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("projetonetflix.controller.Inicio", {
            onInit: function () {
                // Definição de lista vazia de resultados
                let resultados = {
                    titles: []
                }
                // Definição de modelo - variável especial para mostrar dados na tela
                let resultadosModel = new JSONModel
                // Atribuição de dados 
                resultadosModel.setData(resultados);
                // Anexar modelo na tela
                let tela = this.getView();
                tela.setModel(resultadosModel, "APINetflix");
            },
            onIncioLinkPress: function () {
                alert("Navegar para a tela inicial");
            },

            onSearchFieldSearch: function () {
                // Buscar de dados na api Netflix
                let searchField = this.byId("idSearchField");
                let filtro = searchField.getValue();

                console.log(filtro);

                const settings = {
                    async: true,
                    crossDomain: true,
                    url: 'https://netflix54.p.rapidapi.com/search/?query='
                    + filtro +' &offset=0&limit_titles=50&limit_suggestions=20&lang=en',
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'd5d33ec7ffmsh3b64c0cc94a9baep1ad748jsndba126fbd04b',
                        'x-rapidapi-host': 'netflix54.p.rapidapi.com'
                    }
                };
                
                $.ajax(settings).done(function (response) {
                    console.log(response);
                    // RESGATAR O MODELO E ATUALIZAR OS DADOS
                    let tela = this.getView()
                    let modelo = tela.getModel("APINetflix")
                    let dados = modelo.getData()

                    // Limpar a lista
                    dados.titles = []
                    dados.titles = response.titles
                    modelo.refresh()

                }.bind(this));
            }
        });
    });
