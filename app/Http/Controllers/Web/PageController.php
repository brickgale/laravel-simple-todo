<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class PageController extends Controller
{
     /**
     * Home.
     */
    protected function home()
    {
        return view('app');
    }
}