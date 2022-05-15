<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel Simple Todo</title>
        <meta name="csrf-token" content="{{ csrf_token() }}" charset="UTF-8">
    </head>
    <body>

        <div id="app" v-cloak></div>

        <script async type="text/javascript" src="js/app.js"></script>

    </body>
</html>
