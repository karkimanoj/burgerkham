<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{	
	protected $fillable =['street', 'zipCode', 'country', 'deliveryMethod', 'quantity','totalPrice'] ;

    public function user() {
    	return $this->belongsTo('App\User');
    }

    public function ingredients() {
    	return $this->belongsToMany('App\Ingredient')->withPivot('quantity');
    }
}
