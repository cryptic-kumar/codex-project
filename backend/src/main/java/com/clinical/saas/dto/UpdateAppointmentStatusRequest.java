package com.clinical.saas.dto;

import com.clinical.saas.entity.AppointmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateAppointmentStatusRequest {
    @NotNull
    private AppointmentStatus status;
}
