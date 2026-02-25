package com.clinical.saas.repository;

import com.clinical.saas.entity.Clinic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicRepository extends JpaRepository<Clinic, Long> {
}
