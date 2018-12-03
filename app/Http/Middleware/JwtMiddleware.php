<?php

namespace App\Http\Middleware;
use JWTAuth;
use Exception;

use Closure;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {   //return response()->json(['data'=>['request'=>$request->token]], 201);
        try{
            if (! $user = JWTAuth::parseToken()->toUser()) 
            return response()->json(['error' => ['message' => 'user not found']], 404);
        
        }
        catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json(['error' => ['message' => 'Token is Invalid']], 401);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json(['error' => ['message' => 'Token is Expired']], 401);
            }else{
                return response()->json(['error' => ['message' => 'Authorization Token not found']], 401);
            }
        }
        return $next($request);
        
    }
}
