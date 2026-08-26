package com.otr.etax.admin;

/** Mirrors the Angular `AdminSession` type — same fields as Admin minus the password. */
public record AdminSessionDto(
        Long id,
        String username,
        String fullName,
        String email,
        String phone,
        String role
) {
    public static AdminSessionDto from(Admin admin) {
        return new AdminSessionDto(
                admin.getId(),
                admin.getUsername(),
                admin.getFullName(),
                admin.getEmail(),
                admin.getPhone(),
                admin.getRole()
        );
    }
}
