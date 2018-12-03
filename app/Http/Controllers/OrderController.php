<?php

namespace App\Http\Controllers;
use App\Order;
use App\Ingredient;
use JWTAuth;
use Validator;
use Illuminate\Validation\Rule;

use Illuminate\Http\Request;

class OrderController extends Controller
{   
    public function index() {
        if($authuser = JWTAuth::parsetoken()->toUser())
            return response()->json(['data'=>  $authuser->orders()->with('ingredients')->get()]);
        else 
            return response()->json(['error'=> ['message'=>'user failed to authenticate']], 401);
    }

    public function store(Request $request) { 
    
    	$ingredients = Ingredient::select('id', 'unitPrice')->get();
    	$ingredientIds = $ingredients->pluck('id');    	

    	$validation = Validator::make($request->all(), [
    		'street' => 'required|string',
    		'zipCode' => 'required|string',
    		'country' => 'required|string',
    		'deliveryMethod' => 'required|string',
    		'quantity' => 'present|nullable|integer',

    		'ingIds' => 'required|array|max:'.$ingredients->count(),
    		'ingIds.*' => [
                'required','integer',
                Rule::in($ingredientIds->toArray()),
            ],
    		'ingQtys' => 'required|array|max:'.$ingredients->count(),   		
    		'ingQtys.*' => 'required_with:ingIds.*|integer|min:0|max:10'
    	]);

         
    	if($validation->fails())
    		return response()->json(['error'=> ['message'=>'validation errors', 'errors' => $validation->errors()], 401]);
		else if(!array_sum($request->ingQtys))
			return response()->json(['error'=> ['message'=>'no ingredients selected']], 401);


		$pluckedIngs =  $ingredients->pluck('unitPrice', 'id');

		//4 dollar is the base price without any ingredients selected
		$burgerPrice = 4;

    	for($j = 0; $j<count($request->ingIds); $j++){
    		$burgerPrice += $pluckedIngs[$request->ingIds[$j]] * $request->ingQtys[$j];
    	} 
    		

    	$newOrder = new Order([
    		'street' => $request->street , 
			'zipCode' => $request->zipCode, 
			'country' => $request->country , 
			'deliveryMethod' => $request->deliveryMethod , 
			'quantity' => $request->quantity , 
			'totalPrice' => ($request->quantity * $burgerPrice)
    	]);


    	for($i=0; $i < count($request->ingIds); $i++)
    		$pivotQtys[$i] = ['quantity' => $request->ingQtys[$i]];

    		

    	$ingIds = $request->ingIds;
        $authUser = JWTAuth::parsetoken()->toUser();
        $data = array_combine($ingIds, $pivotQtys);

    	if($authUser->orders()->save($newOrder))
    	{
    		if($newOrder->ingredients()->sync($data, false))
    			return response()->json(['data' => [
				'orderId'=> $newOrder->id
			    ]], 201);
    	}
        
    }
}
