package com.clinical.saas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreatePatientRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String phone;
    private String medicalHistory;
}
