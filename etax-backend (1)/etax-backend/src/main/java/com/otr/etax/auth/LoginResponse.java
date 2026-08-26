package com.otr.etax.auth;

import com.otr.etax.admin.AdminSessionDto;

public record LoginResponse(String token, AdminSessionDto admin) {
}
