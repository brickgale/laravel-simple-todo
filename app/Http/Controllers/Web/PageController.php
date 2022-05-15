<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\View\View;

class PageController extends Controller
{
     /**
     * Home.
     */
    protected function handler()
    {
        return view('app');
    }
}