// Mapa de cores para cada tipo de Pokémon
const typeColors = {
    'Normal': '#A8A77A', 'Fire': '#EE8130', 'Water': '#6390F0', 'Electric': '#F7D02C',
    'Grass': '#7AC74C', 'Ice': '#96D9D6', 'Fighting': '#C22E28', 'Poison': '#A33EA1',
    'Ground': '#E2BF65', 'Flying': 'linear-gradient(180deg, #A98FF3 50%, #A98FF3 50%)', 'Psychic': '#F95587', 'Bug': '#A6B91A',
    'Rock': '#B6A136', 'Ghost': '#735797', 'Dragon': '#6F35FC', 'Dark': '#705746',
    'Steel': '#B7B7CE', 'Fairy': '#D685AD',
};

// Garante que tudo só rode depois que o DOM estiver 100% carregado.
$(document).ready(function() {

    // === PARTE 1: CONFIGURA A TABELA ===
    // Ativa o DataTable para deixar a tabela interativa (busca, ordenação, paginação).
    const pokemonTable = $('#pokemonTable').DataTable({
        "pageLength": 10, // Mostra 10 registros por página, como foi pedido.
        "responsive": true, // Deixa a tabela adaptável em telas menores
        // Tradução do DataTable manualmente para português 
    "language": {
        "sEmptyTable": "Sua lista está vazia. Adicione seu primeiro Pokémon clicando no botão '+ Adicionar Pokémon'.",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ pokémons",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 pokémons",
        "sInfoFiltered": "(Filtrados de _MAX_ pokémons no total)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "Mostrar _MENU_ pokémons por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro correspondente encontrado",
        "sSearch": "Pesquisar:",
        "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
        },
        "oAria": {
            "sSortAscending": ": Ordenar colunas de forma ascendente",
            "sSortDescending": ": Ordenar colunas de forma descendente"
        }

        
    }
    
});

    // === PARTE 2: ADICIONAR E REMOVER INPUTS NO MODAL ===

    // Adiciona um novo campo de input quando clica no botão.
    $('#addNewIdLine').on('click', function() {
        const newInput = `
            <div class="input-group mb-2">
                <input type="text" class="form-control" name="pokemon_ids[]" placeholder="Código" required>
                <button class="btn btn-outline-danger remove-line" type="button">X</button>
            </div>
        `;
        $('#pokemon-id-inputs').append(newInput);
    });

    // Quando o modal abre, coloca o foco no primeiro input
    $('#addPokemonModal').on('shown.bs.modal', function () {
        $('#pokemon-id-inputs input:first').trigger('focus');
    });

    // Remove um campo de input específico quando o botão "X" é clicado.
    // Usa delegação porque os botões são criados depois que a página carrega.
    $('#pokemon-id-inputs').on('click', '.remove-line', function() {
        $(this).closest('.input-group').remove();
    });


    // === PARTE 3: ENVIA O FORMULÁRIO VIA AJAX ===

    // Intercepta o submit do formulário.
    $('#pokemonForm').on('submit', function(e) {
        e.preventDefault(); // Evita recarregar a página.

        // Pega todos os dados do formulário prontos para enviar.
        const formData = $(this).serialize();

        $.ajax({
            url: 'api/processa_pokemon.php', // Endpoint PHP.
            type: 'POST',           
            data: formData,         
            dataType: 'json',  
            
            // Antes de enviar a requisição
            beforeSend: function() {
                // Pega o botão de salvar pelo ID.
                const saveButton = $('#savePokemonBtn');
                // Desativa o botão pra evitar cliques repetidos.
                saveButton.prop('disabled', true);
                // Troca o texto "Salvar" pelo spinner do Bootstrap
                saveButton.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Carregando...');
            },

            // Quando a requisição termina (sucesso ou erro)
            complete: function() {
                // Pega o botão de novo.
                const saveButton = $('#savePokemonBtn');
                // Reativa o botão.
                saveButton.prop('disabled', false);
                // Volta o texto original.
                saveButton.html('Salvar');
            },

            // Se tudo der certo:
            success: function(response) {
                if (response.length > 0) {
                    response.forEach(pokemon => {
                        
                        // Monta os badges de tipo com cor
                        const badgesHtml = pokemon.types.map(type => {
                            const color = typeColors[type] || '#777'; // Usa a cor cinza se não existir
                            return `<span class="badge" style="background: ${color}; color: white; margin: 2px;">${type}</span>`;
                        }).join('');

                        // Adiciona nova linha na tabela com os dados do Pokémon
                        pokemonTable.row.add([
                            pokemon.id,
                            pokemon.name,
                            badgesHtml, // <- Inserindo os badges aqui
                            `<img src="${pokemon.image}" alt="${pokemon.name}" width="50">`,
                            `<button class="btn btn-danger btn-sm delete-row"><i class="bi bi-trash-fill"></i></button>`
                        ]).draw(false);
                    });
                }

                else {
                    alert('Nenhum Pokémon encontrado. Verifique se os IDs ou nomes inseridos são válidos.');
                }

                // Limpa e fecha o formulário depois de adicionar.
                $('#addPokemonModal').modal('hide');
                $('#pokemonForm')[0].reset(); 
                $('#pokemon-id-inputs').html('<div class="mb-2"><input type="text" class="form-control" name="pokemon_ids[]" placeholder="Código" required></div>');
            },

            // Se der erro na requisição.
            error: function(xhr, status, error) {
                alert("Erro ao buscar os Pokémons. Confira os códigos e sua conexão.");
                console.error("Detalhes do Erro:", status, error);
            }
        });
    });

    // === PARTE 4: EXCLUIR LINHAS DA TABELA ===

    // Remove uma linha específica quando clica no botão "Excluir".
    $('#pokemonTable tbody').on('click', '.delete-row', function() {
        pokemonTable.row($(this).parents('tr')).remove().draw();
    });
});