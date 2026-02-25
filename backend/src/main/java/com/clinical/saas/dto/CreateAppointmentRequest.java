package com.clinical.saas.dto;

import com.clinical.saas.entity.AppointmentStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAppointmentRequest {
    @NotNull
    private Long patientId;

    @NotNull
    private LocalDateTime appointmentDate;

    private AppointmentStatus status = AppointmentStatus.SCHEDULED;
}
