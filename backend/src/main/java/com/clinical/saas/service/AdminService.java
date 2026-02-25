package com.clinical.saas.service;

import com.clinical.saas.dto.CreateClinicRequest;
import com.clinical.saas.dto.CreateDoctorRequest;
import com.clinical.saas.dto.SystemStatsResponse;
import com.clinical.saas.entity.AppUser;
import com.clinical.saas.entity.Clinic;
import com.clinical.saas.entity.Role;
import com.clinical.saas.repository.AppUserRepository;
import com.clinical.saas.repository.ClinicRepository;
import com.clinical.saas.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final ClinicRepository clinicRepository;
    private final AppUserRepository appUserRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public Clinic createClinic(CreateClinicRequest request) {
        Clinic clinic = Clinic.builder()
                .name(request.getName())
                .address(request.getAddress())
                .contactNumber(request.getContactNumber())
                .build();
        return clinicRepository.save(clinic);
    }

    public AppUser createDoctor(CreateDoctorRequest request) {
        if (appUserRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already used");
        }
        clinicRepository.findById(request.getClinicId())
                .orElseThrow(() -> new IllegalArgumentException("Clinic not found"));

        AppUser doctor = AppUser.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .role(Role.DOCTOR)
                .clinicId(request.getClinicId())
                .build();

        return appUserRepository.save(doctor);
    }

    public SystemStatsResponse getSystemStats() {
        return SystemStatsResponse.builder()
                .totalClinics(clinicRepository.count())
                .totalDoctors(appUserRepository.countByRole(Role.DOCTOR))
                .totalPatients(patientRepository.count())
                .build();
    }
}
