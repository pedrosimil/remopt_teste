<?php
/**
 * Endpoint para buscar dados de Pokémons usando a PokeAPI
 * Recebe uma lista de IDs via POST e devolve um JSON com dados formatados
 */

// Força a resposta a ser sempre JSON
header('Content-Type: application/json');

// Verifica se veio uma requisição POST com os IDs dos Pokémons
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['pokemon_ids'])) {
    
    $pokemon_ids = $_POST['pokemon_ids'];
    $pokemons_data = []; // Vai guardar os dados de todos os Pokémons válidos

    // Passa por cada ID recebido.
    foreach ($pokemon_ids as $id) {
        
        // Limpa espaços extras e deixa tudo minúsculo
        $clean_id = strtolower(trim($id));

        // Se o ID estiver vazio depois de limpar, ignora e vai pro próximo
        if (empty($clean_id)) {
            continue; 
        }

        // Monta a URL da API com o ID
        $api_url = "https://pokeapi.co/api/v2/pokemon/" . $clean_id;

        // Faz a requisição. O '@' evita warning se o Pokémon não existir
        $response = @file_get_contents($api_url);

        // Se não deu certo (ex: ID inválido), ignora esse ID
        if ($response === FALSE) {
            continue;
        }

        // Transforma a resposta em objeto.
        $data = json_decode($response);

        // Pega todos os tipos do Pokémon (ex: Grass, Poison).
        $types = [];
        foreach ($data->types as $type_info) {
            $types[] = ucfirst($type_info->type->name);
        }

        // Guarda só os dados que importam pro frontend.
        $pokemons_data[] = [
            'id'    => $data->id,
            'name'  => ucfirst($data->name), 
            'types' => $types,
            'image' => $data->sprites->front_default 
        ];
    }

    // Retorna tudo em JSON.
    echo json_encode($pokemons_data);

} else {
    // Se não for POST ou não tiver IDs, manda erro 400.
    http_response_code(400);
    echo json_encode(['error' => 'Requisição inválida.']);
}
?>