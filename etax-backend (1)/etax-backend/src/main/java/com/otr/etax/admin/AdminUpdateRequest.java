package com.otr.etax.admin;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AdminUpdateRequest(
        @NotBlank String fullName,
        @NotBlank @Email String email,
        String phone
) {
}
