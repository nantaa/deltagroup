<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CourseRegistration extends Model
{
    protected $fillable = [
        'course_id',
        'name',
        'email',
        'whatsapp_number',
        'company_name',
        'whatsapp_invite_link',
        'status',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function transaction(): HasOne
    {
        return $this->hasOne(Transaction::class, 'registration_id');
    }

    /**
     * Returns the registration-specific WhatsApp link,
     * falling back to the course-level default.
     */
    public function getWhatsappLinkAttribute(): ?string
    {
        return $this->whatsapp_invite_link ?? $this->course?->whatsapp_group_link;
    }
}
