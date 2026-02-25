package com.clinical.saas.config;

import com.clinical.saas.entity.AppUser;
import com.clinical.saas.entity.Clinic;
import com.clinical.saas.entity.Role;
import com.clinical.saas.repository.AppUserRepository;
import com.clinical.saas.repository.ClinicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final AppUserRepository appUserRepository;
    private final ClinicRepository clinicRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        Clinic demoClinic = clinicRepository.findAll().stream().findFirst().orElseGet(() ->
                clinicRepository.save(Clinic.builder()
                        .name("Sunrise Clinic")
                        .address("123 Care Street")
                        .contactNumber("+1-555-1010")
                        .build()));

        appUserRepository.findByEmail("admin@clinical.com").orElseGet(() ->
                appUserRepository.save(AppUser.builder()
                        .email("admin@clinical.com")
                        .password(passwordEncoder.encode("Admin@123"))
                        .name("System Admin")
                        .role(Role.SUPER_ADMIN)
                        .clinicId(null)
                        .build()));

        appUserRepository.findByEmail("doctor@clinical.com").orElseGet(() ->
                appUserRepository.save(AppUser.builder()
                        .email("doctor@clinical.com")
                        .password(passwordEncoder.encode("Doctor@123"))
                        .name("Dr. Demo")
                        .role(Role.DOCTOR)
                        .clinicId(demoClinic.getId())
                        .build()));
    }
}
