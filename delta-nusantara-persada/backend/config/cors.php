<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        env('FRONTEND_URL', 'http://localhost:3000'),
        'https://deltanusa.co.id',
        'https://www.deltanusa.co.id',
        'http://deltanusa.co.id',
        'http://www.deltanusa.co.id',
    ],

    'allowed_origins_patterns' => [
        '#^https?://([a-z0-9-]+\.)?deltanusa\.co\.id$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
