<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\User;
use JWTAuth;
use JWTAuthException;
use Validator;

class AuthController extends Controller
{
	private function getTokenAfterAuthentication($credientials) 
	{
		//attempt
		$token = null ;
		try {
			if(!$token = JWTAuth::attempt($credientials))
				return response()->json(['error' => ['message' => 'invalid username or password']], 401);
		} catch (JWTAuthException $e) {
			return response()->json(['error' => ['message' => 'could not create token']], 500);
		}
		//if succesful return token else return response with error
		return $token;
	}

	public function login (Request $request) 
	{

		$credientials = $request->only('email', 'password');
		
		
		//return response()->json(['email' => $us->email]);
		$user = User::where('email', $request->email)->first();

		if($user && Hash::check($request->password, $user->password))
		{
			$auth_token = self::getTokenAfterAuthentication($credientials);

			return response()->json(['data' => [
				'localId' => $user->id, 'email' => $user->email, 'idToken' => $auth_token
			]], 200);
		} 
		else 
			return response()->json(['error' => ['message' => 'invalid username or password']], 401);

	}

	public function register (Request $request ) 
	{

		$validator = Validator::make($request->all(), [
			'name' => 'required|string|max:255',
			'email' => 'required|string|email|unique:users,email',
			'password' => 'required|string|min:6'
		]);

		if($validator->fails()) 
		{
			return response()->json(['error' => [
				'message' => 'validation error', ['errors' => $validator->errors()]
			], 401]);
		}

		$newUser = new User([
			'name' => $request->name,
			'email' => $request->email,
			'password' => Hash::make($request->password)
		]);

		if($newUser->save()) 
		{
			$auth_token = self::getTokenAfterAuthentication($request->only('email', 'password'));

			return response()->json(['data' => [
				'localId' => $newUser->id, 'email' => $newUser->email, 'idToken' => $auth_token
			]], 201);
		} else
		return response()->json(['error' => ['message' => 'user could not be created']], 500);
	}

	

}
