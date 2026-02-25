package com.clinical.saas.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateClinicRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String address;
    @NotBlank
    private String contactNumber;
}
