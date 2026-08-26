package com.otr.etax.auth;

import com.otr.etax.admin.Admin;
import com.otr.etax.admin.AdminRepository;
import com.otr.etax.admin.AdminSessionDto;
import com.otr.etax.admin.AdminUpdateRequest;
import com.otr.etax.common.BadCredentialsExceptionWrapper;
import com.otr.etax.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AdminRepository adminRepository;
    private final JwtService jwtService;

    public AuthController(
            AuthenticationManager authenticationManager,
            AdminRepository adminRepository,
            JwtService jwtService
    ) {
        this.authenticationManager = authenticationManager;
        this.adminRepository = adminRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );
        } catch (BadCredentialsException e) {
            throw new BadCredentialsExceptionWrapper("Nom d'utilisateur ou mot de passe incorrect.");
        }

        Admin admin = adminRepository.findByUsername(request.username())
                .orElseThrow(() -> new BadCredentialsExceptionWrapper("Nom d'utilisateur ou mot de passe incorrect."));

        String token = jwtService.generateToken(admin.getUsername());
        return new LoginResponse(token, AdminSessionDto.from(admin));
    }

    /** Called on app startup to restore the session from a stored token. */
    @GetMapping("/me")
    public AdminSessionDto me(Authentication authentication) {
        Admin admin = adminRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new BadCredentialsExceptionWrapper("Session invalide."));
        return AdminSessionDto.from(admin);
    }

    @PutMapping("/me")
    public AdminSessionDto updateMe(Authentication authentication, @Valid @RequestBody AdminUpdateRequest request) {
        Admin admin = adminRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new BadCredentialsExceptionWrapper("Session invalide."));

        admin.setFullName(request.fullName());
        admin.setEmail(request.email());
        admin.setPhone(request.phone());
        adminRepository.save(admin);

        return AdminSessionDto.from(admin);
    }
}
