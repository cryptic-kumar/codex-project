package com.clinical.saas.dto;

import com.clinical.saas.entity.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AuthResponse {
    private String token;
    private Long userId;
    private String name;
    private String email;
    private Role role;
    private Long clinicId;
}
