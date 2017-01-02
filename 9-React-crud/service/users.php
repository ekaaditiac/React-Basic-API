<?php
ini_set('display_errors',true);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-type: application/json");

require 'siquery/src/siquery.php';
$db = new siquery();

if(isset($_POST['create'])){
    $new_user = [
        'username' => $_POST['username'],
        'email'    => $_POST['email']

    ];

    if($db->insert('users', $new_user)->execute()){
        // die(json_encode([
        //     'status' => 'success',
        //     'code'   => 200
        // ]));

        echo json_encode([
            'status' => 'success',
            'code'   => 200
        ]);
        exit;
    } else {
        die(json_encode([
            'status' => 'failed',
            'code'   => 300
        ]));
    }
} elseif (isset($_POST['delete'])) {

    if($db->delete('users')->where('id', $_POST['id'])->execute()){
        die(json_encode([
            'status' => 'success',
            'code'   => 200
        ]));
    } else {
        die(json_encode([
            'status' => 'failed',
            'code'   => 300
        ]));
    }

} elseif(isset($_POST['update'])){
    $user = [
        'username' => $_POST['username'],
        'email'    => $_POST['email']
    ];

    $id = (int) $_POST['update'];

    if($db->update('users', $user)->where('id', $id)->execute()){
        echo json_encode([
            'status' => 'success',
            'code'   => 200
        ]);
        exit;
    } else {
        die(json_encode([
            'status' => 'failed',
            'code'   => 300
        ]));
    }
}

$users = $db->from('users')
        ->orderBy('id DESC')
        ->get();

// $result = array(
//   'users' => $users
// );
die(json_encode($users));
