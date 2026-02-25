package com.clinical.saas.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SystemStatsResponse {
    private long totalClinics;
    private long totalDoctors;
    private long totalPatients;
}
