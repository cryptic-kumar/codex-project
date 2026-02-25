package com.clinical.saas.controller;

import com.clinical.saas.dto.CreateAppointmentRequest;
import com.clinical.saas.dto.CreatePatientRequest;
import com.clinical.saas.dto.UpdateAppointmentStatusRequest;
import com.clinical.saas.entity.Appointment;
import com.clinical.saas.entity.Patient;
import com.clinical.saas.security.CustomUserDetails;
import com.clinical.saas.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctor")
@RequiredArgsConstructor
@PreAuthorize("hasRole('DOCTOR')")
@CrossOrigin(origins = "*")
public class DoctorController {
    private final DoctorService doctorService;

    @GetMapping("/patients")
    public List<Patient> listPatients(@AuthenticationPrincipal CustomUserDetails doctor) {
        return doctorService.listPatients(doctor);
    }

    @PostMapping("/patients")
    public Patient createPatient(@Valid @RequestBody CreatePatientRequest request,
                                 @AuthenticationPrincipal CustomUserDetails doctor) {
        return doctorService.createPatient(request, doctor);
    }

    @GetMapping("/appointments")
    public List<Appointment> listAppointments(@AuthenticationPrincipal CustomUserDetails doctor) {
        return doctorService.listAppointments(doctor);
    }

    @PostMapping("/appointments")
    public Appointment createAppointment(@Valid @RequestBody CreateAppointmentRequest request,
                                         @AuthenticationPrincipal CustomUserDetails doctor) {
        return doctorService.createAppointment(request, doctor);
    }

    @PatchMapping("/appointments/{appointmentId}/status")
    public Appointment updateAppointmentStatus(@PathVariable Long appointmentId,
                                               @Valid @RequestBody UpdateAppointmentStatusRequest request,
                                               @AuthenticationPrincipal CustomUserDetails doctor) {
        return doctorService.updateAppointmentStatus(appointmentId, request, doctor);
    }
}
