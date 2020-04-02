<?php
require('./src/utils/debug.php');
require('./src/models/Character.php');

header('Content-Type: application/json;charset=utf-8');

$req_method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['PATH_INFO'];

// if($path === '/api/v1/hero' && $req_method === 'GET') {
//   $hero = new Character('Jean-Michel', 100);
//   $response = array('info' => $hero->infos());
//   echo json_encode($response);

// } else 
if ($path === '/api/v1/create/hero' && $req_method === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $hero = new Character($data['name'], $data['hp']);
  $response = array('info' => $hero->infos());

  echo json_encode($response);
}
