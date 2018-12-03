<?php

namespace App\Http\Controllers;
use App\Ingredient;
use Illuminate\Http\Request;

class IngredientController extends Controller
{
    public function index(){
    	$ingredients = Ingredient::select('id', 'name', 'unitPrice', 'quantity', 'max_quantity')->get();
    	return response()->json(['data'=> $ingredients]);
    }
}
