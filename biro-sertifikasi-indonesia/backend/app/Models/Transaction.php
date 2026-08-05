<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    protected $fillable = [
        'registration_id',
        'invoice_number',
        'amount',
        'status',
        'xendit_invoice_id',
        'payment_url',
        'paid_at',
    ];

    protected $casts = [
        'amount'  => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    public function registration(): BelongsTo
    {
        return $this->belongsTo(CourseRegistration::class, 'registration_id');
    }
}
