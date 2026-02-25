package com.clinical.saas.repository;

import com.clinical.saas.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByClinicId(Long clinicId);
    List<Appointment> findByDoctorId(Long doctorId);
}
