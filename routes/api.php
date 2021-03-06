<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

//Route::group(function (){
	Route::get('/ingredients', 'IngredientController@index');
	Route::post('/login', 'AuthController@login');
	Route::post('/register', 'AuthController@register');
	
//});
	
Route::middleware('auth-jwt')->group(function() {
	
	Route::get('/order', 'OrderController@index');
	Route::post('/order', 'OrderController@store');

	Route::get('/test', function(Request $request) {
		return response()->json(['data'=>'test']);
	});
	
});





