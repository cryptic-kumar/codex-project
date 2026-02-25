package com.clinical.saas.service;

import com.clinical.saas.dto.AuthRequest;
import com.clinical.saas.dto.AuthResponse;
import com.clinical.saas.entity.AppUser;
import com.clinical.saas.security.CustomUserDetails;
import com.clinical.saas.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(principal);

        return AuthResponse.builder()
                .token(token)
                .userId(principal.getId())
                .name(principal.getName())
                .email(principal.getEmail())
                .role(principal.getRole())
                .clinicId(principal.getClinicId())
                .build();
    }
}
