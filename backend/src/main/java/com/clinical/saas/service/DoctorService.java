package com.clinical.saas.service;

import com.clinical.saas.dto.CreateAppointmentRequest;
import com.clinical.saas.dto.CreatePatientRequest;
import com.clinical.saas.dto.UpdateAppointmentStatusRequest;
import com.clinical.saas.entity.Appointment;
import com.clinical.saas.entity.Patient;
import com.clinical.saas.security.CustomUserDetails;
import com.clinical.saas.repository.AppointmentRepository;
import com.clinical.saas.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    public List<Patient> listPatients(CustomUserDetails doctor) {
        return patientRepository.findByClinicId(doctor.getClinicId());
    }

    public Patient createPatient(CreatePatientRequest request, CustomUserDetails doctor) {
        Patient patient = Patient.builder()
                .name(request.getName())
                .phone(request.getPhone())
                .medicalHistory(request.getMedicalHistory())
                .clinicId(doctor.getClinicId())
                .build();
        return patientRepository.save(patient);
    }

    public List<Appointment> listAppointments(CustomUserDetails doctor) {
        return appointmentRepository.findByClinicId(doctor.getClinicId());
    }

    public Appointment createAppointment(CreateAppointmentRequest request, CustomUserDetails doctor) {
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new IllegalArgumentException("Patient not found"));
        if (!patient.getClinicId().equals(doctor.getClinicId())) {
            throw new IllegalArgumentException("Patient does not belong to your clinic");
        }

        Appointment appointment = Appointment.builder()
                .patientId(request.getPatientId())
                .doctorId(doctor.getId())
                .clinicId(doctor.getClinicId())
                .appointmentDate(request.getAppointmentDate())
                .status(request.getStatus())
                .build();
        return appointmentRepository.save(appointment);
    }

    public Appointment updateAppointmentStatus(Long appointmentId, UpdateAppointmentStatusRequest request, CustomUserDetails doctor) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new IllegalArgumentException("Appointment not found"));
        if (!appointment.getClinicId().equals(doctor.getClinicId())) {
            throw new IllegalArgumentException("Not authorized for this clinic appointment");
        }
        appointment.setStatus(request.getStatus());
        return appointmentRepository.save(appointment);
    }
}
