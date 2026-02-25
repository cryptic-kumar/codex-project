package com.clinical.saas.controller;

import com.clinical.saas.dto.CreateClinicRequest;
import com.clinical.saas.dto.CreateDoctorRequest;
import com.clinical.saas.dto.SystemStatsResponse;
import com.clinical.saas.entity.AppUser;
import com.clinical.saas.entity.Clinic;
import com.clinical.saas.service.AdminService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasRole('SUPER_ADMIN')")
@CrossOrigin(origins = "*")
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/clinics")
    public Clinic createClinic(@Valid @RequestBody CreateClinicRequest request) {
        return adminService.createClinic(request);
    }

    @PostMapping("/doctors")
    public AppUser createDoctor(@Valid @RequestBody CreateDoctorRequest request) {
        AppUser created = adminService.createDoctor(request);
        created.setPassword(null);
        return created;
    }

    @GetMapping("/stats")
    public SystemStatsResponse systemStats() {
        return adminService.getSystemStats();
    }
}
