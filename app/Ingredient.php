<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    public function orders() {
    	return $this->belongsToMany('App\Order')->withPivot('quantity');
    }
}
