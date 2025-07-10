<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teste RemOpt - Pokémon - Pedro Simil</title>

    <link rel="icon" type="image/png" href="assets/img/favicon.png">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.13.7/css/dataTables.bootstrap5.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <nav class="navbar bg-light">
      <div class="container d-flex justify-content-center">
        <a class="navbar-brand" href="https://remopt.com.br/pt/home">
          <img 
            src="assets/img/remopt_logo_final.png" 
            alt="Logo da RemOpt" 
            width="100" 
            height="25"
          >
        </a>
      </div>
    </nav>

    <div class="container mt-4">

        <h1 class="mb-4">Lista de Pokémons</h1>

        <table id="pokemonTable" class="table table-striped table-bordered" style="width:100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Tipo</th>
                    <th>Foto</th>
                    <th class="text-center">
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addPokemonModal">
        <i class="bi bi-plus-circle-fill"></i>
        <span class="d-none d-md-inline"> Adicionar Pokémon</span>
    </button>
</th>
                </tr>
            </thead>
            <tbody>
                </tbody>
        </table>
    </div>

    <div class="modal fade" id="addPokemonModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Inserir código do Pokémon</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="pokemonForm">
                        <div id="pokemon-id-inputs">
                            <div class="mb-2">
                                <input type="text" class="form-control" name="pokemon_ids[]" placeholder="Código" required>
                            </div>
                        </div>
                        <button type="button" id="addNewIdLine" class="btn btn-secondary btn-sm mt-2">Adicionar nova linha</button>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="submit" id="savePokemonBtn" class="btn btn-primary" form="pokemonForm">Salvar</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.7/js/dataTables.bootstrap5.min.js"></script>
    <link rel="stylesheet" href="assets/css/style.css">
    
    <script src="assets/js/main.js"></script>
</body>
</html>